import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
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
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-tours-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './tours-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursFromCard implements OnInit, OnChanges {
  @Input() selectedTour: any = null;
  @Output() tourSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly currencies = [
    { id: 2, code: 'USD', labelKey: 'currencyUsd' },
    { id: 1, code: 'EGP', labelKey: 'currencyEgp' },
  ];
  destinations: any[] = [];
  destinationsLoading = false;
  destinationMenuOpen = false;
  destinationSearchTerm = '';
  isSaving = false;
  errorMessage = '';
  successMessage = '';
  tourForm = this.createForm();

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedTour']) return;
    if (this.selectedTour) this.populateForm(this.selectedTour);
    else this.resetForm(false);
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

  get galleryImagesArray(): FormArray<FormControl<string>> {
    return this.tourForm.controls.galleryImages;
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

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';
    const payload: any = {
      titleEng: form.titleEng.trim(),
      titleAr: form.titleAr.trim(),
      destinationId: Number(form.destinationId),
      description: form.description.trim() || null,
      fullDescription: form.fullDescription.trim() || null,
      pricePerPerson: Number(form.pricePerPerson),
      pricePerChild: Number(form.pricePerChild),
      currencyId: Number(form.currencyId),
      durationDays: Number(form.durationDays),
      durationhours: Number(form.durationHours),
      maxSeats: Number(form.maxSeats),
      startDate: form.startDate,
      endDate: form.endDate,
      coverImageUrl: form.coverImageUrl.trim() || null,
      cancellationPolicy: form.cancellationPolicy.trim(),
      isFreeCancelation: form.isFreeCancelation,
      isActive: form.isActive,
      highlights: form.highlights
        .map((text: string) => text.trim())
        .filter((text: string) => !!text)
        .map((text: string) => ({ text })),
      includes: form.includes
        .map((item: any) => ({
          text: String(item.text ?? '').trim(),
          isIncluded: item.isIncluded,
        }))
        .filter((item: { text: string }) => !!item.text),
      itinerary: form.itinerary
        .map((day: any) => ({
          dayNumber: Number(day.dayNumber),
          title: String(day.title ?? '').trim(),
          description: String(day.description ?? '').trim(),
        }))
        .filter((day: { title: string; description: string }) => !!day.title || !!day.description),
      images: form.galleryImages
        .map((url: string) => url.trim())
        .filter((url: string) => !!url)
        .map((url: string) => ({ imageUrl: url })),
    };
    const editing = this.selectedTour;
    if (editing?.id) payload.id = Number(editing.id);
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

  addItineraryDay(): void {
    const nextDay = this.itineraryArray.length + 1;
    this.itineraryArray.push(this.createItineraryGroup(nextDay, '', ''));
  }

  removeItineraryDay(index: number): void {
    this.itineraryArray.removeAt(index);
    this.itineraryArray.controls.forEach((group, i) => {
      group.get('dayNumber')?.setValue(i + 1);
    });
  }

  addGalleryImage(): void {
    this.galleryImagesArray.push(
      new FormControl('', { nonNullable: true, validators: [Validators.pattern(/^https?:\/\/.+/i)] }),
    );
  }

  removeGalleryImage(index: number): void {
    this.galleryImagesArray.removeAt(index);
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
      coverImageUrl: tour.coverImageUrl ?? tour.imageUrl ?? '',
      cancellationPolicy: tour.cancellationPolicy ?? '',
      isFreeCancelation: tour.isFreeCancelation === true,
      isActive: tour.isActive !== false,
    });
    this.setHighlights(tour.highlights ?? []);
    this.setIncludes(tour.includes ?? []);
    this.setItinerary(tour.itinerary ?? []);
    this.setGalleryImages(tour.images ?? []);
    this.closeDestinationMenu();
  }

  private resetForm(emitCancel: boolean): void {
    this.closeDestinationMenu();
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
      coverImageUrl: '',
      cancellationPolicy: '',
      isFreeCancelation: false,
      isActive: true,
    });
    this.setHighlights([]);
    this.setIncludes([]);
    this.setItinerary([]);
    this.setGalleryImages([]);
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
      coverImageUrl: new FormControl('', {
        nonNullable: true,
        validators: [Validators.pattern(/^https?:\/\/.+/i)],
      }),
      cancellationPolicy: new FormControl('', { nonNullable: true }),
      isFreeCancelation: new FormControl(false, { nonNullable: true }),
      isActive: new FormControl(true, { nonNullable: true }),
      highlights: new FormArray<FormControl<string>>([]),
      includes: new FormArray<FormGroup>([]),
      itinerary: new FormArray<FormGroup>([]),
      galleryImages: new FormArray<FormControl<string>>([]),
    }, { validators: this.dateRangeValidator });
  }

  private createIncludeGroup(text: string, isIncluded: boolean): FormGroup {
    return new FormGroup({
      text: new FormControl(text, { nonNullable: true, validators: [Validators.required] }),
      isIncluded: new FormControl(isIncluded, { nonNullable: true }),
    });
  }

  private createItineraryGroup(dayNumber: number, title: string, description: string): FormGroup {
    return new FormGroup({
      dayNumber: new FormControl(dayNumber, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      title: new FormControl(title, { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl(description, { nonNullable: true, validators: [Validators.required] }),
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
    items
      .slice()
      .sort((a, b) => Number(a?.dayNumber ?? 0) - Number(b?.dayNumber ?? 0))
      .forEach((item, index) => {
        this.itineraryArray.push(
          this.createItineraryGroup(
            Number(item?.dayNumber ?? index + 1),
            item?.title ?? '',
            item?.description ?? '',
          ),
        );
      });
  }

  private setGalleryImages(images: any[]): void {
    this.galleryImagesArray.clear();
    const items = Array.isArray(images) ? images : [];
    items.forEach((item) => {
      const url = typeof item === 'string' ? item : (item?.imageUrl ?? item?.url ?? item?.path ?? '');
      if (!url) return;
      this.galleryImagesArray.push(
        new FormControl(url, { nonNullable: true, validators: [Validators.pattern(/^https?:\/\/.+/i)] }),
      );
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
}
