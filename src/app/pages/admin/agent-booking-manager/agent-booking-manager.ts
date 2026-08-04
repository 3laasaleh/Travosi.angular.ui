import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { PaginationOne } from '../../../components/listing/tour-grid/pagination-one/pagination-one';
import { ApiService } from '../../../core/services/apiservice.service';
import { BOOKING_STATUS_OPTIONS, BookingStatusEnum } from '../../../core/enums/booking-status.enum';

@Component({
  selector: 'app-agent-booking-manager',
  standalone: true,
  imports: [DatePipe, RouterLink, TranslatePipe, PaginationOne],
  templateUrl: './agent-booking-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentBookingManager implements OnInit {
  readonly pageSizeOptions = [10, 20, 50];
  readonly bookingStatusEnum = BookingStatusEnum;
  bookings: any[] = [];
  isLoading = false;
  updatingBookingId: number | null = null;
  errorMessage = '';
  page = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 1;

  constructor(
    private apiService: ApiService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.get(`Booking?page=${this.page}&pageSize=${this.pageSize}`).pipe(
      catchError(() => {
        this.errorMessage = 'bookingsLoadError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.bookings ?? pageData;
      this.bookings = Array.isArray(rows) ? rows : [];
      this.totalCount = Number(pageData?.totalCount ?? this.bookings.length);
      this.totalPages = Math.max(1, Number(pageData?.totalPages ?? 1));
    });
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadBookings();
    }
  }

  onPageChange(page: number): void {
    if (page === this.page || page < 1 || page > this.totalPages) return;
    this.page = page;
    this.loadBookings();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.pageSize = pageSize;
    this.page = 1;
    this.loadBookings();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadBookings();
    }
  }

  bookingStatusKey(value: unknown): string {
    const status = Number(value);
    return (
      BOOKING_STATUS_OPTIONS.find((option) => option.value === status)?.labelKey ??
      String(value ?? '')
    );
  }

  canConfirm(booking: any): boolean {
    return Number(booking?.status) === BookingStatusEnum.Pending;
  }

  canCancel(booking: any): boolean {
    const status = Number(booking?.status);
    return status === BookingStatusEnum.Pending || status === BookingStatusEnum.Confirmed;
  }

  canComplete(booking: any): boolean {
    return Number(booking?.status) === BookingStatusEnum.Confirmed;
  }

  confirmBooking(booking: any): void {
    this.changeStatus(booking, BookingStatusEnum.Confirmed);
  }

  completeBooking(booking: any): void {
    this.changeStatus(booking, BookingStatusEnum.Completed);
  }

  async cancelBooking(booking: any): Promise<void> {
    const result = await Swal.fire({
      icon: 'warning',
      title: this.translate.instant('cancelBookingConfirm'),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('cancelBooking'),
      cancelButtonText: this.translate.instant('cancel'),
    });
    if (!result.isConfirmed) return;
    this.changeStatus(booking, BookingStatusEnum.Cancelled);
  }

  private changeStatus(booking: any, status: BookingStatusEnum): void {
    const bookingId = Number(booking?.id ?? booking?.bookingId);
    if (!Number.isInteger(bookingId) || bookingId <= 0 || this.updatingBookingId !== null) return;

    this.updatingBookingId = bookingId;
    this.apiService.patch(`Booking/${bookingId}/ChangeStatus`, { status: Number(status) }).pipe(
      catchError(() => {
        Swal.fire({ icon: 'error', title: this.translate.instant('bookingStatusUpdateError') });
        return of(null);
      }),
      finalize(() => {
        this.updatingBookingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('bookingStatusUpdateError') });
        return;
      }
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: response?.message || this.translate.instant('bookingStatusUpdated'),
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
      });
      this.loadBookings();
    });
  }
}
