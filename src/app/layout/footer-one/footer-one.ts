import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { COMPANY_PROFILE, CompanyOffice } from '../../core/data/company-profile';
import { IGenericResponse } from '../../core/models/genericReponse.model';
import { ApiService } from '../../core/services/apiservice.service';

interface NewsletterSubscriptionResult {
  isNewSubscription: boolean;
  welcomeEmailSent: boolean;
}

type NewsletterMessage =
  'newsletterSubscribedSuccess' | 'newsletterAlreadySubscribed' | 'newsletterSubscribeError' | null;

@Component({
  selector: 'app-footer-one',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-one.html',
})
export class FooterOne implements AfterViewInit {
  logo = 'assets/images/main-logo.png';
  year = new Date().getFullYear();
  readonly officeAddresses: CompanyOffice[] = COMPANY_PROFILE.offices;
  readonly socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/seaworldholidayseg', icon: 'mdi-facebook', className: 'bg-[#1877f2] hover:bg-[#0f6adf]' },
    { name: 'Instagram', href: 'https://www.instagram.com/seaworldholidays9', icon: 'mdi-instagram', className: 'bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]' },
    { name: 'WhatsApp', href: COMPANY_PROFILE.whatsApp, icon: 'mdi-whatsapp', className: 'bg-[#25d366] hover:bg-[#1ebe5d]' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@sea.world.holidays', icon: 'mdi-music-note', className: 'bg-black hover:bg-slate-800' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/sea-world-holidays', icon: 'mdi-linkedin', className: 'bg-[#0a66c2] hover:bg-[#084f96]' },
    { name: 'X', href: 'https://x.com/seaworldholiday', icon: 'mdi-alpha-x-box-outline', className: 'bg-black hover:bg-slate-800' },
  ];
  readonly paymentMethods = [
    { name: 'Mastercard', logo: 'assets/images/payments/mastercard.jpg' },
    { name: 'Visa', logo: 'assets/images/payments/visa.jpg' },
    { name: 'PayPal', logo: 'assets/images/payments/paypal.jpg' },
    { name: 'InstaPay', logo: 'assets/images/payments/instapay.png' },
    { name: 'Valu installments', logo: 'assets/images/payments/valu.png' },
    { name: 'Tabby', logo: 'assets/images/payments/tabby.png', transparent: true },
    { name: 'Tamara', logo: 'assets/images/payments/tamara.png', transparent: true },
  ];
  isSubmitting = false;
  newsletterMessage: NewsletterMessage = null;
  newsletterMessageKind: 'success' | 'error' | null = null;

  readonly newsletterForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  officeName(office: CompanyOffice): string {
    return this.isArabic ? office.name.ar : office.name.en;
  }

  officeAddress(office: CompanyOffice): string {
    return this.isArabic ? office.address.ar : office.address.en;
  }

  private get isArabic(): boolean {
    if (typeof document === 'undefined') return false;
    return document.documentElement.lang.toLowerCase().startsWith('ar') || document.documentElement.dir === 'rtl';
  }

  get emailControl(): FormControl<string> {
    return this.newsletterForm.controls.email;
  }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }

  subscribeToNewsletter(): void {
    if (this.isSubmitting) {
      return;
    }

    const email = this.emailControl.value.trim();
    this.emailControl.setValue(email);
    this.newsletterMessage = null;
    this.newsletterMessageKind = null;

    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.apiService
      .postUnauthenticated<IGenericResponse<NewsletterSubscriptionResult>>(
        'NewsletterSubscriptions/Subscribe',
        { email },
      )
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.changeDetectorRef.markForCheck();
        }),
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.showNewsletterError();
            return;
          }

          this.newsletterMessageKind = 'success';
          if (response.data.isNewSubscription) {
            this.newsletterMessage = 'newsletterSubscribedSuccess';
            this.newsletterForm.reset();
          } else {
            this.newsletterMessage = 'newsletterAlreadySubscribed';
          }
        },
        error: () => this.showNewsletterError(),
      });
  }

  private showNewsletterError(): void {
    this.newsletterMessageKind = 'error';
    this.newsletterMessage = 'newsletterSubscribeError';
  }
}
