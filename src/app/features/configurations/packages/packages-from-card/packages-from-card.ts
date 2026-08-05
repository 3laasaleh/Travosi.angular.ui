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
import { ApiService } from '../../../../core/services/apiservice.service';
import {
  createEmptyTourItinerary,
  readTourItinerary,
  toTourItineraryPayload,
  TourItineraryItem,
} from '../../shared/tour-itinerary.model';
import { AdminService } from '../../admin.service';
import {
  ImageUploadValidationError,
  normalizeImageUpload,
} from '../../shared/image-upload.util';

interface PackageImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
  uploaded: boolean;
}

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

  packageForm = this.createForm();
  readonly maxImages = 5;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly minImageWidth = 1200;
  readonly minImageHeight = 675;
  readonly maxImageWidth = 2400;
  readonly maxImageHeight = 1600;
  private readonly imageConstraints = {
    minWidth: this.minImageWidth,
    minHeight: this.minImageHeight,
    maxWidth: this.maxImageWidth,
    maxHeight: this.maxImageHeight,
    minAspectRatio: (4 / 3) - 0.03,
    maxAspectRatio: (16 / 9) + 0.03,
  };
  destinations: any[] = [];
  imageUploads: PackageImageUpload[] = [];
  destinationsLoading = false;
  destinationMenuOpen = false;
  destinationSearchTerm = '';
  isSaving = false;
  deletingImageIndex: number | null = null;
  errorMessage = '';
  successMessage = '';
  itineraryDraft: TourItineraryItem | null = null;
  itineraryDraftIsChild = false;
  private itineraryDraftCollection: TourItineraryItem[] | null = null;
  private itineraryDraftIndex: number | null = null;
  private savedPackageId: number | null = null;

  constructor(
    private adminService: AdminService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedPackage']) return;
    if (this.selectedPackage) this.populateForm(this.selectedPackage);
    else this.resetForm(false);
  }

  ngOnDestroy(): void {
    this.revokeNewImageUrls();
  }

  get currentPackageId(): number | null {
    const id = Number(this.savedPackageId ?? this.selectedPackage?.id ?? this.selectedPackage?.packageId);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  get filteredDestinations(): any[] {
    const searchTerm = this.destinationSearchTerm.trim().toLocaleLowerCase();
    if (!searchTerm) return this.destinations;
    return this.destinations.filter((destination) => this.destinationLabel(destination).toLocaleLowerCase().includes(searchTerm));
  }

  get selectedDestination(): any | null {
    const selectedId = Number(this.packageForm.controls.destinationId.value);
    return this.destinations.find((destination) => Number(destination?.id ?? destination?.destinationId) === selectedId) ?? null;
  }

  loadDestinations(): void {
    this.destinationsLoading = true;
    this.adminService.getDestinations(1, 100).pipe(
      catchError(() => {
        this.errorMessage = 'destinationsLoadError';
        return of(null);
      }),
      finalize(() => {
        this.destinationsLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const data = response?.data ?? response;
      const rows = data?.data ?? data?.items ?? data?.destinations ?? data;
      this.destinations = Array.isArray(rows) ? rows : [];
    });
  }

  savePackage(): void {
    if (this.isSaving || this.itineraryDraft) return;
    this.syncImagesControl();
    if (this.packageForm.invalid) {
      this.packageForm.markAllAsTouched();
      return;
    }
    const form = this.packageForm.getRawValue();
    if (this.hasUntitledItinerary(form.itinerary)) {
      this.errorMessage = 'stepTitleRequired';
      return;
    }
    const itinerary = form.itinerary.map((item) => toTourItineraryPayload(item));
    const payload: any = {
      title: form.title.trim(),
      titleEng: form.title.trim(),
      destinationId: Number(form.destinationId),
      price: Number(form.price),
      pricePerPerson: Number(form.price),
      duration: form.duration.trim(),
      durationDays: Number(form.duration) || 0,
      description: form.description.trim(),
      fullDescription: form.description.trim(),
      isActive: form.isActive,
      itinerary,
    };
    if (this.currentPackageId) payload.id = this.currentPackageId;

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.currentPackageId
      ? this.apiService.put('Packages', payload)
      : this.apiService.post('Packages', payload);
    request$.pipe(
      catchError(() => {
        this.errorMessage = 'packageSaveError';
        return of(null);
      }),
    ).subscribe((response: any) => {
      if (response === null) {
        this.isSaving = false;
        this.cdr.markForCheck();
        return;
      }
      if (response?.isSuccess === false) {
        this.errorMessage = response?.message || 'packageSaveError';
        this.isSaving = false;
        this.cdr.markForCheck();
        return;
      }
      const packageId = this.currentPackageId ?? this.extractPackageId(response);
      if (!packageId) {
        this.errorMessage = 'packageIdMissingAfterCreate';
        this.isSaving = false;
        this.cdr.markForCheck();
        return;
      }
      this.savedPackageId = packageId;
      this.uploadPackageImages(packageId, response?.message);
    });
  }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.errorMessage = '';
    if (this.imageUploads.length + files.length > this.maxImages) {
      this.errorMessage = 'packageImageLimit';
      return;
    }
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'invalidImageType';
        continue;
      }
      if (file.size > this.maxImageBytes) {
        this.errorMessage = 'imageTooLarge';
        continue;
      }
      try {
        const normalized = await normalizeImageUpload(file, this.imageConstraints);
        this.imageUploads.push({
          file: normalized,
          url: URL.createObjectURL(normalized),
          name: normalized.name,
          existing: false,
          uploaded: false,
        });
      } catch (error) {
        this.errorMessage = error instanceof ImageUploadValidationError
          ? error.translationKey
          : 'imageReadError';
      }
    }
    this.syncImagesControl();
    this.cdr.markForCheck();
  }

  async removeImage(index: number): Promise<void> {
    if (this.deletingImageIndex !== null || this.isSaving) return;
    const image = this.imageUploads[index];
    if (!image) return;

    const confirmation = await Swal.fire({
      title: this.translate.instant('confirmImageDelete'),
      text: this.translate.instant('imageDeleteWarning'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#e11d48',
      reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;

    const imageId = Number(image.id);
    if (image.existing && this.currentPackageId && Number.isInteger(imageId) && imageId > 0) {
      this.deletingImageIndex = index;
      this.adminService.deletePackageImage(imageId).pipe(
        catchError(() => {
          Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
          return of({ imageDeleteFailed: true });
        }),
        finalize(() => {
          this.deletingImageIndex = null;
          this.cdr.markForCheck();
        }),
      ).subscribe((response: any) => {
        if (response?.imageDeleteFailed || response?.isSuccess === false) return;
        this.removeImageLocally(index);
        this.showImageDeletedToast();
      });
      return;
    }

    this.removeImageLocally(index);
    this.showImageDeletedToast();
  }

  destinationLabel(destination: any): string {
    return [destination?.nameEng ?? destination?.name, destination?.nameAr].filter(Boolean).join(' — ');
  }

  toggleDestinationMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (this.destinationsLoading) return;
    this.destinationMenuOpen = !this.destinationMenuOpen;
    if (!this.destinationMenuOpen) this.destinationSearchTerm = '';
  }

  selectDestination(destination: any): void {
    const destinationId = Number(destination?.id ?? destination?.destinationId);
    if (!Number.isFinite(destinationId)) return;
    this.packageForm.controls.destinationId.setValue(destinationId);
    this.packageForm.controls.destinationId.markAsDirty();
    this.packageForm.controls.destinationId.markAsTouched();
    this.closeDestinationMenu();
  }

  updateDestinationSearch(event: Event): void {
    this.destinationSearchTerm = (event.target as HTMLInputElement).value;
  }

  closeDestinationMenu(): void {
    this.destinationMenuOpen = false;
    this.destinationSearchTerm = '';
  }

  @HostListener('document:click')
  closeDestinationMenuOnOutsideClick(): void {
    this.closeDestinationMenu();
  }

  openItineraryStepEditor(): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = createEmptyTourItinerary();
    this.itineraryDraftCollection = this.packageForm.controls.itinerary.value;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = false;
  }

  openItineraryChildEditor(parent: TourItineraryItem): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = { ...createEmptyTourItinerary(), parentId: parent.id > 0 ? parent.id : null, isChildNode: true };
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
    if (!this.itineraryDraft || !this.itineraryDraftCollection || !this.itineraryDraft.title.trim()) return;
    if (this.itineraryDraftIndex === null) this.itineraryDraftCollection.push(this.itineraryDraft);
    else this.itineraryDraftCollection[this.itineraryDraftIndex] = this.itineraryDraft;
    this.packageForm.controls.itinerary.markAsDirty();
    this.closeItineraryEditor();
  }

  cancelItineraryStep(): void {
    this.closeItineraryEditor();
  }

  removeItineraryStep(collection: TourItineraryItem[], index: number): void {
    if (!this.itineraryDraft) collection.splice(index, 1);
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(item: any): void {
    const rawItinerary = item?.itinerary ?? item?.itineraries ?? item?.packageItinerary ?? [];
    const packageImages = Array.isArray(item?.images) && item.images.length
      ? item.images
      : (item?.coverImageUrl ?? item?.imageUrl ? [{ imageUrl: item.coverImageUrl ?? item.imageUrl }] : []);
    this.revokeNewImageUrls();
    this.imageUploads = packageImages.slice(0, this.maxImages).map((image: any, index: number) => ({
      id: this.toOptionalId(image?.id ?? image?.packageImageId) ?? undefined,
      url: this.resolveImageUrl(image),
      name: image?.imageName ?? image?.name ?? `Package image ${index + 1}`,
      existing: true,
      uploaded: true,
    })).filter((image: PackageImageUpload) => !!image.url);
    this.savedPackageId = this.toOptionalId(item?.id ?? item?.packageId);
    this.packageForm.setValue({
      title: item?.titleEng ?? item?.title ?? item?.nameEng ?? item?.name ?? '',
      destinationId: Number(item?.destinationId ?? item?.destination?.id) || '',
      price: Number(item?.pricePerPerson ?? item?.price ?? 0),
      duration: String(item?.durationDays ?? item?.duration ?? ''),
      description: item?.fullDescription ?? item?.description ?? '',
      images: this.imageUploads.map((image) => image.url),
      isActive: item?.isActive !== false,
      itinerary: Array.isArray(rawItinerary) ? rawItinerary.map((step: any) => readTourItinerary(step)) : [],
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.closeItineraryEditor();
    this.closeDestinationMenu();
    this.revokeNewImageUrls();
    this.imageUploads = [];
    this.savedPackageId = null;
    this.packageForm.reset({ title: '', destinationId: '', price: 0, duration: '', description: '', images: [], isActive: true, itinerary: [] });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      destinationId: new FormControl<number | ''>('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      duration: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true }),
      images: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
      isActive: new FormControl(true, { nonNullable: true }),
      itinerary: new FormControl<TourItineraryItem[]>([], { nonNullable: true }),
    });
  }

  private hasUntitledItinerary(items: TourItineraryItem[]): boolean {
    return items.some((item) => !item.title.trim() || this.hasUntitledItinerary(item.childs));
  }

  private closeItineraryEditor(): void {
    this.itineraryDraft = null;
    this.itineraryDraftCollection = null;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = false;
  }

  getImageUrl(url: string): string {
    if (!url) return '';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private uploadPackageImages(packageId: number, saveMessage?: string): void {
    const pendingImages = this.imageUploads.filter((image) => image.file && !image.uploaded);
    if (!pendingImages.length) {
      this.completePackageSave(saveMessage);
      return;
    }

    const payload = new FormData();
    payload.append('PackageId', String(packageId));
    pendingImages.forEach((image) => payload.append('Images', image.file!, image.file!.name));

    this.adminService.addPackageImages(payload).pipe(
      catchError((error) => {
        this.errorMessage = error?.error?.message || 'packageImagesSaveError';
        return of(null);
      }),
      finalize(() => {
        this.isSaving = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response?.message || 'packageImagesSaveError';
        return;
      }
      pendingImages.forEach((image) => image.uploaded = true);
      this.completePackageSave(saveMessage || response?.message);
    });
  }

  private completePackageSave(message?: string): void {
    this.isSaving = false;
    this.successMessage = message || (this.selectedPackage ? 'packageUpdated' : 'packageCreated');
    this.packageSaved.emit();
    this.resetForm(false);
    this.cdr.markForCheck();
  }

  private syncImagesControl(): void {
    this.packageForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
    this.packageForm.controls.images.markAsTouched();
    this.packageForm.controls.images.updateValueAndValidity();
  }

  private removeImageLocally(index: number): void {
    const [removed] = this.imageUploads.splice(index, 1);
    if (removed?.file) URL.revokeObjectURL(removed.url);
    this.syncImagesControl();
    this.cdr.markForCheck();
  }

  private showImageDeletedToast(): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: this.translate.instant('imageDeleted'),
      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: true,
    });
  }

  private resolveImageUrl(image: any): string {
    const url = typeof image === 'string'
      ? image
      : (image?.imageUrl ?? image?.url ?? image?.path ?? image?.imageName ?? '');
    return this.getImageUrl(String(url ?? ''));
  }

  private extractPackageId(response: any): number | null {
    const data = response?.data ?? response?.result ?? response;
    return this.toOptionalId(
      data?.id ?? data?.packageId ?? data?.data?.id ?? data?.data?.packageId ?? data,
    );
  }

  private toOptionalId(value: unknown): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  private revokeNewImageUrls(): void {
    this.imageUploads.filter((image) => image.file).forEach((image) => URL.revokeObjectURL(image.url));
  }
}
