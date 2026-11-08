import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { BOOKING_STATUS_OPTIONS, BookingStatusEnum } from '../../../../core/enums/booking-status.enum';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [DatePipe, DecimalPipe, RouterLink, TranslatePipe],
  templateUrl: './booking-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDetails implements OnInit {
  readonly bookingStatusEnum = BookingStatusEnum;
  booking: any | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      this.isLoading = false;
      this.errorMessage = 'bookingDetailsLoadError';
      return;
    }

    this.apiService.get(`Bookings/${bookingId}`).pipe(
      catchError(() => {
        this.errorMessage = 'bookingDetailsLoadError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false || !response?.data) {
        this.errorMessage = 'bookingDetailsLoadError';
        return;
      }
      this.booking = response.data;
    });
  }

  bookingStatusKey(value: unknown): string {
    const status = Number(value);
    return BOOKING_STATUS_OPTIONS.find((option) => option.value === status)?.labelKey
      ?? String(value ?? '');
  }

  bookingTypeKey(): string {
    if (this.booking?.hotelId) return 'bookingTypeHotel';
    if (this.booking?.tourId) return 'bookingTypeTour';
    return 'bookingTypePackage';
  }

  productName(): string {
    return this.booking?.hotelName
      ?? this.booking?.tourTitle
      ?? this.booking?.packageName
      ?? '-';
  }
}
