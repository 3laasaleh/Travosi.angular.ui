import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import feather from 'feather-icons';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../core/services/apiservice.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-account-tab',
  imports: [RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account-tab.html',
})
export class AccountTab implements AfterViewInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly allowedImageTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ]);

  currentUrl = '';
  userName = '';
  userEmail = '';
  isUploadingImage = false;
  isRemovingImage = false;
  imageValidationMessage = '';
  private previewUrl: string | null = null;

  constructor() {
    this.currentUrl = this.router.url.split('?')[0];
    const user = this.authService.getCurentUser();
    if (!user) {
      this.router.navigate(['login']);
      return;
    }

    this.userName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.userName || '';
    this.userEmail = user.email ?? '';
  }

  get imageSrc(): string | null {
    return this.previewUrl ?? this.authService.profileImageUrl();
  }

  get hasProfileImage(): boolean {
    return !!this.authService.getCurentUser()?.profileImageUrl;
  }

  get userInitials(): string {
    return this.userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase() || 'U';
  }

  get isImageRequestActive(): boolean {
    return this.isUploadingImage || this.isRemovingImage;
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  ngOnDestroy(): void {
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = null;
  }

  loadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file || this.isImageRequestActive) return;
    this.imageValidationMessage = '';

    if (!this.allowedImageTypes.has(file.type)) {
      this.imageValidationMessage = 'invalidImageType';
      return;
    }
    if (file.size > this.maxImageBytes) {
      this.imageValidationMessage = 'imageTooLarge';
      return;
    }

    this.revokePreview();
    this.previewUrl = URL.createObjectURL(file);
    this.isUploadingImage = true;
    this.cdr.markForCheck();

    const payload = new FormData();
    payload.append('image', file, file.name);
    this.apiService.post('Users/ProfileImage', payload).pipe(
      catchError((error) => {
        this.showToast('error', error?.error?.message || 'profileImageUploadError');
        return of(null);
      }),
      finalize(() => {
        this.isUploadingImage = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) {
        this.revokePreview();
        return;
      }
      if (response?.isSuccess === false) {
        this.showToast('error', response?.message || 'profileImageUploadError');
        this.revokePreview();
        return;
      }

      const imageUrl = String(response?.data ?? '').trim();
      if (!imageUrl) {
        this.showToast('error', 'profileImageUploadError');
        this.revokePreview();
        return;
      }

      this.authService.updateProfileImage(imageUrl);
      this.revokePreview();
      this.showToast('success', response?.message || 'profileImageUpdated');
    });
  }

  removeProfileImage(): void {
    if (!this.hasProfileImage || this.isImageRequestActive) return;

    Swal.fire({
      title: this.translate.instant('confirmRemoveProfileImage'),
      text: this.translate.instant('removeProfileImageWarning'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('removeImage'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#e11d48',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.isRemovingImage = true;
      this.cdr.markForCheck();
      this.apiService.deleteRequest('Users/ProfileImage').pipe(
        catchError((error) => {
          this.showToast('error', error?.error?.message || 'profileImageRemoveError');
          return of(null);
        }),
        finalize(() => {
          this.isRemovingImage = false;
          this.cdr.markForCheck();
        }),
      ).subscribe((response: any) => {
        if (response === null) return;
        if (response?.isSuccess === false) {
          this.showToast('error', response?.message || 'profileImageRemoveError');
          return;
        }

        this.authService.updateProfileImage(null);
        this.showToast('success', response?.message || 'profileImageRemoved');
      });
    });
  }

  onLogoutClicked(): void {
    Swal.fire({
      title: this.translate.instant('confirmSignOut'),
      text: this.translate.instant('confirmSignOutQuestion'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('signOut'),
      confirmButtonColor: '#fb2c36',
      cancelButtonText: this.translate.instant('cancel'),
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) this.authService.logout();
    });
  }

  private revokePreview(): void {
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = null;
    this.cdr.markForCheck();
  }

  private showToast(icon: 'success' | 'error', message: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: this.translate.instant(message),
      showConfirmButton: false,
      timer: icon === 'success' ? 2600 : 4200,
      timerProgressBar: true,
    });
  }
}
