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
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';

import {
  createEmptyTourItinerary,
  readTourItinerary,
} from '../../shared/tour-itinerary.model';
import {
  ImageUploadValidationError,
  normalizeImageUpload,
} from '../../shared/image-upload.util';
import { AdminService } from '../../admin.service';

interface TourImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
  uploaded: boolean;
}

type TourFormStep = 1 | 2 | 3;

@Component({
  selector: 'app-tours-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, NumbersOnlyDirective],
  templateUrl: './tours-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursFromCard implements OnInit, OnChanges, OnDestroy {
  @Input() selectedTour: any = null;
  @Output() tourSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly currencies = [
    { id: 2, code: 'USD', labelKey: 'currencyUsd' },
    { id: 1, code: 'EGP', labelKey: 'currencyEgp' },
  ];
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
  readonly itineraryTimeOptions = Array.from({ length: 24 * 4 }, (_, index) => {
    const hours = Math.floor(index / 4).toString().padStart(2, '0');
    const minutes = ((index % 4) * 15).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });
  readonly formSteps = [
    { id: 1, label: 'tourDetailsStep', icon: 'mdi-file-document-edit-outline' },
    { id: 2, label: 'tourImagesStep', icon: 'mdi-image-multiple-outline' },
    { id: 3, label: 'tourItineraryStep', icon: 'mdi-map-marker-path' },
  ] as const;
  destinations: any[] = [];
  imageUploads: TourImageUpload[] = [];
  destinationsLoading = false;
  destinationMenuOpen = false;
  destinationSearchTerm = '';
  isSaving = false;
  apiLoadingMessage = '';
  deletingImageIndex: number | null = null;
  errorMessage = '';
  successMessage = '';
  activeStep: TourFormStep = 1;
  completedStep = 0;
  savedTourId: number | null = null;
  tourForm = this.createForm();
  itineraryDraft: FormGroup | null = null;
  itineraryDraftIsChild = false;
  private itineraryDraftCollection: FormArray<FormGroup> | null = null;
  private itineraryDraftIndex: number | null = null;

  private get defaultCurrencyId(): number {
    return this.currencies[0].id;
  }
  private itineraryClientSequence = 0;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedTour']) return;
    if (this.selectedTour) this.populateForm(this.selectedTour);
    else this.resetForm(false);
  }

  ngOnDestroy(): void {
    this.revokeNewImageUrls();
  }

  get filteredDestinations(): any[] {
    const searchTerm = this.destinationSearchTerm.trim().toLocaleLowerCase();
    if (!searchTerm) return this.destinations;
    return this.destinations.filter((destination) =>
      this.destinationLabel(destination).toLocaleLowerCase().includes(searchTerm),
    );
  }

  get selectedDestination(): any | null {
    const selectedId = this.tourForm.controls.destinationId.value;
    return this.destinations.find((destination) => Number(destination.id) === Number(selectedId)) ?? null;
  }

  get highlightsArray(): FormArray<FormGroup> {
    return this.tourForm.controls.highlights;
  }

  get includesArray(): FormArray<FormGroup> {
    return this.tourForm.controls.includes;
  }

  get excludesArray(): FormArray<FormGroup> {
    return this.tourForm.controls.excludes;
  }

  get itineraryArray(): FormArray<FormGroup> {
    return this.tourForm.controls.itinerary;
  }

  get currentTourId(): number | null {
    return this.savedTourId
      ?? this.toOptionalId(this.selectedTour?.id ?? this.selectedTour?.tourId);
  }

  get screenLoaderVisible(): boolean {
    return this.isSaving || this.deletingImageIndex !== null;
  }

  get screenLoaderMessage(): string {
    if (this.deletingImageIndex !== null) return 'deletingTourImage';
    return this.apiLoadingMessage || 'pleaseWaitForRequest';
  }

  loadDestinations(): void {
    this.destinationsLoading = true;
    this.errorMessage = '';
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
      this.destinations = this.extractCollection(response, ['destinations'])
        .map((destination) => {
          const id = Number(destination?.id ?? destination?.destinationId);
          return { ...destination, id };
        })
        .filter((destination) => Number.isFinite(destination.id));
      if (!this.currentTourId && !this.tourForm.controls.destinationId.value && this.destinations.length) {
        this.tourForm.controls.destinationId.setValue(this.destinations[0].id);
      }
    });
  }

  saveCurrentStep(): void {
    if (this.activeStep === 1) {
      this.saveTourDetails();
      return;
    }
    if (this.activeStep === 2) {
      this.continueToItinerary();
      return;
    }
    this.saveTour();
  }

  saveTourDetails(): void {
    if (this.isSaving || !this.validateDetailsStep()) return;

    const existingId = this.currentTourId;
    const isCreating = !existingId;
    const payload = this.buildTourDetailsPayload(existingId);

    this.isSaving = true;
    this.apiLoadingMessage = 'savingTourDetails';
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = isCreating
      ? this.adminService.createTour(payload)
      : this.adminService.updateTour(payload);

    request$.pipe(
      catchError((error) => {
        this.errorMessage = 'tourSaveError';
        this.showApiToast('error', error?.error?.message || 'tourSaveError');
        return of(null);
      }),
      finalize(() => {
        this.isSaving = false;
        this.apiLoadingMessage = '';
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response?.message || 'tourSaveError';
        this.showApiToast('error', this.errorMessage);
        return;
      }
      const tourId = existingId ?? this.extractTourId(response);
      if (!tourId) {
        this.errorMessage = 'tourIdMissingAfterCreate';
        this.showApiToast('error', this.errorMessage);
        return;
      }
      this.savedTourId = tourId;
      this.completedStep = Math.max(this.completedStep, 1);
      this.activeStep = 2;
      this.successMessage = response?.message || (isCreating ? 'tourDetailsCreated' : 'tourDetailsUpdated');
      this.showApiToast('success', this.successMessage);
      this.cdr.markForCheck();
    });
  }

  continueToItinerary(): void {
    if (this.isSaving || !this.currentTourId) return;
    this.syncImagesControl();
    if (this.tourForm.controls.images.invalid) {
      this.tourForm.controls.images.markAsTouched();
      this.errorMessage = 'imagesRequired';
      return;
    }
    const pendingImages = this.imageUploads.filter((image) => image.file && !image.uploaded);
    if (!pendingImages.length) {
      this.showApiToast('success', 'tourImagesAlreadySaved');
      this.completeImagesStep();
      return;
    }

    const payload = new FormData();
    payload.append('TourId', String(this.currentTourId));
    pendingImages.forEach((image) => payload.append('Images', image.file!, image.file!.name));

    this.isSaving = true;
    this.apiLoadingMessage = 'uploadingTourImages';
    this.errorMessage = '';
    this.successMessage = '';
    this.adminService.addTourImages(payload).pipe(
      catchError((error) => {
        this.errorMessage = 'tourImagesSaveError';
        this.showApiToast('error', error?.error?.message || 'tourImagesSaveError');
        return of(null);
      }),
      finalize(() => {
        this.isSaving = false;
        this.apiLoadingMessage = '';
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response?.message || 'tourImagesSaveError';
        this.showApiToast('error', this.errorMessage);
        return;
      }
      pendingImages.forEach((image) => image.uploaded = true);
      this.successMessage = response?.message || 'tourImagesSaved';
      this.showApiToast('success', this.successMessage);
      this.completeImagesStep();
    });
  }

  previousStep(): void {
    if (this.isSaving || this.activeStep === 1) return;
    this.errorMessage = '';
    this.successMessage = '';
    this.activeStep = (this.activeStep - 1) as TourFormStep;
    this.closeItineraryEditor();
  }

  private completeImagesStep(): void {
    this.errorMessage = '';
    this.completedStep = Math.max(this.completedStep, 2);
    this.activeStep = 3;
    this.cdr.markForCheck();
  }

  saveTour(): void {
    if (this.isSaving || !this.currentTourId) return;
    if (this.itineraryDraft) {
      this.itineraryDraft.markAllAsTouched();
      this.errorMessage = 'saveItineraryStepFirst';
      return;
    }

    this.isSaving = true;
    this.apiLoadingMessage = 'savingTourItinerary';
    this.errorMessage = '';
    this.successMessage = '';
    const payload = {
      TourId: this.currentTourId,
      Itinerary: this.buildItineraryPayload(),
    };

    this.adminService.addTourItinerary(payload).pipe(
      catchError((error) => {
        this.errorMessage = 'tourItinerarySaveError';
        this.showApiToast('error', error?.error?.message || 'tourItinerarySaveError');
        return of(null);
      }),
      finalize(() => {
        this.isSaving = false;
        this.apiLoadingMessage = '';
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response?.message || 'tourItinerarySaveError';
        this.showApiToast('error', this.errorMessage);
        return;
      }
      this.successMessage = response?.message || 'tourCreated';
      this.showApiToast('success', this.successMessage);
      this.completedStep = 3;
      this.tourSaved.emit();
      this.resetForm(false);
    });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  addHighlight(): void {
    this.highlightsArray.push(this.createListItemGroup());
  }

  removeHighlight(index: number): void {
    this.highlightsArray.removeAt(index);
  }

  addInclude(): void {
    this.includesArray.push(this.createListItemGroup());
  }

  removeInclude(index: number): void {
    this.includesArray.removeAt(index);
  }

  addExclude(): void {
    this.excludesArray.push(this.createListItemGroup());
  }

  removeExclude(index: number): void {
    this.excludesArray.removeAt(index);
  }

  openItineraryStepEditor(): void {
    if (this.itineraryDraft) return;
    const tourId = this.currentTourId;
    const step = createEmptyTourItinerary(tourId);
    step.dayNumber = this.itineraryArray.length + 1;
    this.itineraryDraft = this.createItineraryGroup(step);
    this.itineraryDraftCollection = this.itineraryArray;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = false;
    this.attachItineraryScheduleValidator();
  }

  openItineraryChildEditor(parentGroup: FormGroup): void {
    if (this.itineraryDraft) return;
    const tourId = this.currentTourId;
    const parentId = this.toOptionalId(parentGroup.controls['id'].value);
    const child = createEmptyTourItinerary(tourId);
    child.parentId = parentId;
    child.isChildNode = true;
    child.dayNumber = Number(parentGroup.controls['dayNumber'].value) || 1;
    this.itineraryDraft = this.createItineraryGroup(child);
    this.itineraryDraftCollection = this.itineraryChildrenArray(parentGroup);
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = true;
    this.attachItineraryScheduleValidator();
  }

  editItineraryStep(
    collection: FormArray<FormGroup>,
    index: number,
    isChild: boolean,
  ): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = this.createItineraryGroup(collection.at(index).getRawValue());
    this.itineraryDraftCollection = collection;
    this.itineraryDraftIndex = index;
    this.itineraryDraftIsChild = isChild;
    this.attachItineraryScheduleValidator();
  }

  saveItineraryStep(): void {
    if (!this.itineraryDraft || !this.itineraryDraftCollection) return;
    if (this.itineraryDraft.invalid) {
      this.itineraryDraft.markAllAsTouched();
      return;
    }
    if (this.itineraryDraftIndex === null) {
      this.itineraryDraftCollection.push(this.itineraryDraft);
    } else {
      this.itineraryDraftCollection.setControl(this.itineraryDraftIndex, this.itineraryDraft);
    }
    this.tourForm.markAsDirty();
    this.closeItineraryEditor();
  }

  cancelItineraryStep(): void {
    this.closeItineraryEditor();
  }

  itineraryChildrenArray(group: FormGroup): FormArray<FormGroup> {
    return group.controls['childs'] as FormArray<FormGroup>;
  }

  removeItineraryStep(collection: FormArray<FormGroup>, index: number): void {
    if (this.itineraryDraft) return;
    collection.removeAt(index);
    this.tourForm.markAsDirty();
  }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.errorMessage = '';
    if (this.imageUploads.length + files.length > this.maxImages) {
      this.errorMessage = 'tourImageLimit';
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
    if (image.existing && this.currentTourId && Number.isInteger(imageId) && imageId > 0) {
      this.deletingImageIndex = index;
      this.adminService.deleteTourImage(imageId).pipe(
        catchError(() => {
          Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
          return of({ imageDeleteFailed: true });
        }),
        finalize(() => {
          this.deletingImageIndex = null;
          this.cdr.markForCheck();
        }),
      ).subscribe((response: any) => {
        if (response?.imageDeleteFailed || response?.isSuccess === false) {
          if (response?.isSuccess === false) {
            Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('imageDeleteError') });
          }
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

  destinationLabel(destination: any): string {
    return [destination?.nameEng ?? destination?.name, destination?.nameAr]
      .filter(Boolean)
      .join(' — ');
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
    this.tourForm.controls.destinationId.setValue(destinationId);
    this.tourForm.controls.destinationId.markAsDirty();
    this.tourForm.controls.destinationId.markAsTouched();
    this.destinationMenuOpen = false;
    this.destinationSearchTerm = '';
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

  private populateForm(tour: any): void {
    this.closeItineraryEditor();
    this.revokeNewImageUrls();
    this.activeStep = 1;
    this.completedStep = 0;
    this.savedTourId = this.toOptionalId(tour?.id ?? tour?.tourId);
    const tourImages = Array.isArray(tour?.images) && tour.images.length
      ? tour.images
      : (tour?.coverImageUrl ?? tour?.imageUrl ? [{
          imageUrl: tour.coverImageUrl ?? tour.imageUrl,
          imageName: 'Tour cover',
        }] : []);
    this.imageUploads = tourImages
      .slice(0, this.maxImages)
      .map((image: any, index: number) => ({
        id: this.toOptionalId(image?.id ?? image?.tourImageId) ?? undefined,
        url: this.imageUrl(image),
        name: image?.imageName ?? image?.name ?? `Tour image ${index + 1}`,
        existing: true,
        uploaded: true,
      }))
      .filter((image: TourImageUpload) => !!image.url);
    this.tourForm.patchValue({
      titleEng: tour.titleEng ?? tour.title ?? '',
      titleAr: tour.titleAr ?? '',
      destinationId: tour.destinationId ?? '',
      description: tour.description ?? tour.overview ?? '',
      fullDescription: tour.fullDescription ?? '',
      pricePerPerson: Number(tour.pricePerPerson ?? tour.price ?? 0),
      pricePerChild: Number(tour.pricePerChild ?? 0),
      currencyId: Number(tour.currencyId ?? this.defaultCurrencyId),
      durationDays: Number(tour.durationDays ?? 0),
      durationHours: Number(tour.durationhours ?? tour.durationHours ?? 0),
      maxSeats: Number(tour.maxSeats ?? 14),
      startDate: this.toDateInput(tour.startDate),
      endDate: this.toDateInput(tour.endDate),
      cancellationPolicy: tour.cancellationPolicy ?? '',
      isFreeCancelation: tour.isFreeCancelation === true,
      isActive: tour.isActive !== false,
    });
    this.setHighlights(tour.highlights ?? []);
    this.setIncludes(tour.includes ?? []);
    this.setExcludes(tour.excludes ?? []);
    this.setItinerary(tour.itinerary ?? tour.itineraries ?? []);
    this.syncImagesControl();
    this.closeDestinationMenu();
  }

  private resetForm(emitCancel: boolean): void {
    this.closeItineraryEditor();
    this.closeDestinationMenu();
    this.revokeNewImageUrls();
    this.activeStep = 1;
    this.completedStep = 0;
    this.savedTourId = null;
    this.imageUploads = [];
    const defaults = this.createTrialTourDefaults();
    this.tourForm.reset({
      titleEng: defaults.titleEng,
      titleAr: defaults.titleAr,
      destinationId: this.destinations[0]?.id ?? '',
      description: defaults.description,
      fullDescription: defaults.fullDescription,
      pricePerPerson: defaults.pricePerPerson,
      pricePerChild: defaults.pricePerChild,
      currencyId: this.defaultCurrencyId,
      durationDays: defaults.durationDays,
      durationHours: defaults.durationHours,
      maxSeats: defaults.maxSeats,
      startDate: defaults.startDate,
      endDate: defaults.endDate,
      images: [],
      cancellationPolicy: defaults.cancellationPolicy,
      isFreeCancelation: defaults.isFreeCancelation,
      isActive: true,
    });
    this.setHighlights(defaults.highlights);
    this.setIncludes(defaults.includes);
    this.setExcludes(defaults.excludes);
    this.setItinerary([]);
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    const defaults = this.createTrialTourDefaults();
    return new FormGroup({
      titleEng: new FormControl(defaults.titleEng, {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\s'-]*$/)],
      }),
      titleAr: new FormControl(defaults.titleAr, {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'-]*$/)],
      }),
      destinationId: new FormControl<number | ''>('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl(defaults.description, { nonNullable: true }),
      fullDescription: new FormControl(defaults.fullDescription, { nonNullable: true }),
      pricePerPerson: new FormControl(defaults.pricePerPerson, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0.01)],
      }),
      pricePerChild: new FormControl(defaults.pricePerChild, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      currencyId: new FormControl(this.defaultCurrencyId, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      durationDays: new FormControl(defaults.durationDays, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      durationHours: new FormControl(defaults.durationHours, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0), Validators.max(23)],
      }),
      maxSeats: new FormControl(defaults.maxSeats, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      startDate: new FormControl(defaults.startDate, { nonNullable: true, validators: [Validators.required] }),
      endDate: new FormControl(defaults.endDate, { nonNullable: true, validators: [Validators.required] }),
      images: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      cancellationPolicy: new FormControl(defaults.cancellationPolicy, { nonNullable: true }),
      isFreeCancelation: new FormControl(defaults.isFreeCancelation, { nonNullable: true }),
      isActive: new FormControl(true, { nonNullable: true }),
      highlights: new FormArray<FormGroup>(
        defaults.highlights.map((value) => this.createListItemGroup({ value })),
      ),
      includes: new FormArray<FormGroup>(
        defaults.includes.map((value) => this.createListItemGroup({ value })),
      ),
      excludes: new FormArray<FormGroup>(
        defaults.excludes.map((value) => this.createListItemGroup({ value })),
      ),
      itinerary: new FormArray<FormGroup>([]),
    }, { validators: this.dateRangeValidator });
  }

  private createListItemGroup(item: any = {}): FormGroup {
    return new FormGroup({
      id: new FormControl(Number(item?.id) || 0, { nonNullable: true }),
      value: new FormControl(String(item?.value ?? item?.text ?? item?.title ?? ''), {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  private createItineraryGroup(item: any, depth = 0): FormGroup {
    const itinerary = readTourItinerary(item, this.currentTourId);
    return new FormGroup({
      id: new FormControl(itinerary.id, { nonNullable: true }),
      parentId: new FormControl<number | null>(itinerary.parentId),
      isChildNode: new FormControl(itinerary.isChildNode, { nonNullable: true }),
      title: new FormControl(itinerary.title, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      value: new FormControl(itinerary.value, { nonNullable: true }),
      description: new FormControl(itinerary.description, {
        nonNullable: true,
        validators: [Validators.maxLength(2000)],
      }),
      dayNumber: new FormControl(itinerary.dayNumber, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]\d*$/)],
      }),
      startTime: new FormControl<string | null>(itinerary.startTime, {
        validators: [this.quarterHourTimeValidator],
      }),
      endTime: new FormControl<string | null>(itinerary.endTime, {
        validators: [this.quarterHourTimeValidator],
      }),
      tourId: new FormControl<number | null>(itinerary.tourId),
      childs: new FormArray<FormGroup>(
        depth === 0
          ? itinerary.childs.map((child) => this.createItineraryGroup(child, 1))
          : [],
      ),
    }, { validators: this.itineraryTimeRangeValidator });
  }

  private setHighlights(highlights: any[]): void {
    this.setListItems(this.highlightsArray, highlights);
  }

  private setIncludes(includes: any[]): void {
    this.setListItems(this.includesArray, includes);
  }

  private setExcludes(excludes: any[]): void {
    this.setListItems(this.excludesArray, excludes);
  }

  private setListItems(collection: FormArray<FormGroup>, values: any[]): void {
    collection.clear();
    const items = Array.isArray(values) ? values : [];
    items.forEach((item) =>
      collection.push(this.createListItemGroup(
        typeof item === 'string' ? { value: item } : item,
      )),
    );
  }

  private setItinerary(itinerary: any[]): void {
    this.itineraryArray.clear();
    const items = Array.isArray(itinerary) ? itinerary : [];
    items.forEach((item) => this.itineraryArray.push(this.createItineraryGroup(item)));
  }

  private closeItineraryEditor(): void {
    this.itineraryDraft = null;
    this.itineraryDraftCollection = null;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = false;
  }

  private attachItineraryScheduleValidator(): void {
    if (!this.itineraryDraft) return;
    this.itineraryDraft.addValidators(this.itineraryStartTimeConflictValidator);
    this.itineraryDraft.updateValueAndValidity();
  }

  private validateDetailsStep(): boolean {
    const controls: AbstractControl[] = [
      this.tourForm.controls.titleEng,
      this.tourForm.controls.titleAr,
      this.tourForm.controls.destinationId,
      this.tourForm.controls.pricePerPerson,
      this.tourForm.controls.pricePerChild,
      this.tourForm.controls.currencyId,
      this.tourForm.controls.maxSeats,
      this.tourForm.controls.durationDays,
      this.tourForm.controls.durationHours,
      this.tourForm.controls.startDate,
      this.tourForm.controls.endDate,
      this.tourForm.controls.highlights,
      this.tourForm.controls.includes,
      this.tourForm.controls.excludes,
    ];
    controls.forEach((control) => control.markAllAsTouched());
    const valid = controls.every((control) => control.valid)
      && !this.tourForm.hasError('invalidDateRange');
    if (!valid) this.errorMessage = 'completeTourDetailsFirst';
    return valid;
  }

  private buildTourDetailsPayload(tourId: number | null): Record<string, unknown> {
    const form = this.tourForm.getRawValue();
    return {
      ...(tourId ? { Id: tourId } : {}),
      TitleEng: form.titleEng.trim(),
      TitleAr: form.titleAr.trim(),
      DestinationId: Number(form.destinationId),
      Description: form.description.trim() || null,
      FullDescription: form.fullDescription.trim() || null,
      PricePerPerson: Number(form.pricePerPerson),
      PricePerChild: Number(form.pricePerChild),
      CurrencyId: Number(form.currencyId),
      DurationDays: Number(form.durationDays),
      Durationhours: Number(form.durationHours),
      MaxSeats: Number(form.maxSeats),
      StartDate: this.toApiDate(form.startDate),
      EndDate: this.toApiDate(form.endDate),
      CancellationPolicy: form.cancellationPolicy.trim(),
      IsFreeCancelation: form.isFreeCancelation,
      Highlights: this.toListPayload(form.highlights),
      Includes: this.toListPayload(form.includes),
      Excludes: this.toListPayload(form.excludes),
    };
  }

  private toListPayload(items: any[]): { Id: number; Value: string }[] {
    return items
      .map((item) => ({
        Id: Number(item?.id) || 0,
        Value: String(item?.value ?? '').trim(),
      }))
      .filter((item) => !!item.Value);
  }

  private buildItineraryPayload(): Record<string, unknown>[] {
    return this.itineraryArray.getRawValue()
      .filter((item: any) => !!item.title || !!item.value || !!item.description)
      .map((item: any) => this.mapItineraryItem(item));
  }

  private mapItineraryItem(item: any): Record<string, unknown> {
    const children = Array.isArray(item?.childs) ? item.childs : [];
    return {
      Title: String(item?.title ?? '').trim(),
      Value: String(item?.value ?? '').trim(),
      Description: String(item?.description ?? '').trim(),
      DayNumber: Number(item?.dayNumber),
      StartTime: this.toApiTime(item?.startTime),
      EndTime: this.toApiTime(item?.endTime),
      Childs: children.map((child: any) => this.mapItineraryItem(child)),
    };
  }

  private extractTourId(response: any): number | null {
    let current = response;
    for (let depth = 0; depth < 6 && current !== null && current !== undefined; depth++) {
      if (typeof current === 'number' || typeof current === 'string') {
        const directId = this.toOptionalId(current);
        if (directId) return directId;
        break;
      }
      const id = this.toOptionalId(current?.tourId ?? current?.id);
      if (id) return id;
      current = current?.data ?? current?.result ?? current?.value ?? current?.tour;
    }
    return null;
  }

  private toApiTime(value: unknown): string | null {
    if (typeof value !== 'string' || !value.trim()) return null;
    const match = value.trim().match(/^(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}:00` : null;
  }

  private toApiDate(value: string): string {
    return value ? `${value}T00:00:00` : value;
  }

  getImageUrl(url: string): string {
    if (!url) return '';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private syncImagesControl(): void {
    this.tourForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
    this.tourForm.controls.images.markAsTouched();
    this.tourForm.controls.images.updateValueAndValidity();
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

  private showApiToast(icon: 'success' | 'error', message: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: this.translate.instant(message),
      showConfirmButton: false,
      timer: icon === 'success' ? 2600 : 4000,
      timerProgressBar: true,
    });
  }

  private imageUrl(image: any): string {
    return typeof image === 'string'
      ? image
      : (image?.imageUrl ?? image?.url ?? image?.path ?? image?.imageName ?? '');
  }

  private revokeNewImageUrls(): void {
    this.imageUploads
      .filter((image) => image.file)
      .forEach((image) => URL.revokeObjectURL(image.url));
  }

  private extractCollection(response: any, collectionKeys: string[]): any[] {
    let current = response;
    for (let depth = 0; depth < 4 && current; depth++) {
      if (Array.isArray(current)) return current;
      for (const key of [...collectionKeys, 'items', 'records', 'result']) {
        if (Array.isArray(current?.[key])) return current[key];
      }
      current = current?.data;
    }
    return [];
  }

  private dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
    if (!startDate || !endDate) return null;
    return new Date(endDate).getTime() >= new Date(startDate).getTime()
      ? null
      : { invalidDateRange: true };
  }

  private itineraryTimeRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    if (!startTime || !endTime) return null;
    return String(endTime) > String(startTime)
      ? null
      : { invalidItineraryTimeRange: true };
  }

  private quarterHourTimeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') return null;
    return /^([01]\d|2[0-3]):(00|15|30|45)$/.test(String(value))
      ? null
      : { invalidQuarterHourTime: true };
  }

  private readonly itineraryStartTimeConflictValidator = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const startTime = control.get('startTime')?.value;
    const dayNumber = Number(control.get('dayNumber')?.value);
    if (!startTime || !Number.isInteger(dayNumber) || !this.itineraryDraftCollection) {
      return null;
    }

    const hasConflict = this.itineraryDraftCollection.controls.some((step, index) => {
      if (index === this.itineraryDraftIndex) return false;
      return Number(step.get('dayNumber')?.value) === dayNumber
        && step.get('startTime')?.value === startTime;
    });

    return hasConflict ? { duplicateItineraryStartTime: true } : null;
  };

  private createTrialTourDefaults() {
    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + 3);
    return {
      titleEng: 'Cairo Highlights Tour',
      titleAr: 'جولة معالم القاهرة',
      description: 'A guided tour through Cairo’s most famous landmarks.',
      fullDescription: 'Explore historic Cairo, local culture, and iconic attractions with an experienced guide.',
      pricePerPerson: 120,
      pricePerChild: 60,
      durationDays: 3,
      durationHours: 8,
      maxSeats: 14,
      startDate: this.formatDateInput(start),
      endDate: this.formatDateInput(end),
      cancellationPolicy: 'Free cancellation up to 24 hours before the tour starts.',
      isFreeCancelation: true,
      highlights: ['Pyramids and Sphinx guided visit'],
      includes: ['Professional tour guide'],
      excludes: ['Personal expenses'],
    };
  }

  private formatDateInput(date: Date): string {
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }

  private toDateInput(value: string | null | undefined): string {
    if (!value) return '';
    const dateOnly = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateOnly) return dateOnly[1];
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }

  private toOptionalId(value: unknown): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

}
