import { IGenericResponse } from './../../../../core/models/genericReponse.model';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { AdminService } from '../../admin.service';
import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import {
  ImageUploadValidationError,
  normalizeImageUpload,
} from '../../shared/image-upload.util';

interface DestinationImageUpload {
  id?:number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
}
interface DestinationImageDto {
  id:Number,
  imageName: string;
  imageUrl: string;
}
export interface DestinationDTO {
  id: number;
  nameEng: string;
  nameAr: string;
  subDescription?: string;
  description?: string;
  isActive: boolean;
  images: DestinationImageDto[];
}
@Component({
  selector: 'app-destinations-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './destinations-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsFromCard implements OnChanges, OnDestroy {
  @Input() selectedDestination: DestinationDTO | null = null;
  @Output() destinationSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

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
  destinationForm = this.createForm();
  imageUploads: DestinationImageUpload[] = [];
  isLoading = false;
  deletingImageIndex: number | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedDestination']) return;
    if (this.selectedDestination) this.populateForm(this.selectedDestination);
    else this.resetForm(false);
  }

  ngOnDestroy(): void {
    this.revokeNewImageUrls();
  }

  saveDestination(): void {
    if (this.isLoading) return;
    if (this.destinationForm.invalid) {
      this.destinationForm.markAllAsTouched();
      return;
    }
    const form = this.destinationForm.getRawValue();
    const payload = new FormData();
    if (this.selectedDestination?.id) payload.append('Id', this.selectedDestination?.id.toString());

    payload.append('NameEng', form.nameEng.trim());
    payload.append('NameAr', form.nameAr.trim());
    payload.append('SubDescription', form.subDescription);
    payload.append('Description', form.description);
    payload.append('IsActive', String(form.isActive));
    this.imageUploads
      .filter((image) => image.file)
      .forEach((image) => payload.append('Images', image.file!, image.file!.name));
    this.imageUploads
      .filter((image) => image.existing)
      .forEach((image) => payload.append('ExistingImageUrls', image.url));

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const editing = this.selectedDestination;
    const request$ = editing
      ? this.adminService.updateDestination(payload)
      : this.adminService.createDestination(payload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'destinationSaveError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((res: IGenericResponse<boolean>) => {
        if (!res.isSuccess) {
          this.errorMessage = res.message;
          return;
        }
        this.successMessage = res.message ;
        this.resetForm(false);
        this.destinationSaved.emit();
      });
  }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.errorMessage = '';
    if (this.imageUploads.length + files.length > this.maxImages) {
      this.errorMessage = 'destinationImageLimit';
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
    if (this.deletingImageIndex !== null) return;
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

    if (image.existing && this.selectedDestination?.id) {
      this.deletingImageIndex = index;
      debugger;
      this.adminService.deleteDestinationImage(image?.id!).pipe(
        catchError(() => {
          Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
          return of({ imageDeleteFailed: true });
        }),
        finalize(() => {
          this.deletingImageIndex = null;
          this.cdr.markForCheck();
        }),
      ).subscribe((response: any) => {
        if (response?.imageDeleteFailed) return;
        this.removeImageLocally(index);
        this.showImageDeletedToast();
      });
      return;
    }

    this.removeImageLocally(index);
    this.showImageDeletedToast();
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(destination: any): void {
    this.revokeNewImageUrls();
    debugger
    this.imageUploads =   destination.images
      .slice(0, this.maxImages)
      .map((image: any, index: number) => ({
        id:image.id,
        url: this.imageUrl(image),
        name: image?.imageName ?? image?.name ?? `Destination image ${index + 1}`,
        existing: true,
      }))
      .filter((image: DestinationImageUpload) => !!image.url);
    this.destinationForm.setValue({
      nameEng: destination.nameEng ?? destination.name ?? '',
      nameAr: destination.nameAr ?? '',
      subDescription: destination.subDescription ?? '',
      description: destination.description ?? '',
      images: this.imageUploads.map((image) => image.url),
      isActive: destination.isActive !== false,
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.revokeNewImageUrls();
    this.imageUploads = [];
    this.destinationForm.reset({
      nameEng: '',
      nameAr: '',
      subDescription: '',
      description: '',
      images: [],
      isActive: true,
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private syncImagesControl(): void {
    this.destinationForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
    this.destinationForm.controls.images.markAsTouched();
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

  private createForm() {
    return new FormGroup({
      nameEng: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\s'-]*$/)],
      }),
      nameAr: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'-]*$/),
        ],
      }),
      subDescription: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      images: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      isActive: new FormControl(true, { nonNullable: true }),
    });
  }



  private imageUrl(image: any): string {
    return typeof image === 'string' ? image : (image?.url ?? image?.imageUrl ?? image?.path ?? '');
  }

  private revokeNewImageUrls(): void {
    this.imageUploads
      .filter((image) => image.file)
      .forEach((image) => URL.revokeObjectURL(image.url));
  }

    getImageUrl(url: string): string {
      if(url.includes('blob'))
        return url;
      return  environment.imageUrl +url ;
    }
}
