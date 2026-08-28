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
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';

import { createEmptyTourItinerary, readTourItinerary } from '../../shared/tour-itinerary.model';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';
import {
  hasInvalidItinerary,
  hasItineraryTimeOverlap,
  isQuarterHourTime,
} from '../../shared/itinerary-validation.util';
import { AdminService } from '../../admin.service';


interface TourImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
  uploaded: boolean;
  isCover: boolean;
}

type TourFormStep = 1 | 2 | 3;

@Component({
  selector: 'app-tours-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, NumbersOnlyDirective, DatePicker],
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
  readonly maxImageWidth = 2400;
  readonly maxImageHeight = 1600;
  private readonly imageConstraints = {
    maxWidth: this.maxImageWidth,
    maxHeight: this.maxImageHeight,
  };
  readonly itineraryTimeOptions = Array.from({ length: 24 * 4 }, (_, index) => {
    const hours = Math.floor(index / 4)
      .toString()
      .padStart(2, '0');
    const minutes = ((index % 4) * 15).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });
  readonly formSteps = [
    { id: 1, label: 'tourDetailsStep', icon: 'mdi-file-document-edit-outline' },
    { id: 2, label: 'tourImagesStep', icon: 'mdi-image-multiple-outline' },
    { id: 3, label: 'tourItineraryStep', icon: 'mdi-map-marker-path' },
  ] as const;
  destinations: any[] = [];
  cities: any[] = [];
  imageUploads: TourImageUpload[] = [];
  destinationsLoading = false;
  citiesLoading = false;
  destinationMenuOpen = false;
  destinationSearchTerm = '';
  isSaving = false;
  apiLoadingMessage = '';
  deletingImageIndex: number | null = null;
  errorMessage = '';
  imageValidationMessage = '';
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
  private citiesRequestSequence = 0;
  readonly today = this.localDate(new Date());

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
    if (selectedId === '') return null;

    const destinationId = Number(selectedId);
    if (!Number.isInteger(destinationId) || destinationId <= 0) return null;

    return (
      this.destinations.find((destination) => Number(destination.id) === destinationId) ?? null
    );
  }

  get selectedCity(): any | null {
    const selectedId = this.tourForm.controls.cityId.value;
    if (selectedId === '') return null;
    const cityId = Number(selectedId);
    if (!Number.isInteger(cityId) || cityId <= 0) return null;
    return this.cities.find((city) => Number(city.id) === cityId) ?? null;
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

  get cancellationPoliciesArray(): FormArray<FormGroup> {
    return this.tourForm.controls.cancellationPolicies;
  }

  get itineraryArray(): FormArray<FormGroup> {
    return this.tourForm.controls.itinerary;
  }

  get currentTourId(): number | null {
    return (
      this.savedTourId ?? this.toOptionalId(this.selectedTour?.id ?? this.selectedTour?.tourId)
    );
  }

  get screenLoaderVisible(): boolean {
    return this.isSaving || this.deletingImageIndex !== null;
  }

  get screenLoaderMessage(): string {
    if (this.deletingImageIndex !== null) return 'deletingTourImage';
    return this.apiLoadingMessage || 'pleaseWaitForRequest';
  }

  get detailsStepInvalid(): boolean {
    const controls: AbstractControl[] = [
      this.tourForm.controls.titleEng,
      this.tourForm.controls.titleAr,
      this.tourForm.controls.descriptionEng,
      this.tourForm.controls.descriptionAr,
      this.tourForm.controls.destinationId,
      this.tourForm.controls.cityId,
      this.tourForm.controls.pricePerPerson,
      this.tourForm.controls.pricePerChild,
      this.tourForm.controls.currencyId,
      this.tourForm.controls.maxSeats,
      this.tourForm.controls.durationDays,
      this.tourForm.controls.durationHours,
      this.tourForm.controls.highlights,
      this.tourForm.controls.includes,
      this.tourForm.controls.excludes,
      this.tourForm.controls.cancellationPolicies,
    ];
    return (
      controls.some((control) => control.invalid) ||
      this.tourForm.hasError('invalidDateRange') ||
      this.tourForm.hasError('invalidTourDuration')
    );
  }

  get currentStepInvalid(): boolean {
    if (this.activeStep === 1) return this.detailsStepInvalid;
    if (this.activeStep === 2) return !this.currentTourId || this.tourForm.controls.images.invalid;
    const itinerary = this.itineraryArray.getRawValue();
    return (
      !this.currentTourId ||
      !!this.itineraryDraft ||
      !itinerary.length ||
      hasInvalidItinerary(itinerary) ||
      hasItineraryTimeOverlap(itinerary)
    );
  }

  loadDestinations(): void {
    this.destinationsLoading = true;
    this.errorMessage = '';
    this.adminService
      .getDestinations(1, 100)
      .pipe(
        catchError(() => {
          this.errorMessage = 'destinationsLoadError';
          return of(null);
        }),
        finalize(() => {
          this.destinationsLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response === null) return;
        this.destinations = this.extractCollection(response, ['destinations'])
          .map((destination) => {
            const id = Number(destination?.id ?? destination?.destinationId);
            return { ...destination, id };
          })
          .filter((destination) => Number.isFinite(destination.id));
      });
  }

  loadCities(destinationId: number, selectedCityId?: number): void {
    const requestSequence = ++this.citiesRequestSequence;
    if (!destinationId) {
      this.cities = [];
      this.tourForm.controls.cityId.setValue('');
      return;
    }
    this.citiesLoading = true;
    this.apiLoadingMessage = '';
    this.adminService
      .getCitiesByDestination(destinationId, 1, 500)
      .pipe(
        catchError(() => {
          if (requestSequence !== this.citiesRequestSequence) return of(null);
          this.errorMessage = 'citiesLoadError';
          return of(null);
        }),
        finalize(() => {
          if (requestSequence !== this.citiesRequestSequence) return;
          this.citiesLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (requestSequence !== this.citiesRequestSequence) return;
        const rows = this.extractCollection(response, ['cities']);
        this.cities = rows
          .filter((city) => city?.isActive !== false)
          .map((city) => ({ ...city, id: Number(city?.id ?? city?.cityId) }))
          .filter((city) => Number.isFinite(city.id));
        const preferredId = Number(selectedCityId ?? this.tourForm.controls.cityId.value);
        this.tourForm.controls.cityId.setValue(
          this.cities.some((city) => city.id === preferredId) ? preferredId : '',
        );
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

    if (this.tourForm.pristine) {
      this.savedTourId = this.currentTourId;
      this.completedStep = Math.max(this.completedStep, 1);
      this.activeStep = 2;
      return;
    }

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

    request$
      .pipe(
        switchMap((detailsResponse: any) => {
          if (detailsResponse?.isSuccess === false) {
            return of({ detailsResponse, tourId: null, statusResponse: null, statusError: null });
          }

          const tourId = existingId ?? this.extractTourId(detailsResponse);
          if (!tourId) {
            return of({ detailsResponse, tourId: null, statusResponse: null, statusError: null });
          }

          return this.adminService.changeTourStatus(tourId, false).pipe(
            map((statusResponse) => ({
              detailsResponse,
              tourId,
              statusResponse,
              statusError: null,
            })),
            catchError((statusError) =>
              of({ detailsResponse, tourId, statusResponse: null, statusError }),
            ),
          );
        }),
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
      )
      .subscribe((result: any) => {
        if (result === null) return;
        const response = result.detailsResponse;
        if (response?.isSuccess === false) {
          this.errorMessage = response?.message || 'tourSaveError';
          this.showApiToast('error', this.errorMessage);
          return;
        }
        const tourId = result.tourId;
        if (!tourId) {
          this.errorMessage = 'tourIdMissingAfterCreate';
          this.showApiToast('error', this.errorMessage);
          return;
        }
        this.savedTourId = tourId;
        if (result.statusError || result.statusResponse?.isSuccess === false) {
          this.errorMessage = result.statusResponse?.message || 'tourStatusUpdateError';
          this.showApiToast('error', this.errorMessage);
          return;
        }
        this.completedStep = Math.max(this.completedStep, 1);
        this.activeStep = 2;
        this.successMessage =
          response?.message || (isCreating ? 'tourDetailsCreated' : 'tourDetailsUpdated');
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
    const coverImageIndex = pendingImages.findIndex((image) => image.isCover);
    if (coverImageIndex >= 0) payload.append('CoverImageIndex', String(coverImageIndex));
    pendingImages.forEach((image) => payload.append('Images', image.file!, image.file!.name));

    this.isSaving = true;
    this.apiLoadingMessage = 'uploadingTourImages';
    this.errorMessage = '';
    this.successMessage = '';
    this.adminService
      .addTourImages(payload)
      .pipe(
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
      )
      .subscribe((response: any) => {
        if (response === null) return;
        if (response?.isSuccess === false) {
          this.errorMessage = response?.message || 'tourImagesSaveError';
          this.showApiToast('error', this.errorMessage);
          return;
        }
        const savedCoverUrl = String(response?.data?.coverImageUrl ?? '');
        const returnedImages = Array.isArray(response?.data?.images) ? response.data.images : [];
        if (returnedImages.length) {
          this.revokeNewImageUrls();
          this.imageUploads = returnedImages
            .slice(0, this.maxImages)
            .map((image: any, index: number) => ({
              id: this.toOptionalId(image?.id ?? image?.tourImageId) ?? undefined,
              url: this.imageUrl(image),
              name:
                image?.imageName ??
                image?.name ??
                this.translate.instant('tourImageNumber', { number: index + 1 }),
              existing: true,
              uploaded: true,
              isCover: this.imageMatchesCover(image, savedCoverUrl),
            }))
            .filter((image: TourImageUpload) => !!image.url);
          if (this.imageUploads.length && !this.imageUploads.some((image) => image.isCover)) {
            this.imageUploads[0].isCover = true;
          }
          this.syncImagesControl();
        } else {
          pendingImages.forEach((image) => (image.uploaded = true));
        }
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

    const itinerary = this.itineraryArray.getRawValue();
    this.itineraryArray.markAllAsTouched();
    if (!itinerary.length || hasInvalidItinerary(itinerary)) {
      this.errorMessage = 'itineraryTitleAndTimesRequired';
      return;
    }
    if (hasItineraryTimeOverlap(itinerary)) {
      this.errorMessage = 'itineraryTimeConflict';
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

    this.adminService
      .addTourItinerary(payload)
      .pipe(
        switchMap((itineraryResponse: any) => {
          if (itineraryResponse?.isSuccess === false) {
            return of({ itineraryResponse, statusResponse: null, statusError: null });
          }

          return this.adminService
            .changeTourStatus(this.currentTourId!, this.tourForm.controls.isActive.value)
            .pipe(
              map((statusResponse) => ({ itineraryResponse, statusResponse, statusError: null })),
              catchError((statusError) =>
                of({ itineraryResponse, statusResponse: null, statusError }),
              ),
            );
        }),
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
      )
      .subscribe((result: any) => {
        if (result === null) return;
        const response = result.itineraryResponse;
        if (response?.isSuccess === false) {
          this.errorMessage = response?.message || 'tourItinerarySaveError';
          this.showApiToast('error', this.errorMessage);
          return;
        }
        if (result.statusError || result.statusResponse?.isSuccess === false) {
          this.errorMessage = result.statusResponse?.message || 'tourStatusUpdateError';
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
    this.highlightsArray.push(this.createLocalizedListItemGroup());
  }

  removeHighlight(index: number): void {
    this.highlightsArray.removeAt(index);
  }

  addInclude(): void {
    this.includesArray.push(this.createLocalizedListItemGroup());
  }

  removeInclude(index: number): void {
    this.includesArray.removeAt(index);
  }

  addExclude(): void {
    this.excludesArray.push(this.createLocalizedListItemGroup());
  }

  removeExclude(index: number): void {
    this.excludesArray.removeAt(index);
  }

  addCancellationPolicy(): void {
    this.cancellationPoliciesArray.push(this.createLocalizedListItemGroup());
  }

  removeCancellationPolicy(index: number): void {
    this.cancellationPoliciesArray.removeAt(index);
  }

  openItineraryStepEditor(): void {
    if (this.itineraryDraft) return;
    const tourId = this.currentTourId;
    const step = createEmptyTourItinerary(tourId);
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
    child.arrivalDate = String(parentGroup.controls['arrivalDate'].value ?? '');
    this.itineraryDraft = this.createItineraryGroup(child);
    this.itineraryDraftCollection = this.itineraryChildrenArray(parentGroup);
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = true;
    this.attachItineraryScheduleValidator();
  }

  editItineraryStep(collection: FormArray<FormGroup>, index: number, isChild: boolean): void {
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

  onOneDayTourChanged(): void {
    const oneDay = this.tourForm.controls.isOneDayTour.value;
    const currentDays = Number(this.tourForm.controls.durationDays.value);
    this.tourForm.controls.durationDays.setValue(oneDay ? 0 : Math.max(1, currentDays || 1));
    if (oneDay && Number(this.tourForm.controls.durationHours.value) < 1) {
      this.tourForm.controls.durationHours.setValue(1);
    }
    this.syncOneDayTourState();
    this.tourForm.updateValueAndValidity();
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
    this.imageValidationMessage = '';
    if (this.imageUploads.length + files.length > this.maxImages) {
      this.imageValidationMessage = 'tourImageLimit';
      return;
    }
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
        this.imageUploads.push({
          file: normalized,
          url: URL.createObjectURL(normalized),
          name: normalized.name,
          existing: false,
          uploaded: false,
          isCover: this.imageUploads.length === 0,
        });
      } catch (error) {
        this.imageValidationMessage =
          error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError';
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
      const removedWasCover = image.isCover;
      this.deletingImageIndex = index;
      this.adminService
        .deleteTourImage(imageId)
        .pipe(
          catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
            return of({ imageDeleteFailed: true });
          }),
          finalize(() => {
            this.deletingImageIndex = null;
            this.cdr.markForCheck();
          }),
        )
        .subscribe((response: any) => {
          if (response?.imageDeleteFailed || response?.isSuccess === false) {
            if (response?.isSuccess === false) {
              Swal.fire({
                icon: 'error',
                title: response?.message || this.translate.instant('imageDeleteError'),
              });
            }
            return;
          }
          this.removeImageLocally(index);
          if (removedWasCover) this.refreshTourImages();
          this.showImageDeletedToast();
        });
      return;
    }

    this.removeImageLocally(index);
    this.showImageDeletedToast();
  }

  setCoverImage(index: number): void {
    if (this.isSaving || this.deletingImageIndex !== null) return;
    const image = this.imageUploads[index];
    if (!image || image.isCover) return;

    const tourId = this.currentTourId;
    const imageId = Number(image.id);
    if (image.existing && tourId && Number.isInteger(imageId) && imageId > 0) {
      this.isSaving = true;
      this.apiLoadingMessage = 'savingTourDetails';
      this.adminService
        .setTourCoverImage(tourId, imageId)
        .pipe(
          catchError((error) => {
            this.showApiToast('error', error?.error?.message || 'tourSaveError');
            return of(null);
          }),
          finalize(() => {
            this.isSaving = false;
            this.apiLoadingMessage = '';
            this.cdr.markForCheck();
          }),
        )
        .subscribe((response: any) => {
          if (response === null || response?.isSuccess === false) {
            if (response?.isSuccess === false) {
              this.showApiToast('error', response?.message || 'tourSaveError');
            }
            return;
          }
          this.markCoverImage(index);
          this.showApiToast('success', response?.message || 'tourCover');
        });
      return;
    }

    this.markCoverImage(index);
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
    if (!Number.isInteger(destinationId) || destinationId <= 0) return;
    this.tourForm.controls.destinationId.setValue(destinationId);
    this.tourForm.controls.destinationId.markAsDirty();
    this.tourForm.controls.destinationId.markAsTouched();
    this.tourForm.controls.cityId.setValue('');
    this.loadCities(destinationId);
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
    this.imageValidationMessage = '';
    this.activeStep = 1;
    this.completedStep = 0;
    this.savedTourId = this.toOptionalId(tour?.id ?? tour?.tourId);
    const coverImageUrl = String(tour?.coverImageUrl ?? '');
    const tourImages =
      Array.isArray(tour?.images) && tour.images.length
        ? tour.images
        : (tour?.coverImageUrl ?? tour?.imageUrl)
          ? [
              {
                imageUrl: tour.coverImageUrl ?? tour.imageUrl,
                imageName: this.translate.instant('tourCover'),
              },
            ]
          : [];
    const imageUploads = tourImages
      .slice(0, this.maxImages)
      .map((image: any, index: number) => ({
        id: this.toOptionalId(image?.id ?? image?.tourImageId) ?? undefined,
        url: this.imageUrl(image),
        name:
          image?.imageName ??
          image?.name ??
          this.translate.instant('tourImageNumber', { number: index + 1 }),
        existing: true,
        uploaded: true,
        isCover: this.imageMatchesCover(image, coverImageUrl),
      }))
      .filter((image: TourImageUpload) => !!image.url);
    this.imageUploads = imageUploads;
    if (this.imageUploads.length && !this.imageUploads.some((image) => image.isCover)) {
      this.imageUploads[0].isCover = true;
    }
    this.tourForm.patchValue({
      titleEng: tour.titleEng ?? tour.title ?? '',
      titleAr: tour.titleAr ?? '',
      destinationId: tour.destinationId ?? '',
      cityId: tour.cityId ?? '',
      descriptionEng: tour.descriptionEng ?? tour.description ?? tour.overview ?? '',
      descriptionAr: tour.descriptionAr ?? '',
      fullDescriptionEng: tour.fullDescriptionEng ?? tour.fullDescription ?? '',
      fullDescriptionAr: tour.fullDescriptionAr ?? '',
      pricePerPerson: Number(tour.pricePerPerson ?? tour.price ?? 0),
      pricePerChild: Number(tour.pricePerChild ?? 0),
      currencyId: Number(tour.currencyId ?? this.defaultCurrencyId),
      durationDays: Number(tour.durationDays ?? 0),
      durationHours: Number(tour.durationhours ?? tour.durationHours ?? 0),
      maxSeats: Number(tour.maxSeats ?? 14),
      startDate: this.toDateInput(tour.startDate),
      endDate: this.toDateInput(tour.endDate),
      isFreeCancelation: tour.isFreeCancelation === true,
      isNileCruise: tour.isNileCruise === true,
      isOneDayTour: tour.isOneDayTour === true,
      isActive: tour.isActive !== false,
    });
    this.syncOneDayTourState();
    this.setHighlights(tour.highlights ?? []);
    this.setIncludes(tour.includes ?? []);
    this.setExcludes(tour.excludes ?? []);
    this.setCancellationPolicies(tour.cancellationPolicies ?? (tour.cancellationPolicy ? [{ valueAr: tour.cancellationPolicy, valueEng: tour.cancellationPolicy }] : []));
    this.setItinerary(tour.itinerary ?? tour.itineraries ?? []);
    this.syncImagesControl();
    const destinationId = Number(tour.destinationId);
    if (destinationId) this.loadCities(destinationId, Number(tour.cityId));
    this.closeDestinationMenu();
  }

  private resetForm(emitCancel: boolean): void {
    this.closeItineraryEditor();
    this.closeDestinationMenu();
    this.citiesRequestSequence++;
    this.cities = [];
    this.citiesLoading = false;
    this.revokeNewImageUrls();
    this.activeStep = 1;
    this.completedStep = 0;
    this.savedTourId = null;
    this.imageUploads = [];
    this.imageValidationMessage = '';
    this.tourForm.reset({
      titleEng: '',
      titleAr: '',
      destinationId: '',
      cityId: '',
      descriptionEng: '',
      descriptionAr: '',
      fullDescriptionEng: '',
      fullDescriptionAr: '',

      pricePerPerson: 0,
      pricePerChild: 0,
      currencyId: this.defaultCurrencyId,
      durationDays: 1,
      durationHours: 0,
      maxSeats: 1,
      startDate: this.today,
      endDate: this.localDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
      images: [],
      isFreeCancelation: false,
      isNileCruise: false,
      isOneDayTour: false,
      isActive: true,
    });
    this.syncOneDayTourState();
    this.setHighlights([]);
    this.setIncludes([]);
    this.setExcludes([]);
    this.setCancellationPolicies([]);
    this.setItinerary([]);
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup(
      {
        titleEng: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\s'-]*$/)],
        }),
        titleAr: new FormControl('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'-]*$/),
          ],
        }),
        destinationId: new FormControl<number | ''>('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        cityId: new FormControl<number | ''>('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        descriptionEng: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.maxLength(4000)],
        }),
        descriptionAr: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.maxLength(4000), Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'"-]*$/)],
        }),
        fullDescriptionEng: new FormControl('', {
          nonNullable: true,
          validators: [Validators.maxLength(8000)],
        }),
        fullDescriptionAr: new FormControl('', {
          nonNullable: true,
          validators: [Validators.maxLength(8000), Validators.pattern(/^(?:[\u0600-\u06FF][\u0600-\u06FF\s'"-]*)?$/)],
        }),
 
        pricePerPerson: new FormControl(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(0.01)],
        }),
        pricePerChild: new FormControl(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(0)],
        }),
        currencyId: new FormControl(this.defaultCurrencyId, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(1)],
        }),
        durationDays: new FormControl(1, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(1)],
        }),
        durationHours: new FormControl(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(0)],
        }),
        maxSeats: new FormControl(1, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(1)],
        }),
        startDate: new FormControl(this.today, { nonNullable: true }),
        endDate: new FormControl(this.localDate(new Date(Date.now() + 24 * 60 * 60 * 1000)), { nonNullable: true }),
        images: new FormControl<string[]>([], {
          nonNullable: true,
          validators: [Validators.required],
        }),
        isFreeCancelation: new FormControl(false, { nonNullable: true }),
        isNileCruise: new FormControl(false, { nonNullable: true }),
        isOneDayTour: new FormControl(false, { nonNullable: true }),
        isActive: new FormControl(true, { nonNullable: true }),
        highlights: new FormArray<FormGroup>([]),
        includes: new FormArray<FormGroup>([]),
        excludes: new FormArray<FormGroup>([]),
        cancellationPolicies: new FormArray<FormGroup>([]),
        itinerary: new FormArray<FormGroup>([]),
      },
      { validators: [this.dateRangeValidator, this.tourDurationValidator] },
    );
  }

  private createLocalizedListItemGroup(item: any = {}): FormGroup {
    return new FormGroup({
      id: new FormControl(Number(item?.id) || 0, { nonNullable: true }),
      valueEng: new FormControl(String(item?.valueEng ?? item?.value ?? item?.text ?? item?.title ?? ''), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      valueAr: new FormControl(String(item?.valueAr ?? item?.value ?? item?.text ?? item?.title ?? ''), {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'"-]*$/)],
      }),
    });
  }

  private createItineraryGroup(item: any, depth = 0): FormGroup {
    const itinerary = readTourItinerary(item, this.currentTourId);
    return new FormGroup(
      {
        id: new FormControl(itinerary.id, { nonNullable: true }),
        orderNumber: new FormControl(itinerary.orderNumber, { nonNullable: true }),
        parentId: new FormControl<number | null>(itinerary.parentId),
        isChildNode: new FormControl(itinerary.isChildNode, { nonNullable: true }),
        titleEng: new FormControl(itinerary.titleEng, {
          nonNullable: true,
          validators: [Validators.required, Validators.maxLength(200)],
        }),
        titleAr: new FormControl(itinerary.titleAr, {
          nonNullable: true,
          validators: [Validators.required, Validators.maxLength(200), Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'"-]*$/)],
        }),
        valueEng: new FormControl(itinerary.valueEng, { nonNullable: true, validators: [Validators.maxLength(2000)] }),
        valueAr: new FormControl(itinerary.valueAr, {
          nonNullable: true,
          validators: [Validators.maxLength(2000), Validators.pattern(/^(?:[\u0600-\u06FF][\u0600-\u06FF\s'"-]*)?$/)],
        }),
        notes: new FormControl(itinerary.notes, {
          nonNullable: true,
          validators: [Validators.maxLength(2000)],
        }),
        arrivalDate: new FormControl(itinerary.arrivalDate, { nonNullable: true }),
        startTime: new FormControl<string | null>(itinerary.startTime, {
          validators: [Validators.required, this.quarterHourTimeValidator],
        }),
        endTime: new FormControl<string | null>(itinerary.endTime, {
          validators: [Validators.required, this.quarterHourTimeValidator],
        }),
        tourId: new FormControl<number | null>(itinerary.tourId),
        childs: new FormArray<FormGroup>(
          depth === 0 ? itinerary.childs.map((child) => this.createItineraryGroup(child, 1)) : [],
        ),
      },
      { validators: this.itineraryTimeRangeValidator },
    );
  }

  private setHighlights(highlights: any[]): void {
    this.setLocalizedListItems(this.highlightsArray, highlights);
  }

  private setIncludes(includes: any[]): void {
    this.setLocalizedListItems(this.includesArray, includes);
  }

  private setExcludes(excludes: any[]): void {
    this.setLocalizedListItems(this.excludesArray, excludes);
  }

  private setCancellationPolicies(policies: any[]): void {
    this.setLocalizedListItems(this.cancellationPoliciesArray, policies);
  }

  private setLocalizedListItems(collection: FormArray<FormGroup>, values: any[]): void {
    collection.clear();
    const items = Array.isArray(values) ? values : [];
    items.forEach((item) =>
      collection.push(this.createLocalizedListItemGroup(typeof item === 'string' ? { valueAr: item, valueEng: item } : item)),
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
    this.itineraryDraft.addValidators(this.itineraryTimeConflictValidator);
    this.itineraryDraft.updateValueAndValidity();
  }

  private validateDetailsStep(): boolean {
    const controls: AbstractControl[] = [
      this.tourForm.controls.titleEng,
      this.tourForm.controls.titleAr,
      this.tourForm.controls.descriptionEng,
      this.tourForm.controls.descriptionAr,
      this.tourForm.controls.destinationId,
      this.tourForm.controls.cityId,
      this.tourForm.controls.pricePerPerson,
      this.tourForm.controls.pricePerChild,
      this.tourForm.controls.currencyId,
      this.tourForm.controls.maxSeats,
      this.tourForm.controls.durationDays,
      this.tourForm.controls.durationHours,
      this.tourForm.controls.highlights,
      this.tourForm.controls.includes,
      this.tourForm.controls.excludes,
      this.tourForm.controls.cancellationPolicies,
    ];
    controls.forEach((control) => control.markAllAsTouched());
    const valid =
      controls.every((control) => control.valid) &&
      !this.tourForm.hasError('invalidDateRange') &&
      !this.tourForm.hasError('invalidTourDuration');
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
      CityId: Number(form.cityId),
      DescriptionEng: form.descriptionEng.trim(),
      DescriptionAr: form.descriptionAr.trim(),
      FullDescriptionEng: form.fullDescriptionEng.trim() || null,
      FullDescriptionAr: form.fullDescriptionAr.trim() || null,
      PricePerPerson: Number(form.pricePerPerson),
      PricePerChild: Number(form.pricePerChild),
      CurrencyId: Number(form.currencyId),
      DurationDays: Number(form.durationDays),
      Durationhours: Number(form.durationHours),
      MaxSeats: Number(form.maxSeats),
      StartDate: this.toApiDate(form.startDate),
      EndDate: this.toApiDate(form.endDate),
      IsFreeCancelation: form.isFreeCancelation,
      IsNileCruise: form.isNileCruise,
      IsOneDayTour: form.isOneDayTour,
      Highlights: this.toLocalizedListPayload(form.highlights),
      Includes: this.toLocalizedListPayload(form.includes),
      Excludes: this.toLocalizedListPayload(form.excludes),
      CancellationPolicies: this.toLocalizedListPayload(form.cancellationPolicies),
      IsActive: false,
    };
  }

  private toLocalizedListPayload(items: any[]): { Id: number; ValueEng: string; ValueAr: string }[] {
    return items
      .map((item) => ({
        Id: Number(item?.id) || 0,
        ValueEng: String(item?.valueEng ?? '').trim(),
        ValueAr: String(item?.valueAr ?? '').trim(),
      }))
      .filter((item) => !!item.ValueEng && !!item.ValueAr);
  }

  private buildItineraryPayload(): Record<string, unknown>[] {
    return this.itineraryArray
      .getRawValue()
      .filter((item: any) => !!item.titleEng || !!item.titleAr || !!item.valueEng || !!item.valueAr)
      .map((item: any, index: number) => this.mapItineraryItem(item, index + 1));
  }

  private mapItineraryItem(item: any, orderNumber: number): Record<string, unknown> {
    const children = Array.isArray(item?.childs) ? item.childs : [];
    return {
      Id: Number(item?.id) || 0,
      OrderNumber: Number(item?.orderNumber) || orderNumber,
      ParentId: this.toOptionalId(item?.parentId),
      IsChildNode: item?.isChildNode === true,
      TitleAr: String(item?.titleAr ?? '').trim(),
      TitleEng: String(item?.titleEng ?? '').trim(),
      ValueAr: String(item?.valueAr ?? '').trim(),
      ValueEng: String(item?.valueEng ?? '').trim(),
      Notes: String(item?.notes ?? '').trim(),
      ArrivalDate: String(item?.arrivalDate ?? '') || null,
      StartTime: this.toApiTime(item?.startTime),
      EndTime: this.toApiTime(item?.endTime),
      Childs: children.map((child: any, index: number) => this.mapItineraryItem(child, index + 1)),
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

  private toApiDate(value: string): string | null {
    return value ? `${value}T00:00:00` : null;
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
    if (removed?.isCover && this.imageUploads.length) {
      this.imageUploads[0].isCover = true;
    }
    this.syncImagesControl();
    this.cdr.markForCheck();
  }

  private markCoverImage(index: number): void {
    this.imageUploads.forEach((item, itemIndex) => (item.isCover = itemIndex === index));
    this.cdr.markForCheck();
  }

  private refreshTourImages(): void {
    const tourId = this.currentTourId;
    if (!tourId) return;

    this.adminService
      .getTours(1, 100)
      .pipe(catchError(() => of(null)))
      .subscribe((response: any) => {
        const rows = this.extractCollection(response, ['tours']);
        const tour = rows.find((item) => Number(item?.id ?? item?.tourId) === tourId);
        const coverImageUrl = String(tour?.coverImageUrl ?? '');
        if (!coverImageUrl) return;
        const replacementIndex = this.imageUploads.findIndex(
          (item) => this.normalizeImagePath(item.url) === this.normalizeImagePath(coverImageUrl),
        );
        if (replacementIndex >= 0) this.markCoverImage(replacementIndex);
      });
  }

  private showImageDeletedToast(): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      iconColor: '#00d492',
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
      iconColor: icon === 'success' ? '#00d492' : undefined,
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

  private imageMatchesCover(image: any, coverImageUrl: string): boolean {
    if (!coverImageUrl) return false;
    const imageUrl = this.imageUrl(image);
    return this.normalizeImagePath(imageUrl) === this.normalizeImagePath(coverImageUrl);
  }

  private normalizeImagePath(url: string): string {
    return String(url ?? '')
      .trim()
      .replace(/\\/g, '/')
      .replace(/^https?:\/\/[^/]+\/images\//i, '')
      .replace(/^\/+/, '')
      .replace(/^images\//i, '')
      .toLowerCase();
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
    return new Date(endDate).getTime() > new Date(startDate).getTime()
      ? null
      : { invalidDateRange: true };
  }

  private tourDurationValidator(control: AbstractControl): ValidationErrors | null {
    const oneDay = control.get('isOneDayTour')?.value === true;
    const days = Number(control.get('durationDays')?.value);
    const hours = Number(control.get('durationHours')?.value);
    const valid = oneDay
      ? days === 0 && Number.isFinite(hours) && hours >= 1
      : Number.isInteger(days) && days >= 1 && Number.isFinite(hours) && hours >= 0;
    return valid ? null : { invalidTourDuration: true };
  }

  private syncOneDayTourState(): void {
    const daysControl = this.tourForm.controls.durationDays;
    const hoursControl = this.tourForm.controls.durationHours;
    const oneDay = this.tourForm.controls.isOneDayTour.value;
    daysControl.setValidators([Validators.required, Validators.min(oneDay ? 0 : 1)]);
    hoursControl.setValidators([Validators.required, Validators.min(oneDay ? 1 : 0)]);
    if (oneDay) {
      daysControl.disable({ emitEvent: false });
    } else {
      daysControl.enable({ emitEvent: false });
    }
    daysControl.updateValueAndValidity({ emitEvent: false });
    hoursControl.updateValueAndValidity({ emitEvent: false });
  }

  private itineraryTimeRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    if (!startTime || !endTime) return null;
    return String(endTime) > String(startTime) ? null : { invalidItineraryTimeRange: true };
  }

  private quarterHourTimeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') return null;
    return isQuarterHourTime(value) ? null : { invalidQuarterHourTime: true };
  }

  private readonly itineraryTimeConflictValidator = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    const arrivalDate = String(control.get('arrivalDate')?.value ?? '');
    if (!startTime || !endTime || !arrivalDate || !this.itineraryDraftCollection) {
      return null;
    }

    const siblingSteps = this.itineraryDraftCollection.controls
      .filter((_, index) => index !== this.itineraryDraftIndex)
      .map((step) => step.getRawValue());
    const hasConflict = hasItineraryTimeOverlap([control.getRawValue(), ...siblingSteps]);

    return hasConflict ? { itineraryTimeOverlap: true } : null;
  };

  private toDateInput(value: string | null | undefined): string {
    if (!value) return '';
    const dateOnly = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateOnly) return dateOnly[1];
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }

  private localDate(value: Date): string {
    return `${value.getFullYear().toString().padStart(4, '0')}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${value.getDate().toString().padStart(2, '0')}`;
  }

  private toOptionalId(value: unknown): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }
}
