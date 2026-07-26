import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { AdminService } from '../admin.service';

interface TourImageUpload {
  file?: File;
  url: string;
  name: string;
  existing: boolean;
}

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './tours-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tours-page.scss',
})
export class Tours implements OnInit, OnDestroy {
  readonly maxImages = 10;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly maxImageWidth = 2400;
  readonly maxImageHeight = 1600;

  tours: any[] = [];
  destinations: any[] = [];
  imageUploads: TourImageUpload[] = [];
  isLoading = false;
  destinationsLoading = false;
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

  ngOnDestroy(): void {
    this.revokeNewImageUrls();
  }

  get pagedTours(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.tours.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.tours.length / this.pageSize));
  }

  loadDestinationsThenTours(): void {
    this.isLoading = true;
    this.destinationsLoading = true;
    this.errorMessage = '';
    this.adminService.getDestinations(1, 100).pipe(
      catchError(() => {
        this.errorMessage = 'destinationsLoadError';
        return of(null);
      }),
      switchMap((res: any) => {
        if (res === null) return of(null);
        const payload = res?.data ?? res;
        this.destinations = Array.isArray(payload)
          ? payload
          : (payload?.items ?? payload?.destinations ?? payload?.result ?? []);
        this.destinationsLoading = false;
        return this.adminService.getTours(1, 100).pipe(
          catchError(() => of({ data: this.getFallbackTours() })),
        );
      }),
      finalize(() => {
        this.isLoading = false;
        this.destinationsLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((res: any) => {
      if (res === null) return;
      const payload = res?.data ?? res;
      this.tours = Array.isArray(payload)
        ? payload
        : (payload?.items ?? payload?.tours ?? payload?.result ?? []);
    });
  }

  saveTour(): void {
    if (this.tourForm.invalid) {
      this.tourForm.markAllAsTouched();
      return;
    }
    const form = this.tourForm.getRawValue();

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const payload = new FormData();
    payload.append('TitleEng', form.titleEng.trim());
    payload.append('TitleAr', form.titleAr.trim());
    payload.append('DestinationId', String(form.destinationId));
    payload.append('Duration', form.duration);
    payload.append('Price', form.price);
    payload.append('Description', form.overview);
    payload.append('Itinerary', form.itinerary);
    payload.append('IsActive', String(form.isActive));
    this.imageUploads
      .filter((image) => image.file)
      .forEach((image) => payload.append('Images', image.file!, image.file!.name));
    this.imageUploads
      .filter((image) => image.existing)
      .forEach((image) => payload.append('ExistingImageUrls', image.url));

    const localRecord = {
      title: form.titleEng.trim(),
      titleEng: form.titleEng.trim(),
      titleAr: form.titleAr.trim(),
      destinationId: Number(form.destinationId),
      duration: form.duration,
      price: form.price,
      overview: form.overview,
      itinerary: form.itinerary,
      images: this.imageUploads.map((image) => ({ url: image.url })),
      isActive: form.isActive,
    };
    const editing = this.selectedTour;
    const request$ = editing
      ? this.adminService.updateTour(editing.id, payload)
      : this.adminService.createTour(payload);

    request$.pipe(
      catchError(() => {
        this.errorMessage = 'tourSaveError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((res: any) => {
      if (res === null) return;
      if (editing) {
        Object.assign(editing, localRecord);
        this.successMessage = 'tourUpdated';
      } else {
        this.tours = [
          { ...localRecord, id: res?.id ?? res?.data?.id ?? Date.now() },
          ...this.tours,
        ];
        this.successMessage = 'tourCreated';
      }
      this.resetForm();
    });
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
    this.tourForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
    this.tourForm.controls.images.markAsTouched();
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
    this.cdr.markForCheck();
  }

  removeImage(index: number): void {
    const [removed] = this.imageUploads.splice(index, 1);
    if (removed?.file) URL.revokeObjectURL(removed.url);
    this.tourForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
    this.tourForm.controls.images.markAsTouched();
  }

  startEdit(tour: any): void {
    this.showForm = true;
    this.selectedTour = tour;
    this.revokeNewImageUrls();
    this.imageUploads = this.getImages(tour).slice(0, this.maxImages).map((image: any, index: number) => ({
      url: this.imageUrl(image),
      name: image?.name ?? `Tour image ${index + 1}`,
      existing: true,
    })).filter((image: TourImageUpload) => !!image.url);
    this.tourForm.setValue({
      titleEng: tour.titleEng ?? tour.title ?? '',
      titleAr: tour.titleAr ?? '',
      destinationId: tour.destinationId ?? '',
      duration: tour.duration ?? '',
      price: tour.price ?? '',
      overview: tour.description ?? tour.overview ?? '',
      itinerary: typeof tour.itinerary === 'string' ? tour.itinerary : '',
      images: this.imageUploads.map((image) => image.url),
      isActive: tour.isActive !== false,
    });
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
    this.revokeNewImageUrls();
    this.imageUploads = [];
    this.selectedTour = null;
    this.tourForm.reset({
      titleEng: '',
      titleAr: '',
      destinationId: '',
      duration: '',
      price: '',
      overview: '',
      itinerary: '',
      images: [],
      isActive: true,
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
      duration: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      overview: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      itinerary: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      images: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
      isActive: new FormControl(true, { nonNullable: true }),
    });
  }

  private revokeNewImageUrls(): void {
    this.imageUploads.filter((image) => image.file).forEach((image) => URL.revokeObjectURL(image.url));
  }

  private normalizeImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(url);
        if (image.naturalWidth <= this.maxImageWidth && image.naturalHeight <= this.maxImageHeight) {
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
          (blob) => blob
            ? resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }))
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

  private getFallbackTours(): any[] {
    return [];
  }
}
