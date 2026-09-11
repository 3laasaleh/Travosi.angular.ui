import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
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
import { ApiService } from '../../../../core/services/apiservice.service';
import { arabicTextValidator, startsWithArabic } from '../../../../core/validators/arabic-text.validator';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';

interface CityImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
  altEng: string;
  altAr: string;
}

interface CityImageDto {
  id?: number;
  imageName?: string;
  imageUrl?: string;
  url?: string;
  altEng?: string;
  altAr?: string;
}

export interface CityDTO {
  id: number;
  titleEng: string;
  titleAr: string;
  routeName?: string;
  descriptionEng: string;
  descriptionAr: string;
  destinationId?: number | null;
  destinationNameEng?: string;
  destinationNameAr?: string;
  images?: CityImageDto[];
  imageUrl?: string;
  coverImageUrl?: string;
  isActive: boolean;
}

@Component({
  selector: 'app-cities-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './cities-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesFromCard implements OnInit, OnChanges, OnDestroy {
  @Input() selectedCity: CityDTO | null = null;
  @Output() citySaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly maxImages = 1;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly maxImageWidth = 2400;
  readonly maxImageHeight = 1600;
  private readonly imageConstraints = { maxWidth: this.maxImageWidth, maxHeight: this.maxImageHeight };

  cityForm = this.createForm();
  destinations: any[] = [];
  imageUploads: CityImageUpload[] = [];
  isLoading = false;
  destinationsLoading = false;
  deletingImageIndex: number | null = null;
  errorMessage = '';
  successMessage = '';
  imageValidationMessage = '';
  imageAltErrorsVisible = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void { this.loadDestinations(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedCity']) return;
    if (this.selectedCity) this.populateForm(this.selectedCity);
    else this.resetForm(false);
  }

  ngOnDestroy(): void { this.revokeNewImageUrls(); }

  saveCity(): void {
    if (this.isLoading || this.deletingImageIndex !== null) return;
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }

    this.imageAltErrorsVisible = true;
    if (this.imageUploads.some((image) => this.hasInvalidImageAlt(image))) {
      this.errorMessage = 'imageAltRequired';
      return;
    }

    const form = this.cityForm.getRawValue();
    const payload = new FormData();
    if (this.selectedCity?.id) payload.append('Id', String(this.selectedCity.id));
    payload.append('TitleEng', form.titleEng.trim());
    payload.append('TitleAr', form.titleAr.trim());
    payload.append('RouteName', form.routeName.trim().toLowerCase());
    payload.append('DescriptionEng', form.descriptionEng.trim());
    payload.append('DescriptionAr', form.descriptionAr.trim());
    payload.append('DestinationId', String(form.destinationId));
    this.imageUploads.filter((image) => image.file).forEach((image, index) => {
      payload.append(`Images[${index}].Image`, image.file!, image.file!.name);
      payload.append(`Images[${index}].AltEng`, image.altEng.trim());
      payload.append(`Images[${index}].AltAr`, image.altAr.trim());
    });

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedCity ? this.apiService.put('Cities', payload) : this.apiService.post('Cities', payload);
    request$.pipe(
      catchError(() => {
        this.errorMessage = 'citySaveError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response.message || 'citySaveError';
        return;
      }
      this.successMessage = this.selectedCity ? 'cityUpdated' : 'cityCreated';
      this.resetForm(false);
      this.citySaved.emit();
    });
  }

  markFormTouched(): void { this.cityForm.markAllAsTouched(); }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.imageValidationMessage = '';
    this.imageAltErrorsVisible = false;
    if (files.length > this.maxImages) {
      this.imageValidationMessage = 'cityImageLimit';
      return;
    }

    const replacementUploads: CityImageUpload[] = [];
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
        replacementUploads.push({ file: normalized, url: URL.createObjectURL(normalized), name: normalized.name, existing: false, altEng: '', altAr: '' });
      } catch (error) {
        this.imageValidationMessage = error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError';
      }
    }

    if (replacementUploads.length) {
      this.imageUploads.forEach((image) => {
        if (image.file) URL.revokeObjectURL(image.url);
      });
      this.imageUploads = replacementUploads;
    }

    this.syncImagesControl();
    this.cdr.markForCheck();
  }

  async removeImage(index: number): Promise<void> {
    if (this.deletingImageIndex !== null || this.isLoading) return;
    const image = this.imageUploads[index];
    if (!image) return;
    const confirmation = await Swal.fire({
      title: this.translate.instant('confirmImageDelete'), text: this.translate.instant('imageDeleteWarning'), icon: 'warning', showCancelButton: true,
      confirmButtonText: this.translate.instant('delete'), cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#e11d48', reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;
    if (image.existing && image.id) {
      this.deletingImageIndex = index;
      this.apiService.deleteRequest(`Cities/deleteImage/${image.id}`).pipe(
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
          if (response?.isSuccess === false) Swal.fire({ icon: 'error', title: response.message || this.translate.instant('imageDeleteError') });
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

  hasInvalidImageAlt(image: CityImageUpload): boolean {
    return !image.altEng.trim() || !image.altAr.trim() || !startsWithArabic(image.altAr);
  }

  getImageUrl(url: string): string {
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
  }

  cancelEdit(): void { this.resetForm(true); }

  private loadDestinations(): void {
    this.destinationsLoading = true;
    this.apiService.get('Destinations/GetAll?page=1&pageSize=500').pipe(
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
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.destinations ?? pageData;
      this.destinations = (Array.isArray(rows) ? rows : []).filter((destination) => destination?.isActive !== false);
    });
  }

  private populateForm(city: CityDTO): void {
    this.revokeNewImageUrls();
    this.imageValidationMessage = '';
    const images = Array.isArray(city.images) ? city.images : [];
    this.imageUploads = images.slice(0, this.maxImages).map((image, index) => ({
      id: image.id,
      url: image.imageUrl ?? image.url ?? '',
      name: image.imageName ?? this.translate.instant('cityImageNumber', { number: index + 1 }),
      existing: true,
      altEng: image.altEng ?? '',
      altAr: image.altAr ?? '',
    })).filter((image) => !!image.url);
    this.cityForm.setValue({
      titleEng: city.titleEng ?? '', titleAr: city.titleAr ?? '', routeName: city.routeName ?? '',
      descriptionEng: city.descriptionEng ?? '', descriptionAr: city.descriptionAr ?? '', destinationId: city.destinationId ?? null,
      images: this.imageUploads.map((image) => image.url),
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.revokeNewImageUrls();
    this.imageUploads = [];
    this.imageValidationMessage = '';
    this.imageAltErrorsVisible = false;
    this.cityForm.reset({ titleEng: '', titleAr: '', routeName: '', descriptionEng: '', descriptionAr: '', destinationId: null, images: [] });
    if (emitCancel) this.editCancelled.emit();
  }

  private syncImagesControl(): void {
    this.cityForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
    this.cityForm.controls.images.markAsTouched();
  }

  private removeImageLocally(index: number): void {
    const [removed] = this.imageUploads.splice(index, 1);
    if (removed?.file) URL.revokeObjectURL(removed.url);
    this.syncImagesControl();
    this.cdr.markForCheck();
  }

  private showImageDeletedToast(): void {
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', iconColor: '#00d492', title: this.translate.instant('imageDeleted'), showConfirmButton: false, timer: 2200, timerProgressBar: true });
  }

  private revokeNewImageUrls(): void {
    this.imageUploads.filter((image) => image.file).forEach((image) => URL.revokeObjectURL(image.url));
  }

  private createForm() {
    return new FormGroup({
      titleEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150), Validators.pattern(/^[A-Za-z].*$/)] }),
      titleAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150), arabicTextValidator()] }),
      routeName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100), Validators.pattern(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)] }),
      descriptionEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(4000)] }),
      descriptionAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(4000), arabicTextValidator()] }),
      destinationId: new FormControl<number | null>(null, { validators: [Validators.required] }),
      images: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
    });
  }
}
