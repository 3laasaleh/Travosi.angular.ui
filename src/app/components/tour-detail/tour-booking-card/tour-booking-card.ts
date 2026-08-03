import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { AuthService } from '../../../pages/user/_services/auth.service';

@Component({
  selector: 'app-tour-booking-card',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe, TranslatePipe],
  templateUrl: './tour-booking-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourBookingCard {
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly currencyService = inject(CurrencyService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() tour: any = null;

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  bookingForm = new FormGroup({
    travelDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    adults: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    children: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    notes: new FormControl('', { nonNullable: true }),
  });

  get isLoggedIn(): boolean {
    return this.authService.getCurentUser() !== null && !this.authService.isTokenExpired();
  }

  get pricePerPerson(): number {
    return Number(this.tour?.pricePerPerson ?? this.tour?.price ?? 0);
  }

  get pricePerChild(): number {
    return Number(this.tour?.pricePerChild ?? 0);
  }

  get maxSeats(): number {
    return Number(this.tour?.maxSeats ?? 0);
  }

  get guests(): number {
    return this.bookingForm.controls.adults.value + this.bookingForm.controls.children.value;
  }

  get totalAmount(): number {
    return (
      this.bookingForm.controls.adults.value * this.pricePerPerson +
      this.bookingForm.controls.children.value * this.pricePerChild
    );
  }

  get currencySymbol(): string {
    return (
      this.tour?.currencySymbol ??
      this.tour?.currency?.symbol ??
      this.currencyService.currentCurrency().symbol
    );
  }

  get minTravelDate(): string {
    return new Date().toISOString().substring(0, 10);
  }

  goToLogin(): void {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  bookNow(): void {
    if (this.isSubmitting) return;

    if (!this.isLoggedIn) {
      this.goToLogin();
      return;
    }

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    if (this.maxSeats > 0 && this.guests > this.maxSeats) {
      this.errorMessage = 'bookingSeatsExceeded';
      return;
    }

    const form = this.bookingForm.getRawValue();
    const payload = {
      tourId: Number(this.tour?.id ?? this.tour?.tourId),
      travelDate: form.travelDate,
      adults: form.adults,
      children: form.children,
      guests: this.guests,
      totalAmount: this.totalAmount,
      currencyId: Number(this.tour?.currencyId ?? this.currencyService.currentCurrency().id),
      notes: form.notes.trim() || null,
    };

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.apiService.post('Booking', payload).pipe(
      catchError(() => {
        this.errorMessage = 'bookingCreateError';
        return of(null);
      }),
      finalize(() => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response?.message || 'bookingCreateError';
        return;
      }
      this.successMessage = response?.message || 'bookingCreated';
      this.bookingForm.reset({ travelDate: '', adults: 1, children: 0, notes: '' });
    });
  }
}
