import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { createEmptyTourItinerary, readTourItinerary, TourItineraryItem } from '../../shared/tour-itinerary.model';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';
import { AdminService } from '../../admin.service';

interface PackageImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
  uploaded: boolean;
}

type PackageFormStep = 1 | 2 | 3;

@Component({
  selector: 'app-packages-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TranslatePipe, NumbersOnlyDirective],
  templateUrl: './packages-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesFromCard implements OnInit, OnChanges, OnDestroy {
  @Input() selectedPackage: any = null;
  @Output() packageSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly maxImages = 5;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly formSteps = [
    { id: 1, label: 'packageDetailsStep', icon: 'mdi-file-document-edit-outline' },
    { id: 2, label: 'packageImagesStep', icon: 'mdi-image-multiple-outline' },
    { id: 3, label: 'packageItineraryStep', icon: 'mdi-map-marker-path' },
  ] as const;
  private readonly imageConstraints = {
    minWidth: 1200,
    minHeight: 675,
    maxWidth: 2400,
    maxHeight: 1600,
    minAspectRatio: (4 / 3) - 0.03,
    maxAspectRatio: (16 / 9) + 0.03,
  };

  packageForm = this.createForm();
  destinations: any[] = [];
  imageUploads: PackageImageUpload[] = [];
  destinationsLoading = false;
  destinationMenuOpen = false;
  destinationSearchTerm = '';
  isSaving = false;
  apiLoadingMessage = '';
  deletingImageIndex: number | null = null;
  errorMessage = '';
  successMessage = '';
  activeStep: PackageFormStep = 1;
  completedStep = 0;
  savedPackageId: number | null = null;
  itineraryDraft: TourItineraryItem | null = null;
  itineraryDraftIsChild = false;
  private itineraryDraftCollection: TourItineraryItem[] | null = null;
  private itineraryDraftIndex: number | null = null;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void { this.loadDestinations(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedPackage']) return;
    if (this.selectedPackage) this.populateForm(this.selectedPackage);
    else this.resetForm(false);
  }

  ngOnDestroy(): void { this.revokeNewImageUrls(); }

  get currentPackageId(): number | null {
    return this.savedPackageId ?? this.toOptionalId(this.selectedPackage?.id ?? this.selectedPackage?.packageId);
  }

  get filteredDestinations(): any[] {
    const search = this.destinationSearchTerm.trim().toLocaleLowerCase();
    return search
      ? this.destinations.filter((item) => this.destinationLabel(item).toLocaleLowerCase().includes(search))
      : this.destinations;
  }

  get selectedDestinations(): any[] {
    const selectedIds = new Set(this.packageForm.controls.destinationIds.value);
    return this.destinations.filter((item) => selectedIds.has(this.destinationId(item)));
  }

  get screenLoaderVisible(): boolean { return this.isSaving || this.deletingImageIndex !== null; }
  get screenLoaderMessage(): string {
    return this.deletingImageIndex !== null ? 'deletingPackageImage' : (this.apiLoadingMessage || 'pleaseWaitForRequest');
  }

  loadDestinations(): void {
    this.destinationsLoading = true;
    this.adminService.getDestinations(1, 100).pipe(
      catchError(() => { this.errorMessage = 'destinationsLoadError'; return of(null); }),
      finalize(() => { this.destinationsLoading = false; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const data = response?.data ?? response;
      const rows = data?.data ?? data?.items ?? data?.destinations ?? data;
      this.destinations = Array.isArray(rows) ? rows : [];
    });
  }

  saveCurrentStep(): void {
    if (this.activeStep === 1) this.savePackageDetails();
    else if (this.activeStep === 2) this.savePackageImages();
    else this.savePackageItinerary();
  }

  savePackageDetails(): void {
    if (this.isSaving || !this.validateDetailsStep()) return;
    const existingId = this.currentPackageId;
    const payload = this.buildDetailsPayload(existingId);
    this.beginRequest('savingPackageDetails');
    const request$ = existingId
      ? this.adminService.updatePackage(payload)
      : this.adminService.createPackage(payload);
    request$.pipe(
      catchError((error) => { this.handleRequestError(error, 'packageSaveError'); return of(null); }),
      finalize(() => this.endRequest()),
    ).subscribe((response: any) => {
      if (!this.acceptResponse(response, 'packageSaveError')) return;
      const packageId = existingId ?? this.extractPackageId(response);
      if (!packageId) { this.errorMessage = 'packageIdMissingAfterCreate'; return; }
      this.savedPackageId = packageId;
      this.completedStep = Math.max(this.completedStep, 1);
      this.activeStep = 2;
      this.successMessage = response?.message || (existingId ? 'packageDetailsUpdated' : 'packageDetailsCreated');
      this.showToast('success', this.successMessage);
      this.cdr.markForCheck();
    });
  }

  savePackageImages(): void {
    if (this.isSaving || !this.currentPackageId) return;
    this.syncImagesControl();
    if (this.packageForm.controls.images.invalid) {
      this.packageForm.controls.images.markAsTouched();
      this.errorMessage = 'imagesRequired';
      return;
    }
    const pending = this.imageUploads.filter((image) => image.file && !image.uploaded);
    if (!pending.length) { this.completeImagesStep(); return; }

    const payload = new FormData();
    payload.append('PackageId', String(this.currentPackageId));
    pending.forEach((image) => payload.append('Images', image.file!, image.file!.name));
    this.beginRequest('uploadingPackageImages');
    this.adminService.addPackageImages(payload).pipe(
      catchError((error) => { this.handleRequestError(error, 'packageImagesSaveError'); return of(null); }),
      finalize(() => this.endRequest()),
    ).subscribe((response: any) => {
      if (!this.acceptResponse(response, 'packageImagesSaveError')) return;
      pending.forEach((image) => image.uploaded = true);
      this.successMessage = response?.message || 'packageImagesSaved';
      this.showToast('success', this.successMessage);
      this.completeImagesStep();
    });
  }

  savePackageItinerary(): void {
    if (this.isSaving || !this.currentPackageId) return;
    if (this.itineraryDraft) { this.errorMessage = 'saveItineraryStepFirst'; return; }
    const itinerary = this.packageForm.controls.itinerary.value;
    if (!itinerary.length || this.hasInvalidItinerary(itinerary)) {
      this.errorMessage = 'packageItineraryRequired';
      return;
    }
    this.beginRequest('savingPackageItinerary');
    this.adminService.addPackageItinerary({
      PackageId: this.currentPackageId,
      Itinerary: itinerary.map((item) => this.toItineraryPayload(item)),
    }).pipe(
      catchError((error) => { this.handleRequestError(error, 'packageItinerarySaveError'); return of(null); }),
      finalize(() => this.endRequest()),
    ).subscribe((response: any) => {
      if (!this.acceptResponse(response, 'packageItinerarySaveError')) return;
      this.completedStep = 3;
      this.showToast('success', response?.message || (this.selectedPackage ? 'packageUpdated' : 'packageCreated'));
      this.packageSaved.emit();
      this.resetForm(false);
    });
  }

  previousStep(): void {
    if (this.isSaving || this.activeStep === 1) return;
    this.errorMessage = '';
    this.activeStep = (this.activeStep - 1) as PackageFormStep;
    this.closeItineraryEditor();
  }

  toggleDestinationMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.destinationsLoading) this.destinationMenuOpen = !this.destinationMenuOpen;
  }

  toggleDestination(destination: any): void {
    const id = this.destinationId(destination);
    const control = this.packageForm.controls.destinationIds;
    const values = [...control.value];
    const index = values.indexOf(id);
    if (index >= 0) values.splice(index, 1); else values.push(id);
    control.setValue(values);
    control.markAsTouched();
    control.markAsDirty();
  }

  removeDestination(id: number): void {
    this.packageForm.controls.destinationIds.setValue(
      this.packageForm.controls.destinationIds.value.filter((value) => value !== id),
    );
  }

  isDestinationSelected(destination: any): boolean {
    return this.packageForm.controls.destinationIds.value.includes(this.destinationId(destination));
  }

  destinationId(destination: any): number { return Number(destination?.id ?? destination?.destinationId); }
  destinationLabel(destination: any): string {
    return [destination?.nameEng ?? destination?.name, destination?.nameAr].filter(Boolean).join(' — ');
  }
  updateDestinationSearch(event: Event): void { this.destinationSearchTerm = (event.target as HTMLInputElement).value; }
  closeDestinationMenu(): void { this.destinationMenuOpen = false; this.destinationSearchTerm = ''; }
  @HostListener('document:click') closeDestinationMenuOnOutsideClick(): void { this.closeDestinationMenu(); }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    if (this.imageUploads.length + files.length > this.maxImages) { this.errorMessage = 'packageImageLimit'; return; }
    for (const file of files) {
      try {
        if (!file.type.startsWith('image/')) throw new ImageUploadValidationError('invalidImageType');
        if (file.size > this.maxImageBytes) throw new ImageUploadValidationError('imageTooLarge');
        const normalized = await normalizeImageUpload(file, this.imageConstraints);
        this.imageUploads.push({ file: normalized, url: URL.createObjectURL(normalized), name: normalized.name, existing: false, uploaded: false });
      } catch (error) {
        this.errorMessage = error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError';
      }
    }
    this.syncImagesControl();
    this.cdr.markForCheck();
  }

  async removeImage(index: number): Promise<void> {
    const image = this.imageUploads[index];
    if (!image || this.isSaving || this.deletingImageIndex !== null) return;
    const result = await Swal.fire({
      title: this.translate.instant('confirmImageDelete'), text: this.translate.instant('imageDeleteWarning'),
      icon: 'warning', showCancelButton: true, confirmButtonText: this.translate.instant('delete'),
      cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#e11d48', reverseButtons: true,
    });
    if (!result.isConfirmed) return;
    const imageId = Number(image.id);
    if (image.existing && imageId > 0) {
      this.deletingImageIndex = index;
      this.adminService.deletePackageImage(imageId).pipe(
        catchError(() => { this.showToast('error', 'imageDeleteError'); return of(null); }),
        finalize(() => { this.deletingImageIndex = null; this.cdr.markForCheck(); }),
      ).subscribe((response) => { if (response && response?.isSuccess !== false) this.removeImageLocally(index); });
    } else this.removeImageLocally(index);
  }

  openItineraryStepEditor(): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = createEmptyTourItinerary(this.currentPackageId);
    this.itineraryDraft.dayNumber = this.packageForm.controls.itinerary.value.length + 1;
    this.itineraryDraftCollection = this.packageForm.controls.itinerary.value;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = false;
  }

  openItineraryChildEditor(parent: TourItineraryItem): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = createEmptyTourItinerary(this.currentPackageId);
    this.itineraryDraft.dayNumber = parent.dayNumber;
    this.itineraryDraft.isChildNode = true;
    this.itineraryDraftCollection = parent.childs;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = true;
  }

  editItineraryStep(collection: TourItineraryItem[], index: number, isChild: boolean): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = readTourItinerary(collection[index]);
    this.itineraryDraftCollection = collection;
    this.itineraryDraftIndex = index;
    this.itineraryDraftIsChild = isChild;
  }

  saveItineraryStep(): void {
    if (!this.itineraryDraft || !this.itineraryDraftCollection || this.invalidDraft) return;
    if (this.itineraryDraftIndex === null) this.itineraryDraftCollection.push(this.itineraryDraft);
    else this.itineraryDraftCollection[this.itineraryDraftIndex] = this.itineraryDraft;
    this.packageForm.controls.itinerary.markAsDirty();
    this.closeItineraryEditor();
  }

  get invalidDraft(): boolean {
    if (!this.itineraryDraft) return true;
    const maxDay = Number(this.packageForm.controls.durationDays.value);
    return !this.itineraryDraft.title.trim() || this.itineraryDraft.dayNumber < 1 || this.itineraryDraft.dayNumber > maxDay
      || (!!this.itineraryDraft.startTime && !!this.itineraryDraft.endTime && this.itineraryDraft.endTime <= this.itineraryDraft.startTime);
  }

  cancelItineraryStep(): void { this.closeItineraryEditor(); }
  removeItineraryStep(collection: TourItineraryItem[], index: number): void { if (!this.itineraryDraft) collection.splice(index, 1); }
  cancelEdit(): void { this.resetForm(true); }

  getImageUrl(url: string): string {
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '').replace(/^images\//i, '')}`;
  }

  private createForm() {
    return new FormGroup({
      nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
      nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
      description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(4000)] }),
      durationDays: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      durationHours: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), Validators.max(23)] }),
      pricePerPerson: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
      pricePerChild: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      maxCapacity: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      cancellationPolicy: new FormControl('', { nonNullable: true }),
      isFreeCancelation: new FormControl(false, { nonNullable: true }),
      dateFrom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      dateTo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      destinationIds: new FormControl<number[]>([], { nonNullable: true, validators: [Validators.required] }),
      images: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
      itinerary: new FormControl<TourItineraryItem[]>([], { nonNullable: true }),
    });
  }

  private validateDetailsStep(): boolean {
    const names = ['nameEng', 'nameAr', 'description', 'durationDays', 'durationHours', 'pricePerPerson', 'pricePerChild', 'maxCapacity', 'cancellationPolicy', 'isFreeCancelation', 'dateFrom', 'dateTo', 'destinationIds'] as const;
    names.forEach((name) => this.packageForm.controls[name].markAsTouched());
    if (!this.packageForm.controls.isFreeCancelation.value && !this.packageForm.controls.cancellationPolicy.value.trim()) {
      this.packageForm.controls.cancellationPolicy.setErrors({ required: true });
    } else if (this.packageForm.controls.cancellationPolicy.hasError('required')) {
      this.packageForm.controls.cancellationPolicy.setErrors(null);
    }
    const values = this.packageForm.getRawValue();
    if (values.dateFrom && values.dateTo && values.dateTo < values.dateFrom) {
      this.packageForm.controls.dateTo.setErrors({ dateRange: true });
    }
    return names.every((name) => this.packageForm.controls[name].valid);
  }

  private buildDetailsPayload(id: number | null): any {
    const value = this.packageForm.getRawValue();
    const payload: any = {
      NameEng: value.nameEng.trim(), NameAr: value.nameAr.trim(), Description: value.description.trim(),
      DurationDays: Number(value.durationDays), DurationHours: Number(value.durationHours),
      PricePerPerson: Number(value.pricePerPerson), PricePerChild: Number(value.pricePerChild),
      MaxCapacity: Number(value.maxCapacity), CancellationPolicy: value.cancellationPolicy.trim(),
      IsFreeCancelation: value.isFreeCancelation,
      DateFrom: `${value.dateFrom}T00:00:00`, DateTo: `${value.dateTo}T00:00:00`,
      Destinations: value.destinationIds.map((destinationId, index) => ({ DestinationId: destinationId, DisplayOrder: index })),
      Images: [], Itinerary: [],
    };
    if (id) payload.Id = id;
    return payload;
  }

  private toItineraryPayload(item: TourItineraryItem): any {
    return {
      Title: item.title.trim(), Value: item.value?.trim() ?? '', Description: item.description?.trim() ?? '',
      DayNumber: Number(item.dayNumber), StartTime: item.startTime || null, EndTime: item.endTime || null,
      Childs: (item.childs ?? []).map((child) => this.toItineraryPayload(child)),
    };
  }

  private hasInvalidItinerary(items: TourItineraryItem[]): boolean {
    const maxDay = Number(this.packageForm.controls.durationDays.value);
    return items.some((item) => !item.title.trim() || item.dayNumber < 1 || item.dayNumber > maxDay || this.hasInvalidItinerary(item.childs));
  }

  private populateForm(item: any): void {
    this.revokeNewImageUrls();
    const images = Array.isArray(item?.images) ? item.images : [];
    this.imageUploads = images.slice(0, this.maxImages).map((image: any, index: number) => ({
      id: this.toOptionalId(image?.id ?? image?.packageImageId) ?? undefined,
      url: this.resolveImageUrl(image), name: image?.imageName ?? `Package image ${index + 1}`,
      existing: true, uploaded: true,
    })).filter((image: PackageImageUpload) => !!image.url);
    this.savedPackageId = this.toOptionalId(item?.id ?? item?.packageId);
    const destinationIds = (Array.isArray(item?.destinations) ? item.destinations : [])
      .sort((a: any, b: any) => Number(a.displayOrder) - Number(b.displayOrder))
      .map((destination: any) => Number(destination.destinationId ?? destination.id)).filter(Number.isFinite);
    this.packageForm.setValue({
      nameEng: item?.nameEng ?? '', nameAr: item?.nameAr ?? '', description: item?.description ?? '',
      durationDays: Number(item?.durationDays) || 1, durationHours: Number(item?.durationHours) || 0,
      pricePerPerson: Number(item?.pricePerPerson) || 0, pricePerChild: Number(item?.pricePerChild) || 0,
      maxCapacity: Number(item?.maxCapacity) || 1, cancellationPolicy: item?.cancellationPolicy ?? '',
      isFreeCancelation: item?.isFreeCancelation === true,
      dateFrom: this.toDateInput(item?.dateFrom), dateTo: this.toDateInput(item?.dateTo), destinationIds,
      images: this.imageUploads.map((image) => image.url),
      itinerary: (Array.isArray(item?.itinerary) ? item.itinerary : []).map((step: any) => readTourItinerary(step)),
    });
    this.activeStep = 1;
    this.completedStep = 0;
  }

  private resetForm(emitCancel: boolean): void {
    this.closeItineraryEditor(); this.closeDestinationMenu(); this.revokeNewImageUrls();
    this.imageUploads = []; this.savedPackageId = null; this.activeStep = 1; this.completedStep = 0;
    this.errorMessage = ''; this.successMessage = '';
    this.packageForm.reset({ nameEng: '', nameAr: '', description: '', durationDays: 1, durationHours: 0,
      pricePerPerson: 0, pricePerChild: 0, maxCapacity: 1, cancellationPolicy: '', isFreeCancelation: false,
      dateFrom: '', dateTo: '', destinationIds: [], images: [], itinerary: [] });
    if (emitCancel) this.editCancelled.emit();
  }

  private completeImagesStep(): void { this.completedStep = Math.max(this.completedStep, 2); this.activeStep = 3; this.errorMessage = ''; this.cdr.markForCheck(); }
  private closeItineraryEditor(): void { this.itineraryDraft = null; this.itineraryDraftCollection = null; this.itineraryDraftIndex = null; this.itineraryDraftIsChild = false; }
  private syncImagesControl(): void { this.packageForm.controls.images.setValue(this.imageUploads.map((image) => image.url)); this.packageForm.controls.images.updateValueAndValidity(); }
  private removeImageLocally(index: number): void { const [image] = this.imageUploads.splice(index, 1); if (image?.file) URL.revokeObjectURL(image.url); this.syncImagesControl(); this.cdr.markForCheck(); }
  private beginRequest(message: string): void { this.isSaving = true; this.apiLoadingMessage = message; this.errorMessage = ''; this.successMessage = ''; }
  private endRequest(): void { this.isSaving = false; this.apiLoadingMessage = ''; this.cdr.markForCheck(); }
  private handleRequestError(error: any, fallback: string): void { this.errorMessage = error?.error?.message || fallback; this.showToast('error', this.errorMessage); }
  private acceptResponse(response: any, fallback: string): boolean { if (response === null) return false; if (response?.isSuccess === false) { this.errorMessage = response?.message || fallback; this.showToast('error', this.errorMessage); return false; } return true; }
  private showToast(icon: 'success' | 'error', message: string): void { Swal.fire({ toast: true, position: 'top-end', icon, title: this.translate.instant(message), showConfirmButton: false, timer: icon === 'success' ? 2500 : 4500, timerProgressBar: true }); }
  private extractPackageId(response: any): number | null { const data = response?.data ?? response?.result ?? response; return this.toOptionalId(data?.id ?? data?.packageId ?? data?.data?.id ?? data?.data?.packageId ?? data); }
  private toOptionalId(value: unknown): number | null { const id = Number(value); return Number.isInteger(id) && id > 0 ? id : null; }
  private toDateInput(value: unknown): string { const text = String(value ?? ''); return /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : ''; }
  private resolveImageUrl(image: any): string { return this.getImageUrl(String(typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? ''))); }
  private revokeNewImageUrls(): void { this.imageUploads.filter((image) => image.file).forEach((image) => URL.revokeObjectURL(image.url)); }
}
