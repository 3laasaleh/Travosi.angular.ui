import { datas } from './../../../data/data';
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
import { catchError, of } from 'rxjs';
import { AdminService } from '../admin.service';
import { IGenericResponse } from '../../../core/models/genericReponse.model';
import { DestinationsFromCard } from './destinations-from-card/destinations-from-card';
import { DestinationsList } from './destinations-list/destinations-list';
export interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
interface DestinationImageUpload {
  file?: File;
  url: string;
  name: string;
  existing: boolean;
}

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe, DestinationsFromCard, DestinationsList],
  templateUrl: './destinations-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './destinations-page.scss',
})
export class Destinations implements OnInit, OnDestroy {
  readonly maxImages = 5;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly maxImageWidth = 2400;
  readonly maxImageHeight = 1600;

  destinations: any[] = [];
  imageUploads: DestinationImageUpload[] = [];
  viewMode: 'table' | 'grid' = 'table';
 
  selectedDestination: any = null;
  previewDestination: any = null;
  previewImageIndex = 0;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  paginationInfo: PaginationInfoDTO = {
    page: 1,
    pageSize: 5,
    totalCount: 0,
    totalPages: 0,
  };
  destinationForm = this.createForm();

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  ngOnDestroy(): void {
    this.revokeNewImageUrls();
  }

  

  get pagedDestinations(): any[] {
    const start = (this.paginationInfo.page - 1) * this.paginationInfo.pageSize;
    return this.destinations.slice(start, start + this.paginationInfo.pageSize);
  }

  loadDestinations(): void {
    this.isLoading = true;
    this.destinations=[];
    this.errorMessage = '';
    this.adminService
      .getDestinations(this.paginationInfo.page, this.paginationInfo.pageSize)
      .pipe(
        catchError(() => {
          return of({ data: [] });
        }),
      )
      .subscribe((res: IGenericResponse<any>) => {
        if (!res.isSuccess) {
          this.errorMessage = 'destinationServiceUnavailable';
        } else {
          debugger;
          const paggingData = res?.data;
          this.destinations = paggingData.data;
          this.paginationInfo = {
            page: paggingData.page,
            pageSize: paggingData.pageSize,
            totalCount: paggingData.totalCount,
            totalPages: paggingData.totalPages,
          };
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      });
  }

  saveDestination(): void {
    if (this.destinationForm.invalid) {
      this.destinationForm.markAllAsTouched();
      return;
    }
    const form = this.destinationForm.getRawValue();

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = new FormData();
    payload.append('NameEng', form.nameEng.trim());
    payload.append('NameAr', form.nameAr.trim());
    payload.append('SubDescription', form.subDescription ?? '');
    payload.append('Description', form.description);
    payload.append('IsActive', String(form.isActive));
    this.imageUploads
      .filter((image) => image.file)
      .forEach((image) => payload.append('Images', image.file!, image.file!.name));
    this.imageUploads
      .filter((image) => image.existing)
      .forEach((image) => payload.append('ExistingImageUrls', image.url));

    const localRecord = {
      nameEng: form.nameEng.trim(),
      nameAr: form.nameAr.trim(),
      subDescription: form.subDescription,
      description: form.description,
      images: this.imageUploads.map((image) => ({ url: image.url })),
      isActive: form.isActive,
    };
    const editing = this.selectedDestination;
    const request$ = editing
      ? this.adminService.updateDestination(editing.id, payload)
      : this.adminService.createDestination(payload);

    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'destinationSaveError';
          this.isLoading = false;
          this.cdr.markForCheck();
          return of(null);
        }),
      )
      .subscribe((res: any) => {
        if (res === null) return;
        if (editing) {
          Object.assign(editing, localRecord);
          this.successMessage = 'destinationUpdated';
        } else {
          this.destinations = [
            { ...localRecord, id: res?.id ?? res?.data?.id ?? Date.now() },
            ...this.destinations,
          ];
          this.successMessage = 'destinationCreated';
        }
        this.resetForm();
        this.isLoading = false;
        this.cdr.markForCheck();
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
    this.destinationForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
    this.destinationForm.controls.images.markAsTouched();
    this.cdr.markForCheck();
  }

  removeImage(index: number): void {
    const [removed] = this.imageUploads.splice(index, 1);
    if (removed?.file) URL.revokeObjectURL(removed.url);
    this.destinationForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
    this.destinationForm.controls.images.markAsTouched();
  }

  startEdit(destination: any): void {
    this.selectedDestination = destination;
    this.revokeNewImageUrls();
    this.imageUploads = this.getImages(destination)
      .slice(0, this.maxImages)
      .map((image: any, index: number) => ({
        url: this.imageUrl(image),
        name: image?.name ?? `Destination image ${index + 1}`,
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

  cancelEdit(): void {
    this.resetForm();
  }

  openPreview(destination: any): void {
    this.previewDestination = destination;
    this.previewImageIndex = 0;
  }

  closePreview(): void {
    this.previewDestination = null;
    this.previewImageIndex = 0;
  }

  showPreviewImage(index: number): void {
    this.previewImageIndex = index;
  }

  previewPreviousImage(): void {
    const count = this.getImages(this.previewDestination).length;
    if (count) this.previewImageIndex = (this.previewImageIndex - 1 + count) % count;
  }

  previewNextImage(): void {
    const count = this.getImages(this.previewDestination).length;
    if (count) this.previewImageIndex = (this.previewImageIndex + 1) % count;
  }

  deactivateDestination(destination: any): void {
    this.isLoading = true;
    this.adminService
      .deactivateDestination(destination.id)
      .pipe(
        catchError(() => {
          destination.isActive = false;
          this.successMessage = 'destinationDeactivated';
          this.isLoading = false;
          return of({});
        }),
      )
      .subscribe(() => {
        destination.isActive = false;
        this.successMessage = 'destinationDeactivated';
        this.isLoading = false;
        this.cdr.markForCheck();
      });
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo?.totalPages) 
    {
      this.paginationInfo.page++;
      this.loadDestinations();
    }
      
  }

  prevPage(): void {
    if (this.paginationInfo.page > 1) this.paginationInfo.page--;
  }

  getImages(destination: any): any[] {
    if (Array.isArray(destination?.images)) return destination.images;
    return destination?.imageUrl ? [{ url: destination.imageUrl }] : [];
  }

  imageUrl(image: any): string {
    return typeof image === 'string' ? image : (image?.url ?? image?.imageUrl ?? image?.path ?? '');
  }

  private resetForm(): void {
    this.revokeNewImageUrls();
    this.imageUploads = [];
    this.selectedDestination = null;
    this.destinationForm.reset({
      nameEng: '',
      nameAr: '',
      subDescription: '',
      description: '',
      images: [],
      isActive: true,
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
}
