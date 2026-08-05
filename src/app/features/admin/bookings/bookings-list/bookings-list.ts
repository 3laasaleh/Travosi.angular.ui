import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../core/services/apiservice.service';
import { BOOKING_STATUS_OPTIONS, BookingStatusEnum } from '../../../../core/enums/booking-status.enum';
import { AuthService } from '../../../user/_services/auth.service';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-admin-bookings-list',
  standalone: true,
  imports: [DatePipe, TranslatePipe, PaginationOne],
  templateUrl: './bookings-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  readonly bookingStatusEnum = BookingStatusEnum;
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();

  bookings: any[] = [];
  isLoading = false;
  updatingBookingId: number | null = null;
  errorMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {}

  get isAdmin(): boolean {
    return this.authService.getCurrentUserRole() === 'Admin';
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadBookings();
    }
  }

  loadBookings(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService
      .get(`Booking?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`)
      .pipe(
        catchError(() => {
          this.errorMessage = 'bookingsLoadError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response === null) return;
        const pageData = response?.data ?? response;
        const rows = pageData?.data ?? pageData?.items ?? pageData?.bookings ?? pageData;
        this.bookings = Array.isArray(rows) ? rows : [];
        this.paginationInfo = {
          page: Number(pageData?.page ?? this.paginationInfo.page),
          pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
          totalCount: Number(pageData?.totalCount ?? this.bookings.length),
          totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
        };
      });
  }

  previousPage(): void {
    if (this.paginationInfo.page > 1) {
      this.paginationInfo.page--;
      this.loadBookings();
    }
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
      return;
    this.paginationInfo.page = page;
    this.loadBookings();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadBookings();
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo.totalPages) {
      this.paginationInfo.page++;
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

  agentName(booking: any): string {
    return booking?.agentName ?? booking?.agent?.firstName ?? '';
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
    this.apiService
      .patch(`Booking/${bookingId}/ChangeStatus`, { status: Number(status) })
      .pipe(
        catchError(() => {
          Swal.fire({ icon: 'error', title: this.translate.instant('bookingStatusUpdateError') });
          return of(null);
        }),
        finalize(() => {
          this.updatingBookingId = null;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response === null) return;
        if (response?.isSuccess === false) {
          Swal.fire({
            icon: 'error',
            title: response?.message || this.translate.instant('bookingStatusUpdateError'),
          });
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
