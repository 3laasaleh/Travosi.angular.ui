import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslateService);
  private readonly currencyService = inject(CurrencyService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private bookingLoaderElement: HTMLElement | null = null;
  @Input() tour: any = null;
  @Input() travelPackage: any = null;

  get product(): any {
    return this.tour ?? this.travelPackage;
  }

  get isPackage(): boolean {
    return this.travelPackage != null;
  }

  get isOneDayTour(): boolean {
    return (
      !this.isPackage &&
      (this.product?.isOneDayTour === true || this.product?.IsOneDayTour === true)
    );
  }

  isSubmitting = false;
  isCheckingAvailability = false;
  availabilityConfirmed = false;
  availabilityStatus: 'available' | 'unavailable' | null = null;
  availabilitySeats = 0;
  errorMessage = '';
  successMessage = '';
  guestBookingOpen = false;

  bookingForm = new FormGroup(
    {
      dateFrom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      dateTo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      adults: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      }),
      children: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.min(0), Validators.pattern(/^\d+$/)],
      }),
      infants: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.min(0), Validators.pattern(/^\d+$/)],
      }),
      specialRequests: new FormControl('', {
        nonNullable: true,
        validators: [Validators.maxLength(1000)],
      }),
    },
    { validators: TourBookingCard.dateRangeValidator },
  );

  guestBookingForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
    mobile: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\+?[0-9\s()-]{7,20}$/)],
    }),
  });

  get isLoggedIn(): boolean {
    return this.authService.getCurentUser() !== null && !this.authService.isTokenExpired();
  }

  get pricePerPerson(): number {
    return this.rawPrice(
      this.product?.discountedPricePerPerson ?? this.product?.pricePerPerson ?? this.product?.price,
    );
  }

  get pricePerChild(): number {
    return this.rawPrice(this.product?.discountedPricePerChild ?? this.product?.pricePerChild);
  }

  get pricePerInfant(): number {
    return this.rawPrice(this.product?.discountedPricePerInfant ?? this.product?.pricePerInfant);
  }

  get hasDiscount(): boolean {
    return this.product?.activeDiscount?.isCurrentlyActive === true;
  }

  get discountPercentage(): number {
    return Number(this.product?.activeDiscount?.percentage ?? 0);
  }

  get formattedOriginalPricePerPerson(): string {
    return formatHomePrice(
      this.currencyService,
      this.product?.pricePerPerson ,
      this.product,
    );
  }

  get formattedOriginalPricePerChild(): string {
    return formatHomePrice(this.currencyService, this.product?.pricePerChild, this.product);
  }

  get formattedPricePerInfant(): string {
    return formatHomePrice(this.currencyService, this.pricePerInfant, this.product);
  }

  get formattedOriginalPricePerInfant(): string {
    return formatHomePrice(this.currencyService, this.product?.pricePerInfant, this.product);
  }

  get seatsAvailable(): number {
    const available = Number(this.product?.seatsAvailable);
    if (Number.isFinite(available) && available >= 0) return available;
    return Math.max(
      0,
      Number(this.product?.maxSeats ?? this.product?.maxCapacity ?? 0) -
        Number(this.product?.seatsBooked ?? 0),
    );
  }

  get hasSeatLimit(): boolean {
    return (
      (this.product?.seatsAvailable !== null && this.product?.seatsAvailable !== undefined) ||
      Number(this.product?.maxSeats ?? this.product?.maxCapacity ?? 0) > 0
    );
  }

  get guests(): number {
    return this.bookingForm.controls.adults.value
      + this.bookingForm.controls.children.value
      + this.bookingForm.controls.infants.value;
  }

  get totalAmount(): number {
    return (
      this.bookingForm.controls.adults.value * this.pricePerPerson +
      this.bookingForm.controls.children.value * this.pricePerChild +
      this.bookingForm.controls.infants.value * this.pricePerInfant
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
    const today = new Date();
    const after3Days = new Date(today);
    after3Days.setDate(after3Days.getDate() + 3);
    const fData = this.toDateInput(after3Days);

    const productStart = this.toDateInput(this.product?.startDate ?? this.product?.dateFrom);
    return productStart && productStart > fData ? productStart : fData;
  }

  get maxTravelDate(): string | null {

    return this.toDateInput(this.product?.endDate) || null;
  }

  get minDateTo(): string {

    return this.bookingForm.controls.dateFrom.value || this.minTravelDate;
  }

  get hasAvailableDateRange(): boolean {
    return !this.isOneDayTour && Boolean(this.minTravelDate && this.maxTravelDate);
  }

  get availableDateFrom(): string {
    return this.formatDisplayDate(this.minTravelDate);
  }

  get availableDateTo(): string {
    return this.formatDisplayDate(this.maxTravelDate);
  }

  ngOnInit(): void {
    this.setDefaultDates();
    this.destroyRef.onDestroy(() => this.hideBookingLoader());
    this.bookingForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.resetAvailability());
    this.bookingForm.controls.dateFrom.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((dateFrom) => {
        if (this.isOneDayTour && dateFrom && this.bookingForm.controls.dateTo.value !== dateFrom) {
          this.bookingForm.controls.dateTo.setValue(dateFrom, { emitEvent: false });
        }
      });
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

    this.apiService
      .postUnauthenticated('Bookings/CheckAvailability', payload)
      .pipe(
        catchError(() => {
          this.errorMessage = 'availabilityCheckError';
          this.showToast('error', this.errorMessage);
          return of(null);
        }),
        finalize(() => {
          this.isCheckingAvailability = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
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

  bookNow(): void {
    if (this.isSubmitting) return;

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    if (this.product?.isActive === false) {
      this.errorMessage = this.isPackage
        ? 'packageUnavailableForBooking'
        : 'tourUnavailableForBooking';
      return;
    }

    if (!this.availabilityConfirmed) {
      this.checkAvailability();
      return;
    }

    const form = this.bookingForm.getRawValue();
    const selectedDateTo = this.isOneDayTour ? form.dateFrom : form.dateTo;
    if (
      form.dateFrom < this.minTravelDate ||
      Boolean(this.maxTravelDate && selectedDateTo > this.maxTravelDate!)
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

    if (!this.isLoggedIn) {
      return;
    }

    this.submitBooking(payload, false);
  }

  goToSignIn(): void {
    this.navigateToAuth('/login');
  }

  goToSignUp(): void {
    this.navigateToAuth('/signup');
  }

  private navigateToAuth(path: '/login' | '/signup'): void {
    const returnUrl = this.router.url || '/';
    this.router.navigate([path], { queryParams: { returnUrl } });
  }

  openGuestBookingModal(): void {
    this.guestBookingOpen = true;
    this.errorMessage = '';
    this.cdr.markForCheck();
  }

  closeGuestBookingModal(): void {
    if (this.isSubmitting) return;
    this.guestBookingOpen = false;
    this.cdr.markForCheck();
  }

  submitGuestBooking(): void {
    if (this.isSubmitting) return;

    if (this.guestBookingForm.invalid) {
      this.guestBookingForm.markAllAsTouched();
      return;
    }

    const payload = this.createBookingPayload();
    if (!payload) return;

    const guest = this.guestBookingForm.getRawValue();
    this.submitBooking(
      {
        ...payload,
        GuestFirstName: guest.firstName.trim(),
        GuestLastName: guest.lastName.trim(),
        GuestEmail: guest.email.trim(),
        GuestMobile: guest.mobile.trim(),
      },
      true,
    );
  }

  private submitBooking(payload: Record<string, unknown>, isGuestBooking: boolean): void {
    this.isSubmitting = true;
    this.showBookingLoader();
    this.errorMessage = '';
    this.successMessage = '';
    const request = isGuestBooking
      ? this.apiService.postUnauthenticated('Bookings/Guest', payload)
      : this.apiService.post('Bookings', payload);

    request
      .pipe(
        catchError((error) => {
          this.errorMessage = this.bookingErrorMessage(error?.error?.message);
          this.showToast('error', this.errorMessage);
          return of(null);
        }),
        finalize(() => {
          this.isSubmitting = false;
          this.hideBookingLoader();
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response === null) return;
        if (response?.isSuccess === false) {
          this.errorMessage = this.bookingErrorMessage(response?.message);
          this.showToast('error', this.errorMessage);
          return;
        }
        this.successMessage = 'bookingCreated';
        this.showBookingConfirmation(response?.data ?? response);
        this.guestBookingOpen = false;
        this.guestBookingForm.reset({ firstName: '', lastName: '', email: '', mobile: '' });
        this.bookingForm.reset({
          dateFrom: '',
          dateTo: '',
          adults: 1,
          children: 0,
          infants: 0,
          specialRequests: '',
        });
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
    const dateTo = this.isOneDayTour ? form.dateFrom : form.dateTo;
    return {
      NumberOfTravelers: this.guests,
      SpecialRequests: form.specialRequests.trim() || null,
      DateFrom: this.toApiDate(form.dateFrom),
      DateTo: this.toApiDate(dateTo),
      TourId: this.isPackage ? null : productId,
      PackageId: this.isPackage ? productId : null,
      TravelDate: this.toApiDate(form.dateFrom),
      Adults: form.adults,
      Children: form.children,
      Infants: form.infants,
      Notes: form.specialRequests.trim() || null,
    };
  }

  private showBookingLoader(): void {
    if (this.bookingLoaderElement || !this.document.body) return;

    const overlay = this.document.createElement('div');
    const spinner = this.document.createElement('span');
    overlay.className = 'booking-loader-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'assertive');
    overlay.setAttribute('aria-label', this.translate.instant('creatingBooking'));
    spinner.className = 'booking-loader-spinner';
    spinner.setAttribute('aria-hidden', 'true');
    overlay.appendChild(spinner);
    this.document.body.appendChild(overlay);
    this.bookingLoaderElement = overlay;
  }

  private hideBookingLoader(): void {
    this.bookingLoaderElement?.remove();
    this.bookingLoaderElement = null;
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
    const locale = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar')
      ? 'ar-EG'
      : 'en-GB';
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
      iconColor: icon === 'success' ? '#00d492' : undefined,
      title: this.translate.instant(message),
      showConfirmButton: false,
      timer: icon === 'success' ? 3000 : 4200,
      timerProgressBar: true,
    });
  }

  private showBookingConfirmation(booking: any): void {
    const createdAt = booking?.createdDate ? new Date(booking.createdDate) : new Date();
    const locale = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar')
      ? 'ar-EG'
      : 'en-GB';
    const bookingTime = new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(createdAt);
    const messageKey =
      booking?.acknowledgementEmailSent === false
        ? 'bookingConfirmationEmailPending'
        : 'bookingConfirmationMessage';

    Swal.fire({
      icon: 'success',
      iconColor: '#00d492',
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

    if (this.isOneDayTour) {
      this.bookingForm.patchValue({ dateFrom, dateTo: dateFrom });
      return;
    }

    let dateTo = this.maxTravelDate;
    if (!dateTo||dateTo<=dateFrom) {
      // If no end date, add 7 days from start date
      const date = new Date(`${dateFrom}T00:00:00`);
      if (!Number.isNaN(date.getTime())) {
        date.setDate(date.getDate() + 1);
        dateTo = this.toDateInput(date);
      }
    }

    this.bookingForm.patchValue({
      dateFrom,
      dateTo: dateTo || dateFrom,
    });
    this.cdr.markForCheck();
  }
}
