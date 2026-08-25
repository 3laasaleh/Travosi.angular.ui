import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { IGenericResponse } from '../../core/models/genericReponse.model';
import { ApiService } from '../../core/services/apiservice.service';

interface NewsletterSubscriptionResult {
  isNewSubscription: boolean;
  welcomeEmailSent: boolean;
}

type NewsletterMessage =
  | 'newsletterSubscribedSuccess'
  | 'newsletterAlreadySubscribed'
  | 'newsletterSubscribeError'
  | null;

@Component({
  selector: 'app-footer-one',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-one.html',
})
export class FooterOne implements AfterViewInit {
  logo = 'assets/images/main-logo.png';
  year = new Date().getFullYear();
  readonly paymentMethods = [
    { name: 'Mastercard', logo: 'assets/images/payments/mastercard.jpg' },
    { name: 'Visa', logo: 'assets/images/payments/visa.jpg' },
    { name: 'PayPal', logo: 'assets/images/payments/paypal.jpg' },
    { name: 'InstaPay', logo: 'assets/images/payments/instapay.png', compactLogo: true },
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

  get emailControl(): FormControl<string> {
    return this.newsletterForm.controls.email;
  }

  ngAfterViewInit(): void {
    feather.replace();
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
