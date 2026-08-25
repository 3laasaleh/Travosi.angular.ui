import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { CurrencyService } from '../../../../../core/services/currency.service';
import { AuthService } from '../../../../user/_services/auth.service';
import { DatePicker } from '../../../../../shared/components/date-picker/date-picker';
import { formatHomePrice } from '../../../home-price.util';


@Component({
  selector: 'app-tour-booking-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, DatePicker],
  templateUrl: './tour-booking-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourBookingCard implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslateService);
  private readonly currencyService = inject(CurrencyService);
  private readonly destroyRef = inject(DestroyRef);

  @Input() tour: any = null;
  @Input() travelPackage: any = null;

  get product(): any {
    return this.tour ?? this.travelPackage;
  }

  get isPackage(): boolean {
    return this.travelPackage != null;
  }

  isSubmitting = false;
  isCheckingAvailability = false;
  availabilityConfirmed = false;
  availabilityStatus: 'available' | 'unavailable' | null = null;
  availabilitySeats = 0;
  errorMessage = '';
  successMessage = '';

  bookingForm = new FormGroup({
    dateFrom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dateTo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    adults: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)] }),
    children: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), Validators.pattern(/^\d+$/)] }),
    specialRequests: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(1000)] }),
  }, { validators: TourBookingCard.dateRangeValidator });

  get isLoggedIn(): boolean {
    return this.authService.getCurentUser() !== null && !this.authService.isTokenExpired();
  }

  get pricePerPerson(): number {
    return this.rawPrice(this.product?.pricePerPerson ?? this.product?.price);
  }

  get pricePerChild(): number {
    return this.rawPrice(this.product?.pricePerChild);
  }

  get seatsAvailable(): number {
    const available = Number(this.product?.seatsAvailable);
    if (Number.isFinite(available) && available >= 0) return available;
    return Math.max(0, Number(this.product?.maxSeats ?? this.product?.maxCapacity ?? 0) - Number(this.product?.seatsBooked ?? 0));
  }

  get hasSeatLimit(): boolean {
    return this.product?.seatsAvailable !== null && this.product?.seatsAvailable !== undefined
      || Number(this.product?.maxSeats ?? this.product?.maxCapacity ?? 0) > 0;
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

  get formattedPricePerPerson(): string {
    return formatHomePrice(this.currencyService, this.pricePerPerson, this.product);
  }

  get formattedPricePerChild(): string {
    return formatHomePrice(this.currencyService, this.pricePerChild, this.product);
  }

  get formattedTotalAmount(): string {
    return formatHomePrice(this.currencyService, this.totalAmount, this.product);
  }

  get minTravelDate(): string {
    const today = this.toDateInput(new Date());
    const productStart = this.toDateInput(this.product?.startDate ?? this.product?.dateFrom);
    return productStart && productStart > today ? productStart : today;
  }

  get maxTravelDate(): string | null {
    return this.toDateInput(this.product?.endDate ?? this.product?.dateTo) || null;
  }

  get minDateTo(): string {
    return this.bookingForm.controls.dateFrom.value || this.minTravelDate;
  }

  get hasAvailableDateRange(): boolean {
    return Boolean(this.minTravelDate && this.maxTravelDate);
  }

  get availableDateFrom(): string {
    return this.formatDisplayDate(this.minTravelDate);
  }

  get availableDateTo(): string {
    return this.formatDisplayDate(this.maxTravelDate);
  }

  ngOnInit(): void {
    this.setDefaultDates();
    this.bookingForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.resetAvailability());
  }

  checkAvailability(): void {
    if (this.isCheckingAvailability || this.isSubmitting) return;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const payload = this.createBookingPayload();
    if (!payload) return;

    this.isCheckingAvailability = true;
    this.availabilityStatus = null;
    this.availabilityConfirmed = false;
    this.errorMessage = '';

    this.apiService.postUnauthenticated('Bookings/CheckAvailability', payload).pipe(
      catchError(() => {
        this.errorMessage = 'availabilityCheckError';
        this.showToast('error', this.errorMessage);
        return of(null);
      }),
      finalize(() => {
        this.isCheckingAvailability = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;

      const data = response?.data ?? response;
      const isAvailable = response?.isSuccess !== false && data?.isAvailable === true;
      this.availabilitySeats = Math.max(0, Number(data?.seatsAvailable ?? 0));
      this.availabilityStatus = isAvailable ? 'available' : 'unavailable';
      this.availabilityConfirmed = isAvailable;
      if (!isAvailable && response?.isSuccess === false) {
        this.errorMessage = 'availabilityCheckError';
      }
    });
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

    if (this.product?.isActive === false) {
      this.errorMessage = this.isPackage ? 'packageUnavailableForBooking' : 'tourUnavailableForBooking';
      return;
    }

    if (!this.availabilityConfirmed) {
      this.checkAvailability();
      return;
    }

    const form = this.bookingForm.getRawValue();
    if (
      form.dateFrom < this.minTravelDate ||
      Boolean(this.maxTravelDate && form.dateTo > this.maxTravelDate!)
    ) {
      this.errorMessage = 'bookingDateOutsideAvailability';
      this.showToast('error', this.errorMessage);
      return;
    }

    if (this.hasSeatLimit && this.guests > this.seatsAvailable) {
      this.errorMessage = 'bookingSeatsExceeded';
      return;
    }

    const payload = this.createBookingPayload();
    if (!payload) return;

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.apiService.post('Bookings', payload).pipe(
      catchError((error) => {
        this.errorMessage = this.bookingErrorMessage(error?.error?.message);
        this.showToast('error', this.errorMessage);
        return of(null);
      }),
      finalize(() => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = this.bookingErrorMessage(response?.message);
        this.showToast('error', this.errorMessage);
        return;
      }
      this.successMessage = 'bookingCreated';
      this.showBookingConfirmation(response?.data ?? response);
      this.bookingForm.reset({ dateFrom: '', dateTo: '', adults: 1, children: 0, specialRequests: '' });
      this.setDefaultDates();
      this.resetAvailability();
    });
  }

  private createBookingPayload(): Record<string, unknown> | null {
    const productId = Number(this.product?.id ?? this.product?.tourId ?? this.product?.packageId);
    if (!Number.isInteger(productId) || productId <= 0) {
      this.errorMessage = 'bookingCreateError';
      return null;
    }

    const form = this.bookingForm.getRawValue();
    return {
      NumberOfTravelers: this.guests,
      SpecialRequests: form.specialRequests.trim() || null,
      DateFrom: this.toApiDate(form.dateFrom),
      DateTo: this.toApiDate(form.dateTo),
      TourId: this.isPackage ? null : productId,
      PackageId: this.isPackage ? productId : null,
      TravelDate: this.toApiDate(form.dateFrom),
      Adults: form.adults,
      Children: form.children,
      Notes: form.specialRequests.trim() || null,
    };
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

  private formatDisplayDate(value: string | null): string {
    if (!value) return '';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    const locale = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar') ? 'ar-EG' : 'en-GB';
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  private bookingErrorMessage(message: unknown): string {
    const value = typeof message === 'string' ? message : '';
    return /already has a booking|already have a booking|same dates/i.test(value)
      ? 'duplicateBookingDates'
      : value || 'bookingCreateError';
  }

  private rawPrice(value: unknown): number {
    const price = Number(value ?? 0);
    return Number.isFinite(price) ? price : 0;
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

  private showBookingConfirmation(booking: any): void {
    const createdAt = booking?.createdDate ? new Date(booking.createdDate) : new Date();
    const locale = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar') ? 'ar-EG' : 'en-GB';
    const bookingTime = new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(createdAt);
    const messageKey = booking?.acknowledgementEmailSent === false
      ? 'bookingConfirmationEmailPending'
      : 'bookingConfirmationMessage';

    Swal.fire({
      icon: 'success',
      title: this.translate.instant('bookingRequestReceived'),
      text: this.translate.instant(messageKey, { time: bookingTime }),
      confirmButtonText: this.translate.instant('ok'),
      confirmButtonColor: '#0891b2',
    });
  }

  private resetAvailability(): void {
    this.availabilityConfirmed = false;
    this.availabilityStatus = null;
    this.availabilitySeats = 0;
  }

  private setDefaultDates(): void {
    const dateFrom = this.minTravelDate;
    if (!dateFrom) return;

    let dateTo = this.maxTravelDate;
    if (!dateTo) {
      // If no end date, add 7 days from start date
      const date = new Date(`${dateFrom}T00:00:00`);
      if (!Number.isNaN(date.getTime())) {
        date.setDate(date.getDate() + 7);
        dateTo = this.toDateInput(date);
      }
    }

    this.bookingForm.patchValue({
      dateFrom,
      dateTo: dateTo || dateFrom,
    });
  }
}
