import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SaveFeedbackService {
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);

  errorMessage(response: any, fallback: string): string {
    const body = response?.error ?? response;
    const errors = body?.errors;
    const details = Array.isArray(errors) ? errors : errors && typeof errors === 'object' ? Object.values(errors).flat() : [];
    const messages = [body?.message, ...details].filter((value): value is string => typeof value === 'string' && !!value.trim());
    return [...new Set(messages)].map(message => this.translate.instant(message)).join('\n') || this.translate.instant(fallback);
  }

  show(icon: 'success' | 'error' | 'warning', message: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    void Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      titleText: this.translate.instant(message),
      showConfirmButton: false,
      timer: icon === 'success' ? 3000 : 6000,
      timerProgressBar: true,
      didOpen: () => { const container = Swal.getContainer(); if (container) container.style.zIndex = '11000'; },
    });
  }
}
