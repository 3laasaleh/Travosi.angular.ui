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
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { createEmptyTourItinerary, readTourItinerary, TourItineraryItem } from '../../shared/tour-itinerary.model';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';
import {
  hasInvalidItinerary,
  hasItineraryTimeOverlap,
} from '../../shared/itinerary-validation.util';
import { AdminService } from '../../admin.service';
import { arabicTextValidator, startsWithArabic } from '../../../../core/validators/arabic-text.validator';

interface PackageImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
  uploaded: boolean;
  altEng?: string;
  altAr?: string;
}

type PackageFormStep = 1 | 2 | 3;

@Component({
  selector: 'app-packages-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TranslatePipe, NumbersOnlyDirective, DatePicker],
  templateUrl: './packages-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesFromCard implements OnInit, OnChanges, OnDestroy {
  @Input() selectedPackage: any = null;
  @Output() packageSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly maxImages = 5;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly maxImageWidth = 2400;
  readonly maxImageHeight = 1600;
  readonly today = this.localDate(new Date());
  readonly tomorrow = this.localDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
  readonly itineraryTimeOptions = Array.from({ length: 24 * 4 }, (_, index) => {
    const hours = Math.floor(index / 4).toString().padStart(2, '0');
    const minutes = ((index % 4) * 15).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });
  readonly formSteps = [
    { id: 1, label: 'packageDetailsStep', icon: 'mdi-file-document-edit-outline' },
    { id: 2, label: 'packageImagesStep', icon: 'mdi-image-multiple-outline' },
    { id: 3, label: 'packageItineraryStep', icon: 'mdi-map-marker-path' },
  ] as const;
  private readonly imageConstraints = {
    maxWidth: this.maxImageWidth,
    maxHeight: this.maxImageHeight,
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
  imageValidationMessage = '';
  imageAltErrorsVisible = false;
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

  get cancellationPoliciesArray(): FormArray<FormGroup> {
    return this.packageForm.controls.cancellationPolicies;
  }

  get highlightsArray(): FormArray<FormGroup> { return this.packageForm.controls.highlights; }
  get includesArray(): FormArray<FormGroup> { return this.packageForm.controls.includes; }
  get excludesArray(): FormArray<FormGroup> { return this.packageForm.controls.excludes; }

  get screenLoaderVisible(): boolean { return this.isSaving || this.deletingImageIndex !== null; }
  get screenLoaderMessage(): string {
    return this.deletingImageIndex !== null ? 'deletingPackageImage' : (this.apiLoadingMessage || 'pleaseWaitForRequest');
  }

  get detailsStepInvalid(): boolean {
    const controls = this.packageForm.controls;
    const requiredControls = [
      controls.nameEng,
      controls.nameAr,
      controls.descriptionEng,
      controls.descriptionAr,
      controls.durationDays,
      controls.durationHours,
      controls.pricePerPerson,
      controls.pricePerChild,
      controls.maxCapacity,
      controls.destinationIds,
      controls.highlights,
      controls.includes,
      controls.excludes,
    ];
    const cancellationPolicyMissing = !controls.isFreeCancelation.value
      && !this.cancellationPoliciesArray.getRawValue().some((item: any) => String(item?.value ?? '').trim());
    const dateRangeInvalid = !!controls.dateFrom.value
      && !!controls.dateTo.value
      && controls.dateTo.value <= controls.dateFrom.value;
    return requiredControls.some((control) => control.invalid)
      || cancellationPolicyMissing
      || dateRangeInvalid;
  }

  get currentStepInvalid(): boolean {
    if (this.activeStep === 1) return this.detailsStepInvalid;
    if (this.activeStep === 2) return !this.currentPackageId || this.packageForm.controls.images.invalid;
    const itinerary = this.packageForm.controls.itinerary.value;
    return !this.currentPackageId
      || !!this.itineraryDraft
      || !itinerary.length
      || hasInvalidItinerary(itinerary)
      || hasItineraryTimeOverlap(itinerary);
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

  markCurrentStepTouched(): void {
    if (this.activeStep === 1) this.packageForm.markAllAsTouched();
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
      switchMap((detailsResponse: any) => {
        if (detailsResponse?.isSuccess === false) {
          return of({ detailsResponse, packageId: null, statusResponse: null, statusError: null });
        }

        const packageId = existingId ?? this.extractPackageId(detailsResponse);
        if (!packageId) {
          return of({ detailsResponse, packageId: null, statusResponse: null, statusError: null });
        }

        return this.adminService.changePackageStatus(packageId, false).pipe(
          map((statusResponse) => ({ detailsResponse, packageId, statusResponse, statusError: null })),
          catchError((statusError) => of({ detailsResponse, packageId, statusResponse: null, statusError })),
        );
      }),
      catchError((error) => { this.handleRequestError(error, 'packageSaveError'); return of(null); }),
      finalize(() => this.endRequest()),
    ).subscribe((result: any) => {
      if (result === null || !this.acceptResponse(result.detailsResponse, 'packageSaveError')) return;
      const packageId = result.packageId;
      if (!packageId) { this.errorMessage = 'packageIdMissingAfterCreate'; return; }
      this.savedPackageId = packageId;
      if (result.statusError) {
        this.handleRequestError(result.statusError, 'statusUpdateError');
        return;
      }
      if (!this.acceptResponse(result.statusResponse, 'statusUpdateError')) return;
      this.completedStep = Math.max(this.completedStep, 1);
      this.activeStep = 2;
      this.successMessage = result.detailsResponse?.message || (existingId ? 'packageDetailsUpdated' : 'packageDetailsCreated');
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
    this.imageAltErrorsVisible = true;
    if (pending.some((image) => this.hasInvalidImageAlt(image))) { this.errorMessage = 'imageAltRequired'; return; }
    if (!pending.length) { this.completeImagesStep(); return; }

    const payload = new FormData();
    payload.append('PackageId', String(this.currentPackageId));
    pending.forEach((image, index) => {
      payload.append(`Images[${index}].Image`, image.file!, image.file!.name);
      payload.append(`Images[${index}].AltEng`, image.altEng!.trim());
      payload.append(`Images[${index}].AltAr`, image.altAr!.trim());
    });
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
    if (!itinerary.length || hasInvalidItinerary(itinerary)) {
      this.errorMessage = 'itineraryTitleAndTimesRequired';
      return;
    }
    if (hasItineraryTimeOverlap(itinerary)) {
      this.errorMessage = 'itineraryTimeConflict';
      return;
    }
    this.beginRequest('savingPackageItinerary');
    this.adminService.addPackageItinerary({
      PackageId: this.currentPackageId,
      Itinerary: itinerary.map((item) => this.toItineraryPayload(item)),
    }).pipe(
      switchMap((itineraryResponse: any) => {
        if (itineraryResponse?.isSuccess === false) {
          return of({ itineraryResponse, statusResponse: null, statusError: null });
        }

        return this.adminService.changePackageStatus(
          this.currentPackageId!,
          this.packageForm.controls.isActive.value,
        ).pipe(
          map((statusResponse) => ({ itineraryResponse, statusResponse, statusError: null })),
          catchError((statusError) => of({ itineraryResponse, statusResponse: null, statusError })),
        );
      }),
      catchError((error) => { this.handleRequestError(error, 'packageItinerarySaveError'); return of(null); }),
      finalize(() => this.endRequest()),
    ).subscribe((result: any) => {
      if (result === null || !this.acceptResponse(result.itineraryResponse, 'packageItinerarySaveError')) return;
      if (result.statusError) {
        this.handleRequestError(result.statusError, 'statusUpdateError');
        return;
      }
      if (!this.acceptResponse(result.statusResponse, 'statusUpdateError')) return;
      this.completedStep = 3;
      this.showToast('success', result.itineraryResponse?.message || (this.selectedPackage ? 'packageUpdated' : 'packageCreated'));
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
    return [destination?.titleEng ?? destination?.title, destination?.titleAr].filter(Boolean).join(' — ');
  }
  updateDestinationSearch(event: Event): void { this.destinationSearchTerm = (event.target as HTMLInputElement).value; }
  closeDestinationMenu(): void { this.destinationMenuOpen = false; this.destinationSearchTerm = ''; }
  @HostListener('document:click') closeDestinationMenuOnOutsideClick(): void { this.closeDestinationMenu(); }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.imageValidationMessage = '';
    this.imageAltErrorsVisible = false;
    if (this.imageUploads.length + files.length > this.maxImages) { this.imageValidationMessage = 'packageImageLimit'; return; }
    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        this.imageValidationMessage = 'invalidImageType';
        continue;
      }
      if (file.size > this.maxImageBytes) {
        this.imageValidationMessage = 'imageTooLarge';
        continue;
      }
      try {
        const normalized = await normalizeImageUpload(file, this.imageConstraints);
        this.imageUploads.push({ file: normalized, url: URL.createObjectURL(normalized), name: normalized.name, existing: false, uploaded: false, altEng: '', altAr: '' });
      } catch (error) {
        this.imageValidationMessage = error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError';
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
    if (image.existing && this.currentPackageId && Number.isInteger(imageId) && imageId > 0) {
      this.deletingImageIndex = index;
      this.adminService.deletePackageImage(imageId).pipe(
        catchError(() => { this.showToast('error', 'imageDeleteError'); return of({ imageDeleteFailed: true }); }),
        finalize(() => { this.deletingImageIndex = null; this.cdr.markForCheck(); }),
      ).subscribe((response: any) => {
        if (response?.imageDeleteFailed || response?.isSuccess === false) {
          if (response?.isSuccess === false) this.showToast('error', response?.message || 'imageDeleteError');
          return;
        }
        this.removeImageLocally(index);
        this.showImageDeletedToast();
      });
      return;
    }
    this.removeImageLocally(index);
    this.showImageDeletedToast();
  }

  openItineraryStepEditor(): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = createEmptyTourItinerary(this.currentPackageId);
    this.itineraryDraftCollection = this.packageForm.controls.itinerary.value;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = false;
  }

  openItineraryChildEditor(parent: TourItineraryItem): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = createEmptyTourItinerary(this.currentPackageId);
    this.itineraryDraft.arrivalDate = parent.arrivalDate;
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
    return hasInvalidItinerary([this.itineraryDraft])
      || !startsWithArabic(this.itineraryDraft.titleAr)
      || !startsWithArabic(this.itineraryDraft.valueAr)
      || this.itineraryDraftHasTimeOverlap;
  }

  get itineraryDraftHasTimeOverlap(): boolean {
    if (!this.itineraryDraft || !this.itineraryDraftCollection) return false;
    const siblings = this.itineraryDraftCollection
      .filter((_, index) => index !== this.itineraryDraftIndex);
    return hasItineraryTimeOverlap([this.itineraryDraft, ...siblings]);
  }

  cancelItineraryStep(): void { this.closeItineraryEditor(); }
  removeItineraryStep(collection: TourItineraryItem[], index: number): void { if (!this.itineraryDraft) collection.splice(index, 1); }
  addCancellationPolicy(): void { this.cancellationPoliciesArray.push(this.createListItemGroup()); }
  removeCancellationPolicy(index: number): void { this.cancellationPoliciesArray.removeAt(index); }
  addHighlight(): void { this.highlightsArray.push(this.createLocalizedListItemGroup()); }
  removeHighlight(index: number): void { this.highlightsArray.removeAt(index); }
  addInclude(): void { this.includesArray.push(this.createLocalizedListItemGroup()); }
  removeInclude(index: number): void { this.includesArray.removeAt(index); }
  addExclude(): void { this.excludesArray.push(this.createLocalizedListItemGroup()); }
  removeExclude(index: number): void { this.excludesArray.removeAt(index); }
  cancelEdit(): void { this.resetForm(true); }

  getImageUrl(url: string): string {
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '').replace(/^images\//i, '')}`;
  }

  hasInvalidImageAlt(image: PackageImageUpload): boolean {
    return !image.altEng?.trim() || !image.altAr?.trim() || !startsWithArabic(image.altAr);
  }

  private createForm() {
    return new FormGroup({
      nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
      nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200), arabicTextValidator()] }),
      descriptionEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(4000)] }),
      descriptionAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(4000), arabicTextValidator()] }),
      durationDays: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      durationHours: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), Validators.max(23)] }),
      pricePerPerson: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
      pricePerChild: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      maxCapacity: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      isFreeCancelation: new FormControl(false, { nonNullable: true }),
      isActive: new FormControl(true, { nonNullable: true }),
      dateFrom: new FormControl(this.today, { nonNullable: true }),
      dateTo: new FormControl(this.tomorrow, { nonNullable: true }),
      destinationIds: new FormControl<number[]>([], { nonNullable: true, validators: [Validators.required] }),
      images: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
      itinerary: new FormControl<TourItineraryItem[]>([], { nonNullable: true }),
      cancellationPolicies: new FormArray<FormGroup>([]),
      highlights: new FormArray<FormGroup>([]),
      includes: new FormArray<FormGroup>([]),
      excludes: new FormArray<FormGroup>([]),
    });
  }

  private createListItemGroup(item: any = {}): FormGroup {
    return new FormGroup({
      id: new FormControl(Number(item?.id) || 0, { nonNullable: true }),
      value: new FormControl(String(item?.value ?? item?.text ?? item?.title ?? ''), { nonNullable: true, validators: [Validators.required] }),
    });
  }

  private createLocalizedListItemGroup(item: any = {}): FormGroup {
    return new FormGroup({
      id: new FormControl(Number(item?.id) || 0, { nonNullable: true }),
      valueEng: new FormControl(String(item?.valueEng ?? item?.value ?? item?.text ?? item?.title ?? ''), { nonNullable: true, validators: [Validators.required] }),
      valueAr: new FormControl(String(item?.valueAr ?? item?.value ?? item?.text ?? item?.title ?? ''), { nonNullable: true, validators: [Validators.required, arabicTextValidator()] }),
    });
  }

  private setCancellationPolicies(policies: any[]): void {
    this.cancellationPoliciesArray.clear();
    (Array.isArray(policies) ? policies : []).forEach((policy) =>
      this.cancellationPoliciesArray.push(this.createListItemGroup(typeof policy === 'string' ? { value: policy } : policy)),
    );
  }

  private toListPayload(items: any[]): { Id: number; Value: string }[] {
    return (Array.isArray(items) ? items : [])
      .map((item) => ({ Id: Number(item?.id) || 0, Value: String(item?.value ?? '').trim() }))
      .filter((item) => !!item.Value);
  }

  private toLocalizedListPayload(items: any[]): { Id: number; ValueEng: string; ValueAr: string }[] {
    return (Array.isArray(items) ? items : [])
      .map((item) => ({ Id: Number(item?.id) || 0, ValueEng: String(item?.valueEng ?? '').trim(), ValueAr: String(item?.valueAr ?? '').trim() }))
      .filter((item) => !!item.ValueEng && !!item.ValueAr);
  }

  private setLocalizedListItems(collection: FormArray<FormGroup>, values: any[]): void {
    collection.clear();
    (Array.isArray(values) ? values : []).forEach((item) =>
      collection.push(this.createLocalizedListItemGroup(typeof item === 'string' ? { valueEng: item, valueAr: item } : item)),
    );
  }

  private validateDetailsStep(): boolean {
    const names = ['nameEng', 'nameAr', 'descriptionEng', 'descriptionAr',  'durationDays', 'durationHours', 'pricePerPerson', 'pricePerChild', 'maxCapacity', 'isFreeCancelation', 'dateFrom', 'dateTo', 'destinationIds'] as const;
    names.forEach((name) => this.packageForm.controls[name].markAsTouched());
    this.cancellationPoliciesArray.markAllAsTouched();
    this.highlightsArray.markAllAsTouched();
    this.includesArray.markAllAsTouched();
    this.excludesArray.markAllAsTouched();
    const values = this.packageForm.getRawValue();
    if (values.dateFrom && values.dateTo && values.dateTo < values.dateFrom) {
      this.packageForm.controls.dateTo.setErrors({ dateRange: true });
    }
    return names.every((name) => this.packageForm.controls[name].valid)
      && this.highlightsArray.valid
      && this.includesArray.valid
      && this.excludesArray.valid;
  }

  private buildDetailsPayload(id: number | null): any {
    const value = this.packageForm.getRawValue();
    const payload: any = {
      NameEng: value.nameEng.trim(), NameAr: value.nameAr.trim(),
      DescriptionEng: value.descriptionEng.trim(), DescriptionAr: value.descriptionAr.trim(),
      Description: value.descriptionEng.trim(),
      DurationDays: Number(value.durationDays), DurationHours: Number(value.durationHours),
      PricePerPerson: Number(value.pricePerPerson), PricePerChild: Number(value.pricePerChild),
      MaxCapacity: Number(value.maxCapacity),
      CancellationPolicies: this.toListPayload(value.cancellationPolicies),
      Highlights: this.toLocalizedListPayload(value.highlights),
      Includes: this.toLocalizedListPayload(value.includes),
      Excludes: this.toLocalizedListPayload(value.excludes),
      CancellationPolicy: this.toListPayload(value.cancellationPolicies)[0]?.Value ?? '',
      IsFreeCancelation: value.isFreeCancelation,
      DateFrom: `${value.dateFrom}T00:00:00`, DateTo: `${value.dateTo}T00:00:00`,
      Destinations: value.destinationIds.map((destinationId, index) => ({ DestinationId: destinationId, DisplayOrder: index })),
      Images: [], Itinerary: [], IsActive: false,
    };
    if (id) payload.Id = id;
    return payload;
  }

  private toItineraryPayload(item: TourItineraryItem): any {
    return {
      Id: item.id, OrderNumber: item.orderNumber, ParentId: item.parentId, IsChildNode: item.isChildNode,
      TitleAr: item.titleAr.trim(), TitleEng: item.titleEng.trim(), ValueAr: item.valueAr.trim(), ValueEng: item.valueEng.trim(),
      Notes: item.notes?.trim() ?? '', ArrivalDate: item.arrivalDate || null, StartTime: item.startTime || null, EndTime: item.endTime || null,
      Childs: (item.childs ?? []).map((child) => this.toItineraryPayload(child)),
    };
  }

  private populateForm(item: any): void {
    this.revokeNewImageUrls();
    this.imageValidationMessage = '';
    const images = Array.isArray(item?.images) ? item.images : [];
    this.imageUploads = images.slice(0, this.maxImages).map((image: any, index: number) => ({
      id: this.toOptionalId(image?.id ?? image?.packageImageId) ?? undefined,
      url: this.resolveImageUrl(image),
      name: image?.imageName ?? this.translate.instant('packageImageNumber', { number: index + 1 }),
      existing: true, uploaded: true,
      altEng: image?.altEng ?? image?.AltEng ?? '',
      altAr: image?.altAr ?? image?.AltAr ?? '',
    })).filter((image: PackageImageUpload) => !!image.url);
    this.savedPackageId = this.toOptionalId(item?.id ?? item?.packageId);
    const destinationIds = (Array.isArray(item?.destinations) ? item.destinations : [])
      .sort((a: any, b: any) => Number(a.displayOrder) - Number(b.displayOrder))
      .map((destination: any) => Number(destination.destinationId ?? destination.id)).filter(Number.isFinite);
    this.packageForm.patchValue({
      nameEng: item?.nameEng ?? '', nameAr: item?.nameAr ?? '',
      descriptionEng: item?.descriptionEng ?? item?.description ?? '', descriptionAr: item?.descriptionAr ?? '',
      durationDays: Number(item?.durationDays) || 1, durationHours: Number(item?.durationHours) || 0,
      pricePerPerson: Number(item?.pricePerPerson) || 0, pricePerChild: Number(item?.pricePerChild) || 0,
      maxCapacity: Number(item?.maxCapacity) || 1,
      isFreeCancelation: item?.isFreeCancelation === true,
      isActive: item?.isActive !== false,
      dateFrom: this.toDateInput(item?.dateFrom), dateTo: this.toDateInput(item?.dateTo), destinationIds,
      images: this.imageUploads.map((image) => image.url),
      itinerary: (Array.isArray(item?.itinerary) ? item.itinerary : []).map((step: any) => readTourItinerary(step)),
      cancellationPolicies: [],
      highlights: [], includes: [], excludes: [],
    } as any);
    this.setCancellationPolicies(item?.cancellationPolicies ?? (item?.cancellationPolicy ? [{ value: item.cancellationPolicy }] : []));
    this.setLocalizedListItems(this.highlightsArray, item?.highlights ?? []);
    this.setLocalizedListItems(this.includesArray, item?.includes ?? []);
    this.setLocalizedListItems(this.excludesArray, item?.excludes ?? []);
    this.activeStep = 1;
    this.completedStep = 0;
  }

  private resetForm(emitCancel: boolean): void {
    this.closeItineraryEditor(); this.closeDestinationMenu(); this.revokeNewImageUrls();
    this.imageUploads = []; this.savedPackageId = null; this.activeStep = 1; this.completedStep = 0;
    this.imageValidationMessage = ''; this.imageAltErrorsVisible = false;
    this.errorMessage = ''; this.successMessage = '';
    this.packageForm.reset({ nameEng: '', nameAr: '', descriptionEng: '', descriptionAr: '',  durationDays: 1, durationHours: 0,
      pricePerPerson: 0, pricePerChild: 0, maxCapacity: 1, isFreeCancelation: false, isActive: true,
      dateFrom: this.today, dateTo: this.tomorrow, destinationIds: [], images: [], itinerary: [] });
    this.setCancellationPolicies([]);
    this.setLocalizedListItems(this.highlightsArray, []);
    this.setLocalizedListItems(this.includesArray, []);
    this.setLocalizedListItems(this.excludesArray, []);
    if (emitCancel) this.editCancelled.emit();
  }

  private completeImagesStep(): void { this.completedStep = Math.max(this.completedStep, 2); this.activeStep = 3; this.errorMessage = ''; this.cdr.markForCheck(); }
  private closeItineraryEditor(): void { this.itineraryDraft = null; this.itineraryDraftCollection = null; this.itineraryDraftIndex = null; this.itineraryDraftIsChild = false; }
  private syncImagesControl(): void { this.packageForm.controls.images.setValue(this.imageUploads.map((image) => image.url)); this.packageForm.controls.images.markAsTouched(); this.packageForm.controls.images.updateValueAndValidity(); }
  private removeImageLocally(index: number): void { const [image] = this.imageUploads.splice(index, 1); if (image?.file) URL.revokeObjectURL(image.url); this.syncImagesControl(); this.cdr.markForCheck(); }
  private showImageDeletedToast(): void { this.showToast('success', 'imageDeleted'); }
  private beginRequest(message: string): void { this.isSaving = true; this.apiLoadingMessage = message; this.errorMessage = ''; this.successMessage = ''; }
  private endRequest(): void { this.isSaving = false; this.apiLoadingMessage = ''; this.cdr.markForCheck(); }
  private handleRequestError(error: any, fallback: string): void { this.errorMessage = error?.error?.message || fallback; this.showToast('error', this.errorMessage); }
  private acceptResponse(response: any, fallback: string): boolean { if (response === null) return false; if (response?.isSuccess === false) { this.errorMessage = response?.message || fallback; this.showToast('error', this.errorMessage); return false; } return true; }
  private showToast(icon: 'success' | 'error', message: string): void { Swal.fire({ toast: true, position: 'top-end', icon, iconColor: icon === 'success' ? '#00d492' : undefined, title: this.translate.instant(message), showConfirmButton: false, timer: icon === 'success' ? 2500 : 4500, timerProgressBar: true }); }
  private extractPackageId(response: any): number | null { const data = response?.data ?? response?.result ?? response; return this.toOptionalId(data?.id ?? data?.packageId ?? data?.data?.id ?? data?.data?.packageId ?? data); }
  private toOptionalId(value: unknown): number | null { const id = Number(value); return Number.isInteger(id) && id > 0 ? id : null; }
  private toDateInput(value: unknown): string { const text = String(value ?? ''); return /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : ''; }
  private localDate(value: Date): string { return `${value.getFullYear().toString().padStart(4, '0')}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${value.getDate().toString().padStart(2, '0')}`; }
  private resolveImageUrl(image: any): string { return this.getImageUrl(String(typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? ''))); }
  private revokeNewImageUrls(): void { this.imageUploads.filter((image) => image.file).forEach((image) => URL.revokeObjectURL(image.url)); }
}
