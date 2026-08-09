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
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import {
  ImageUploadValidationError,
  normalizeImageUpload,
} from '../../shared/image-upload.util';

export interface AirlineDTO {
  id: number;
  name?: string;
  code?: string;
  logoUrl?: string;
  isActive?: boolean;
}

interface AirlineLogoUpload {
  file?: File;
  url: string;
  name: string;
  existing: boolean;
}

@Component({
  selector: 'app-airlines-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './airlines-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirlinesFromCard implements OnChanges, OnDestroy {
  @Input() selectedAirline: AirlineDTO | null = null;
  @Output() airlineSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly maxImageBytes = 5 * 1024 * 1024;
  private readonly imageConstraints = { maxWidth: 2400, maxHeight: 1600 };
  airlineForm = this.createForm();
  logoUpload: AirlineLogoUpload | null = null;
  isLoading = false;
  isDeletingLogo = false;
  errorMessage = '';
  imageValidationMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedAirline']) return;
    if (this.selectedAirline) this.populateForm(this.selectedAirline);
    else this.resetForm(false);
  }

  ngOnDestroy(): void {
    this.revokeNewLogoUrl();
  }

  saveAirline(): void {
    if (this.isLoading) return;
    if (this.airlineForm.invalid) {
      this.airlineForm.markAllAsTouched();
      return;
    }
    const form = this.airlineForm.getRawValue();
    const payload: any = {
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
    };
    if (this.selectedAirline?.id) payload.id = this.selectedAirline.id;

    const requestPayload = new FormData();
    Object.entries(payload).forEach(([key, value]) => requestPayload.append(key, String(value)));
    if (this.logoUpload?.file) {
      requestPayload.append('Logo', this.logoUpload.file, this.logoUpload.file.name);
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedAirline
      ? this.apiService.put('Airlines', requestPayload)
      : this.apiService.post('Airlines', requestPayload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'airlineSaveError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((res: any) => {
        if (res === null) return;
        if (res?.isSuccess === false) {
          this.errorMessage = res.message;
          return;
        }
        this.successMessage = res.message;
        this.resetForm(false);
        this.airlineSaved.emit();
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  async onLogoSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    this.imageValidationMessage = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      this.imageValidationMessage = 'invalidImageType';
      return;
    }
    if (file.size > this.maxImageBytes) {
      this.imageValidationMessage = 'imageTooLarge';
      return;
    }

    try {
      const normalized = await normalizeImageUpload(file, this.imageConstraints);
      this.revokeNewLogoUrl();
      this.logoUpload = {
        file: normalized,
        url: URL.createObjectURL(normalized),
        name: normalized.name,
        existing: false,
      };
      this.airlineForm.controls.logo.setValue(this.logoUpload.url);
      this.airlineForm.controls.logo.markAsTouched();
    } catch (error) {
      this.imageValidationMessage = error instanceof ImageUploadValidationError
        ? error.translationKey
        : 'imageReadError';
    }
    this.cdr.markForCheck();
  }

  async removeLogo(): Promise<void> {
    if (!this.logoUpload || this.isLoading || this.isDeletingLogo) return;
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

    if (this.logoUpload.existing && this.selectedAirline?.id) {
      this.isDeletingLogo = true;
      this.apiService.deleteRequest(`Airlines/${this.selectedAirline.id}/logo`).pipe(
        catchError(() => {
          Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
          return of({ imageDeleteFailed: true });
        }),
        finalize(() => {
          this.isDeletingLogo = false;
          this.cdr.markForCheck();
        }),
      ).subscribe((response: any) => {
        if (response?.imageDeleteFailed || response?.isSuccess === false) return;
        this.clearLogo();
        this.showLogoDeletedToast();
      });
      return;
    }

    this.clearLogo();
    this.showLogoDeletedToast();
  }

  getLogoUrl(url: string): string {
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private populateForm(airline: AirlineDTO): void {
    this.revokeNewLogoUrl();
    const logoUrl = airline.logoUrl ?? '';
    this.logoUpload = logoUrl
      ? { url: logoUrl, name: this.translate.instant('airlineLogo'), existing: true }
      : null;
    this.airlineForm.setValue({
      name: airline.name ?? '',
      code: airline.code ?? '',
      logo: logoUrl,
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.revokeNewLogoUrl();
    this.logoUpload = null;
    this.imageValidationMessage = '';
    this.airlineForm.reset({ name: '', code: '', logo: '' });
    if (emitCancel) this.editCancelled.emit();
  }

  private clearLogo(): void {
    this.revokeNewLogoUrl();
    this.logoUpload = null;
    this.airlineForm.controls.logo.setValue('');
    this.airlineForm.controls.logo.markAsTouched();
    this.cdr.markForCheck();
  }

  private revokeNewLogoUrl(): void {
    if (this.logoUpload?.file) URL.revokeObjectURL(this.logoUpload.url);
  }

  private showLogoDeletedToast(): void {
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
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      code: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[A-Za-z0-9]{2,3}$/)],
      }),
      logo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });
  }
}
