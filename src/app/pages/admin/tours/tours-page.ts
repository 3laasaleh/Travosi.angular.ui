import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './tours-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tours-page.scss',
})
export class Tours implements OnInit {
  readonly currencies = [
    { id: 2, code: 'USD', labelKey: 'currencyUsd' },
    { id: 1, code: 'EGP', labelKey: 'currencyEgp' },
  ];
  tours: any[] = [];
  destinations: any[] = [];
  isLoading = false;
  isSaving = false;
  destinationsLoading = false;
  destinationMenuOpen = false;
  destinationSearchTerm = '';
  errorMessage = '';
  successMessage = '';
  selectedTour: any = null;
  showForm = true;
  previewTour: any = null;
  previewImageIndex = 0;
  page = 1;
  pageSize = 5;
  tourForm = this.createForm();

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDestinationsThenTours();
  }

  get pagedTours(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.tours.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.tours.length / this.pageSize));
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

  loadDestinationsThenTours(): void {
    this.loadDestinations();
    this.loadTours();
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

  loadTours(): void {
    this.isLoading = true;
    this.adminService.getTours(1, 100).pipe(
      catchError(() => of({ data: this.getFallbackTours() })),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      this.tours = this.extractCollection(response, ['tours']);
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
      const savedTour = res?.data ?? payload;
      if (editing) {
        Object.assign(editing, savedTour);
        this.successMessage = res?.message || 'tourUpdated';
      } else {
        this.tours = [
          {
            ...payload,
            ...savedTour,
            id: savedTour?.id ?? savedTour?.tourId ?? Date.now(),
          },
          ...this.tours,
        ];
        this.page = 1;
        this.successMessage = res?.message || 'tourCreated';
      }
      this.resetForm();
    });
  }

  startEdit(tour: any): void {
    this.showForm = true;
    this.selectedTour = tour;
    this.tourForm.setValue({
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
    });
    this.closeDestinationMenu();
  }

  deactivateTour(tour: any): void {
    tour.isActive = false;
    this.successMessage = 'tourDeactivated';
  }

  openPreview(tour: any): void {
    this.previewTour = tour;
    this.previewImageIndex = 0;
  }

  closePreview(): void {
    this.previewTour = null;
    this.previewImageIndex = 0;
  }

  showPreviewImage(index: number): void {
    this.previewImageIndex = index;
  }

  previewPreviousImage(): void {
    const count = this.getImages(this.previewTour).length;
    if (count) this.previewImageIndex = (this.previewImageIndex - 1 + count) % count;
  }

  previewNextImage(): void {
    const count = this.getImages(this.previewTour).length;
    if (count) this.previewImageIndex = (this.previewImageIndex + 1) % count;
  }

  destinationName(destinationId: number): string {
    const destination = this.destinations.find((item) => Number(item.id) === Number(destinationId));
    return destination?.nameEng ?? destination?.name ?? `Destination #${destinationId}`;
  }

  destinationLabel(destination: any): string {
    return [destination?.nameEng ?? destination?.name, destination?.nameAr]
      .filter(Boolean)
      .join(' — ');
  }

  tourDuration(tour: any): string {
    const days = Number(tour?.durationDays ?? 0);
    const hours = Number(tour?.durationhours ?? tour?.durationHours ?? 0);
    return `${days}d ${hours}h`;
  }

  tourPrice(tour: any): string {
    const currency = this.currencies.find((item) => item.id === Number(tour?.currencyId));
    return `${tour?.pricePerPerson ?? tour?.price ?? 0} ${currency?.code ?? ''}`.trim();
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

  getImages(tour: any): any[] {
    if (Array.isArray(tour?.images)) return tour.images;
    const cover = tour?.coverImageUrl ?? tour?.imageUrl;
    return cover ? [{ url: cover }] : [];
  }

  imageUrl(image: any): string {
    return typeof image === 'string' ? image : (image?.url ?? image?.imageUrl ?? image?.path ?? '');
  }

  nextPage(): void {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage(): void {
    if (this.page > 1) this.page--;
  }

  resetForm(): void {
    this.selectedTour = null;
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
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
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
    }, { validators: this.dateRangeValidator });
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

  private getFallbackTours(): any[] {
    return [];
  }
}
