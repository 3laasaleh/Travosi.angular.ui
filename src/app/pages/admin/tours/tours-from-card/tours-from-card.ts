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
import { AdminService } from '../../admin.service';
import {
  createEmptyTourItinerary,
  readTourItinerary,
  toTourItineraryPayload,
} from '../../shared/tour-itinerary.model';

interface TourImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
}

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
  readonly maxImageWidth = 2400;
  readonly maxImageHeight = 1600;
  destinations: any[] = [];
  imageUploads: TourImageUpload[] = [];
  destinationsLoading = false;
  destinationMenuOpen = false;
  destinationSearchTerm = '';
  isSaving = false;
  deletingImageIndex: number | null = null;
  errorMessage = '';
  successMessage = '';
  tourForm = this.createForm();
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

  get highlightsArray(): FormArray<FormControl<string>> {
    return this.tourForm.controls.highlights;
  }

  get includesArray(): FormArray<FormGroup> {
    return this.tourForm.controls.includes;
  }

  get itineraryArray(): FormArray<FormGroup> {
    return this.tourForm.controls.itinerary;
  }

  get rootItineraryGroups(): FormGroup[] {
    const clientIds = new Set(
      this.itineraryArray.controls.map((group) => String(group.controls['clientId'].value)),
    );
    return this.itineraryArray.controls.filter((group) => {
      const isChildNode = group.controls['isChildNode'].value === true;
      const parentClientId = group.controls['parentClientId'].value;
      return !isChildNode || !parentClientId || !clientIds.has(String(parentClientId));
    });
  }

  itineraryChildGroups(parentGroup: FormGroup): FormGroup[] {
    const parentClientId = String(parentGroup.controls['clientId'].value);
    return this.itineraryArray.controls.filter(
      (group) =>
        group.controls['isChildNode'].value === true &&
        String(group.controls['parentClientId'].value) === parentClientId,
    );
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
    });
  }

  saveTour(): void {
    if (this.isSaving) return;
    if (this.tourForm.invalid) {
      this.tourForm.markAllAsTouched();
      return;
    }
    const form = this.tourForm.getRawValue();
    const editing = this.selectedTour;
    const tourId = this.toOptionalId(editing?.id ?? editing?.tourId);

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';
    const payload = new FormData();
    if (tourId) payload.append('Id', String(tourId));
    payload.append('TitleEng', form.titleEng.trim());
    payload.append('TitleAr', form.titleAr.trim());
    payload.append('DestinationId', String(Number(form.destinationId)));
    payload.append('Description', form.description.trim());
    payload.append('FullDescription', form.fullDescription.trim());
    payload.append('PricePerPerson', String(Number(form.pricePerPerson)));
    payload.append('PricePerChild', String(Number(form.pricePerChild)));
    payload.append('CurrencyId', String(Number(form.currencyId)));
    payload.append('DurationDays', String(Number(form.durationDays)));
    payload.append('Durationhours', String(Number(form.durationHours)));
    payload.append('MaxSeats', String(Number(form.maxSeats)));
    payload.append('StartDate', form.startDate);
    payload.append('EndDate', form.endDate);
    payload.append('CancellationPolicy', form.cancellationPolicy.trim());
    payload.append('IsFreeCancelation', String(form.isFreeCancelation));
    payload.append('IsActive', String(form.isActive));

    form.highlights
      .map((text: string) => text.trim())
      .filter(Boolean)
      .forEach((text: string, index: number) => payload.append(`Highlights[${index}].Text`, text));

    form.includes
      .map((item: any) => ({
        text: String(item.text ?? '').trim(),
        isIncluded: item.isIncluded === true,
      }))
      .filter((item: { text: string }) => !!item.text)
      .forEach((item: { text: string; isIncluded: boolean }, index: number) => {
        payload.append(`Includes[${index}].Text`, item.text);
        payload.append(`Includes[${index}].IsIncluded`, String(item.isIncluded));
      });

    form.itinerary
      .map((item: any) => toTourItineraryPayload(item, tourId))
      .filter((item) => !!item.title || !!item.value || !!item.description)
      .forEach((item, index) => {
        payload.append(`Itinerary[${index}].Id`, String(item.id));
        if (item.parentId) payload.append(`Itinerary[${index}].ParentId`, String(item.parentId));
        payload.append(`Itinerary[${index}].IsChildNode`, String(item.isChildNode));
        payload.append(`Itinerary[${index}].Title`, item.title);
        payload.append(`Itinerary[${index}].Value`, item.value);
        payload.append(`Itinerary[${index}].Description`, item.description);
        if (item.startTime) payload.append(`Itinerary[${index}].StartTime`, item.startTime);
        if (item.endTime) payload.append(`Itinerary[${index}].EndTime`, item.endTime);
        if (item.tourId) payload.append(`Itinerary[${index}].TourId`, String(item.tourId));
      });

    this.imageUploads
      .filter((image) => image.file)
      .forEach((image) => payload.append('Images', image.file!, image.file!.name));
    this.imageUploads
      .filter((image) => image.existing)
      .forEach((image) => payload.append('ExistingImageUrls', image.url));

    const request$ = editing
      ? this.adminService.updateTour(payload)
      : this.adminService.createTour(payload);

    request$.pipe(
      catchError(() => {
        this.errorMessage = 'tourSaveError';
        return of(null);
      }),
      finalize(() => {
        this.isSaving = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((res: any) => {
      if (res === null) return;
      if (res?.isSuccess === false) {
        this.errorMessage = res?.message || 'tourSaveError';
        return;
      }
      this.successMessage = res?.message || (editing ? 'tourUpdated' : 'tourCreated');
      this.resetForm(false);
      this.tourSaved.emit();
    });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  addHighlight(): void {
    this.highlightsArray.push(new FormControl('', { nonNullable: true, validators: [Validators.required] }));
  }

  removeHighlight(index: number): void {
    this.highlightsArray.removeAt(index);
  }

  addInclude(isIncluded = true): void {
    this.includesArray.push(this.createIncludeGroup('', isIncluded));
  }

  removeInclude(index: number): void {
    this.includesArray.removeAt(index);
  }

  addItineraryStep(): void {
    const tourId = this.toOptionalId(this.selectedTour?.id ?? this.selectedTour?.tourId);
    this.itineraryArray.push(
      this.createItineraryGroup(
        createEmptyTourItinerary(tourId),
        this.nextItineraryClientId(),
        null,
      ),
    );
  }

  addItineraryChild(parentGroup: FormGroup): void {
    const tourId = this.toOptionalId(this.selectedTour?.id ?? this.selectedTour?.tourId);
    const parentId = this.toOptionalId(parentGroup.controls['id'].value);
    const parentClientId = String(parentGroup.controls['clientId'].value);
    const child = createEmptyTourItinerary(tourId);
    child.parentId = parentId;
    child.isChildNode = true;
    const childGroup = this.createItineraryGroup(
      child,
      this.nextItineraryClientId(),
      parentClientId,
    );
    const parentIndex = this.itineraryArray.controls.indexOf(parentGroup);
    let insertIndex = parentIndex + 1;
    while (
      insertIndex < this.itineraryArray.length &&
      String(this.itineraryArray.at(insertIndex).controls['parentClientId'].value) === parentClientId
    ) {
      insertIndex++;
    }
    this.itineraryArray.insert(insertIndex, childGroup);
  }

  removeItineraryStep(group: FormGroup): void {
    const clientId = String(group.controls['clientId'].value);
    for (let index = this.itineraryArray.length - 1; index >= 0; index--) {
      const current = this.itineraryArray.at(index);
      if (
        current === group ||
        String(current.controls['parentClientId'].value) === clientId
      ) {
        this.itineraryArray.removeAt(index);
      }
    }
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
        const normalized = await this.normalizeImage(file);
        this.imageUploads.push({
          file: normalized,
          url: URL.createObjectURL(normalized),
          name: normalized.name,
          existing: false,
        });
      } catch {
        this.errorMessage = 'imageReadError';
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
    if (image.existing && this.selectedTour && Number.isInteger(imageId) && imageId > 0) {
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
    this.revokeNewImageUrls();
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
      currencyId: Number(tour.currencyId ?? 2),
      durationDays: Number(tour.durationDays ?? 0),
      durationHours: Number(tour.durationhours ?? tour.durationHours ?? 0),
      maxSeats: Number(tour.maxSeats ?? 14),
      startDate: this.toDateTimeLocal(tour.startDate),
      endDate: this.toDateTimeLocal(tour.endDate),
      cancellationPolicy: tour.cancellationPolicy ?? '',
      isFreeCancelation: tour.isFreeCancelation === true,
      isActive: tour.isActive !== false,
    });
    this.setHighlights(tour.highlights ?? []);
    this.setIncludes(tour.includes ?? []);
    this.setItinerary(tour.itinerary ?? tour.itineraries ?? []);
    this.syncImagesControl();
    this.closeDestinationMenu();
  }

  private resetForm(emitCancel: boolean): void {
    this.closeDestinationMenu();
    this.revokeNewImageUrls();
    this.imageUploads = [];
    this.tourForm.reset({
      titleEng: '',
      titleAr: '',
      destinationId: '',
      description: '',
      fullDescription: '',
      pricePerPerson: 0,
      pricePerChild: 0,
      currencyId: 2,
      durationDays: 0,
      durationHours: 0,
      maxSeats: 14,
      startDate: '',
      endDate: '',
      images: [],
      cancellationPolicy: '',
      isFreeCancelation: false,
      isActive: true,
    });
    this.setHighlights([]);
    this.setIncludes([]);
    this.setItinerary([]);
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      titleEng: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\s'-]*$/)],
      }),
      titleAr: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'-]*$/)],
      }),
      destinationId: new FormControl<number | ''>('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true }),
      fullDescription: new FormControl('', { nonNullable: true }),
      pricePerPerson: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0.01)],
      }),
      pricePerChild: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      currencyId: new FormControl(2, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      durationDays: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      durationHours: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0), Validators.max(23)],
      }),
      maxSeats: new FormControl(14, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      endDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      images: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      cancellationPolicy: new FormControl('', { nonNullable: true }),
      isFreeCancelation: new FormControl(false, { nonNullable: true }),
      isActive: new FormControl(true, { nonNullable: true }),
      highlights: new FormArray<FormControl<string>>([]),
      includes: new FormArray<FormGroup>([]),
      itinerary: new FormArray<FormGroup>([]),
    }, { validators: this.dateRangeValidator });
  }

  private createIncludeGroup(text: string, isIncluded: boolean): FormGroup {
    return new FormGroup({
      text: new FormControl(text, { nonNullable: true, validators: [Validators.required] }),
      isIncluded: new FormControl(isIncluded, { nonNullable: true }),
    });
  }

  private createItineraryGroup(
    item: any,
    clientId = this.nextItineraryClientId(),
    parentClientId: string | null = null,
  ): FormGroup {
    const itinerary = readTourItinerary(item, this.toOptionalId(this.selectedTour?.id ?? this.selectedTour?.tourId));
    return new FormGroup({
      clientId: new FormControl(clientId, { nonNullable: true }),
      parentClientId: new FormControl<string | null>(parentClientId),
      id: new FormControl(itinerary.id, { nonNullable: true }),
      parentId: new FormControl<number | null>(itinerary.parentId),
      isChildNode: new FormControl(itinerary.isChildNode, { nonNullable: true }),
      title: new FormControl(itinerary.title, { nonNullable: true, validators: [Validators.required] }),
      value: new FormControl(itinerary.value, { nonNullable: true }),
      description: new FormControl(itinerary.description, { nonNullable: true }),
      startTime: new FormControl<string | null>(itinerary.startTime),
      endTime: new FormControl<string | null>(itinerary.endTime),
      tourId: new FormControl<number | null>(itinerary.tourId),
    });
  }

  private setHighlights(highlights: any[]): void {
    this.highlightsArray.clear();
    const items = Array.isArray(highlights) ? highlights : [];
    items.forEach((item) => {
      const text = typeof item === 'string' ? item : (item?.text ?? item?.title ?? '');
      this.highlightsArray.push(new FormControl(text, { nonNullable: true, validators: [Validators.required] }));
    });
  }

  private setIncludes(includes: any[]): void {
    this.includesArray.clear();
    const items = Array.isArray(includes) ? includes : [];
    items.forEach((item) => {
      const text = typeof item === 'string' ? item : (item?.text ?? item?.title ?? '');
      const isIncluded = item?.isIncluded !== false;
      this.includesArray.push(this.createIncludeGroup(text, isIncluded));
    });
  }

  private setItinerary(itinerary: any[]): void {
    this.itineraryArray.clear();
    const items = Array.isArray(itinerary) ? itinerary : [];
    this.itineraryClientSequence = 0;
    const idToClientId = new Map<number, string>();
    items.forEach((item) => {
      const id = this.toOptionalId(item?.id);
      if (id) idToClientId.set(id, `server-itinerary-${id}`);
    });
    items.forEach((item) => {
      const id = this.toOptionalId(item?.id);
      const parentId = this.toOptionalId(item?.parentId);
      this.itineraryArray.push(
        this.createItineraryGroup(
          item,
          (id && idToClientId.get(id)) || this.nextItineraryClientId(),
          parentId ? (idToClientId.get(parentId) ?? `server-itinerary-${parentId}`) : null,
        ),
      );
    });
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

  private normalizeImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(url);
        if (
          image.naturalWidth <= this.maxImageWidth &&
          image.naturalHeight <= this.maxImageHeight
        ) {
          resolve(file);
          return;
        }
        const scale = Math.min(
          this.maxImageWidth / image.naturalWidth,
          this.maxImageHeight / image.naturalHeight,
        );
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.naturalWidth * scale);
        canvas.height = Math.round(image.naturalHeight * scale);
        canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) =>
            blob
              ? resolve(
                  new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), {
                    type: 'image/webp',
                  }),
                )
              : reject(),
          'image/webp',
          0.88,
        );
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject();
      };
      image.src = url;
    });
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

  private toDateTimeLocal(value: string | null | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }

  private toOptionalId(value: unknown): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  private nextItineraryClientId(): string {
    this.itineraryClientSequence++;
    return `new-itinerary-${this.itineraryClientSequence}`;
  }
}
