import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';

interface HotelImageUpload { id?: number; file?: File; url: string; altEng: string; altAr: string; existing: boolean; }

export interface HotelDTO {
  id: number;
  name: string;
  nameEng?: string;
  nameAr?: string;
  slug?: string;
  starRating: number;
  address?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  isActive: boolean;
  isPublished?: boolean;
  destinationId: number;
}

@Component({
  selector: 'app-hotels-from-card',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './hotels-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsFromCard implements OnInit, OnChanges {
  @Input() selectedHotel: HotelDTO | null = null;
  @Output() hotelSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  hotelForm = this.createForm();
  isLoading = false;
  errorMessage = '';
  validationSubmitted = false;
  successMessage = '';
  readonly starOptions = [1, 2, 3, 4, 5];
  readonly maxImages = 5;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly imageConstraints = { maxWidth: 2400, maxHeight: 1600 };
  destinations: any[] = [];
  imageUploads: HotelImageUpload[] = [];
  imageValidationMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.apiService.get('Destinations?page=1&pageSize=500').pipe(
      catchError(() => of(null)),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe((response: any) => {
      const page = response?.data ?? response;
      const rows = page?.data ?? page?.items ?? page?.destinations ?? page;
      this.destinations = (Array.isArray(rows) ? rows : []).filter((item) => item?.isActive !== false);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedHotel']) return;
    if (this.selectedHotel) this.populateForm(this.selectedHotel);
    else this.resetForm(false);
  }

  saveHotel(): void {
    this.validationSubmitted = true;
    if (this.isLoading) return;
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }
    const form = this.hotelForm.getRawValue();
    const payload: any = {
      name: form.nameEng.trim(),
      nameEng: form.nameEng.trim(),
      nameAr: form.nameAr.trim(),
      slug: form.slug.trim() || null,
      starRating: Number(form.starRating),
      destinationId: Number(form.destinationId),
      address: form.address.trim(),
      description: form.description.trim(),
      phoneNumber: form.phoneNumber.trim(),
      email: form.email.trim(),
      website: form.website.trim(),
      isActive: form.isActive,
      isPublished: form.isPublished,
    };
    if (this.selectedHotel?.id) payload.id = this.selectedHotel.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedHotel
      ? this.apiService.put('Hotels', payload)
      : this.apiService.post('Hotels', payload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'hotelSaveError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((res: any) => {
        if (res === null) return;
        if (!res.isSuccess) {
          this.errorMessage = res.message;
          return;
        }
        const hotelId = Number(res.data?.id ?? this.selectedHotel?.id);
        if (!hotelId || !this.imageUploads.some(image => image.file)) { this.completeSave(res.message); return; }
        this.uploadNewImages(hotelId, res.message);
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []); input.value = '';
    this.imageValidationMessage = '';
    if (this.imageUploads.length + files.length > this.maxImages) { this.imageValidationMessage = 'hotelImageLimit'; return; }
    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { this.imageValidationMessage = 'invalidImageType'; continue; }
      if (file.size > this.maxImageBytes) { this.imageValidationMessage = 'imageTooLarge'; continue; }
      try { const normalized = await normalizeImageUpload(file, this.imageConstraints); this.imageUploads.push({ file: normalized, url: URL.createObjectURL(normalized), altEng: '', altAr: '', existing: false }); }
      catch (error) { this.imageValidationMessage = error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError'; }
    }
    this.cdr.markForCheck();
  }

  removeImage(index: number): void {
    const image = this.imageUploads[index]; if (!image) return;
    if (image.existing && this.selectedHotel?.id && image.id) {
      this.apiService.deleteRequest(`Hotels/${this.selectedHotel.id}/Images/${image.id}`).pipe(catchError(() => of(null))).subscribe((response: any) => {
        if (response?.isSuccess === false || !response) { this.imageValidationMessage = 'imageDeleteError'; this.cdr.markForCheck(); return; }
        this.removeImageLocally(index);
      });
      return;
    }
    this.removeImageLocally(index);
  }

  imageUrl(url: string): string { if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url; return `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/?(?:images\/)?/i, '')}`; }

  private populateForm(hotel: HotelDTO): void {
    this.validationSubmitted = false;
    this.hotelForm.setValue({
      name: hotel.name ?? '',
      nameEng: hotel.nameEng ?? hotel.name ?? '',
      nameAr: hotel.nameAr ?? hotel.name ?? '',
      slug: hotel.slug ?? '',
      starRating: hotel.starRating ?? 1,
      destinationId: hotel.destinationId ?? null,
      address: hotel.address ?? '',
      description: hotel.description ?? '',
      phoneNumber: hotel.phoneNumber ?? '',
      email: hotel.email ?? '',
      website: hotel.website ?? '',
      isActive: hotel.isActive !== false,
      isPublished: hotel.isPublished === true,
    });
    this.revokeNewImageUrls();
    this.imageUploads = ((hotel as any).images ?? []).slice(0, this.maxImages).map((image: any) => ({ id: image.id, url: image.imageUrl ?? image.url, altEng: image.altTextEng ?? image.altEng ?? '', altAr: image.altTextAr ?? image.altAr ?? '', existing: true })).filter((image: HotelImageUpload) => !!image.url);
  }

  private resetForm(emitCancel: boolean): void {
    this.validationSubmitted = false;
    this.revokeNewImageUrls(); this.imageUploads = []; this.imageValidationMessage = '';
    this.hotelForm.reset({
      name: '',
      nameEng: '',
      nameAr: '',
      slug: '',
      starRating: 1,
      destinationId: null,
      address: '',
      description: '',
      phoneNumber: '',
      email: '',
      website: '',
      isActive: true,
      isPublished: false,
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private uploadNewImages(hotelId: number, message: string): void {
    const images = this.imageUploads.filter(image => image.file);
    if (images.some(image => !image.altEng.trim() || !image.altAr.trim())) { this.errorMessage = 'imageAltRequired'; this.isLoading = false; this.cdr.markForCheck(); return; }
    this.isLoading = true;
    const payload = new FormData();
    images.forEach((image, index) => { payload.append(`Images[${index}].Image`, image.file!, image.file!.name); payload.append(`Images[${index}].AltEng`, image.altEng.trim()); payload.append(`Images[${index}].AltAr`, image.altAr.trim()); });
    this.apiService.post(`Hotels/${hotelId}/Images`, payload).pipe(catchError(() => of(null)), finalize(() => { this.isLoading = false; this.cdr.markForCheck(); })).subscribe((response: any) => {
      if (!response?.isSuccess) { this.errorMessage = response?.message || 'hotelImageSaveError'; return; }
      this.completeSave(message);
    });
  }
  private completeSave(message: string): void { this.successMessage = message; this.resetForm(false); this.hotelSaved.emit(); }
  private removeImageLocally(index: number): void { const [removed] = this.imageUploads.splice(index, 1); if (removed?.file) URL.revokeObjectURL(removed.url); this.cdr.markForCheck(); }
  private revokeNewImageUrls(): void { this.imageUploads.filter(image => image.file).forEach(image => URL.revokeObjectURL(image.url)); }

  private createForm() {
    return new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
      nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
      slug: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(220), Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)] }),
      starRating: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
      destinationId: new FormControl<number | null>(null, { validators: [Validators.required] }),
      address: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
      website: new FormControl('', { nonNullable: true }),
      isActive: new FormControl(true, { nonNullable: true }),
      isPublished: new FormControl(false, { nonNullable: true }),
    });
  }
}
