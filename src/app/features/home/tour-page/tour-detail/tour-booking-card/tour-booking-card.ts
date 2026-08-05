import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../../core/services/apiservice.service';
import { apiCurrencyLabel, apiPrice } from '../../../../../core/utils/api-price.util';
import { AuthService } from '../../../../user/_services/auth.service';


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
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslateService);

  @Input() tour: any = null;

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  bookingForm = new FormGroup({
    dateFrom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dateTo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    adults: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    children: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    specialRequests: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(1000)] }),
  }, { validators: TourBookingCard.dateRangeValidator });

  get isLoggedIn(): boolean {
    return this.authService.getCurentUser() !== null && !this.authService.isTokenExpired();
  }

  get pricePerPerson(): number {
    return apiPrice(this.tour?.pricePerPerson ?? this.tour?.price);
  }

  get pricePerChild(): number {
    return apiPrice(this.tour?.pricePerChild);
  }

  get seatsAvailable(): number {
    const available = Number(this.tour?.seatsAvailable);
    if (Number.isFinite(available) && available >= 0) return available;
    return Math.max(0, Number(this.tour?.maxSeats ?? 0) - Number(this.tour?.seatsBooked ?? 0));
  }

  get hasSeatLimit(): boolean {
    return this.tour?.seatsAvailable !== null && this.tour?.seatsAvailable !== undefined
      || Number(this.tour?.maxSeats ?? 0) > 0;
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
    return apiCurrencyLabel(this.tour);
  }

  get minTravelDate(): string {
    const today = this.toDateInput(new Date());
    const tourStart = this.toDateInput(this.tour?.startDate);
    return tourStart && tourStart > today ? tourStart : today;
  }

  get maxTravelDate(): string | null {
    return this.toDateInput(this.tour?.endDate) || null;
  }

  get minDateTo(): string {
    return this.bookingForm.controls.dateFrom.value || this.minTravelDate;
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

    if (this.tour?.isActive === false) {
      this.errorMessage = 'tourUnavailableForBooking';
      return;
    }

    if (this.hasSeatLimit && this.guests > this.seatsAvailable) {
      this.errorMessage = 'bookingSeatsExceeded';
      return;
    }

    const form = this.bookingForm.getRawValue();
    const tourId = Number(this.tour?.id ?? this.tour?.tourId);
    if (!Number.isInteger(tourId) || tourId <= 0) {
      this.errorMessage = 'bookingCreateError';
      return;
    }
    const payload = {
      NumberOfTravelers: this.guests,
      SpecialRequests: form.specialRequests.trim() || null,
      DateFrom: this.toApiDate(form.dateFrom),
      DateTo: this.toApiDate(form.dateTo),
      TourId: tourId,
      PackageId: null,
      TravelDate: this.toApiDate(form.dateFrom),
      Adults: form.adults,
      Children: form.children,
      Notes: form.specialRequests.trim() || null,
    };

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.apiService.post('Bookings', payload).pipe(
      catchError((error) => {
        this.errorMessage = 'bookingCreateError';
        this.showToast('error', error?.error?.message || this.errorMessage);
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
        this.showToast('error', this.errorMessage);
        return;
      }
      this.successMessage = response?.message || 'bookingCreated';
      this.showToast('success', this.successMessage);
      this.bookingForm.reset({ dateFrom: '', dateTo: '', adults: 1, children: 0, specialRequests: '' });
    });
  }

  private static dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const dateFrom = control.get('dateFrom')?.value;
    const dateTo = control.get('dateTo')?.value;
    if (!dateFrom || !dateTo) return null;
    return String(dateTo) >= String(dateFrom) ? null : { invalidBookingDateRange: true };
  }

  private toApiDate(value: string): string {
    return `${value}T00:00:00`;
  }

  private toDateInput(value: unknown): string {
    if (!value) return '';
    if (value instanceof Date) {
      const offset = value.getTimezoneOffset() * 60_000;
      return new Date(value.getTime() - offset).toISOString().slice(0, 10);
    }
    const match = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
    return match?.[1] ?? '';
  }

  private showToast(icon: 'success' | 'error', message: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: this.translate.instant(message),
      showConfirmButton: false,
      timer: icon === 'success' ? 3000 : 4200,
      timerProgressBar: true,
    });
  }
}
