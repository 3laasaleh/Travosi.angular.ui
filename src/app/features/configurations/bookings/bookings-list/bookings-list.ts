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
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  selector: 'app-configurations-bookings-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe, TranslatePipe, PaginationOne, RouterLink],
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
  selectedStatus: '' | BookingStatusEnum = '';
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
      .get(`Bookings?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}${this.selectedStatus === '' ? '' : `&status=${this.selectedStatus}`}`)
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

  onStatusFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus = value === '' ? '' : Number(value) as BookingStatusEnum;
    this.paginationInfo.page = 1;
    this.loadBookings();
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

  canAssign(booking: any): boolean {
    const status = Number(booking?.status);
    return this.isAdmin && (status === BookingStatusEnum.Pending || status === BookingStatusEnum.Cancelled);
  }

  canComplete(booking: any): boolean {
    return Number(booking?.status) === BookingStatusEnum.Confirmed;
  }

  canSetPending(booking: any): boolean {
    const status = Number(booking?.status);
    return this.isAdmin && status === BookingStatusEnum.Cancelled;
  }

  async confirmBooking(booking: any): Promise<void> {
    const phone = booking?.userMobile || this.translate.instant('notAvailable');
    const result = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('confirmBookingByPhone'),
      html: `<p class="text-sm text-slate-500">${this.translate.instant('customerPhone')}: <strong>${this.escapeHtml(phone)}</strong></p>`,
      input: 'textarea',
      inputLabel: this.translate.instant('bookingFeedbackOptional'),
      inputPlaceholder: this.translate.instant('bookingFeedbackPlaceholder'),
      inputAttributes: { maxlength: '1000' },
      showCancelButton: true,
      confirmButtonText: this.translate.instant('customerContactedConfirm'),
      cancelButtonText: this.translate.instant('cancel'),
    });
    if (!result.isConfirmed) return;
    this.changeStatus(booking, BookingStatusEnum.Confirmed, {
      customerContacted: true,
      feedback: String(result.value ?? '').trim() || null,
    });
  }

  async completeBooking(booking: any): Promise<void> {
    if (!await this.confirmStatusChange('bookingStatusCompleted')) return;
    this.changeStatus(booking, BookingStatusEnum.Completed);
  }

  async cancelBooking(booking: any): Promise<void> {
    const freeCancellation = booking?.isFreeCancellation === true;
    const isConfirmed = Number(booking?.status) === BookingStatusEnum.Confirmed;
    const feeRequired = isConfirmed && !freeCancellation;
    const existingFee = Number(booking?.cancellationFeeAmount ?? 0);
    const totalPrice = Number(booking?.totalPrice ?? 0);
    const defaultFee = feeRequired
      ? (Number.isFinite(existingFee) && existingFee > 0 ? existingFee : Math.max(0, totalPrice))
      : 0;
    const feedbackLabel = this.escapeHtml(this.translate.instant('bookingFeedbackOptional'));
    const feedbackPlaceholder = this.escapeHtml(this.translate.instant('bookingFeedbackPlaceholder'));
    const feeLabel = this.escapeHtml(this.translate.instant('cancellationFee'));
    const cancellationDescription = this.escapeHtml(this.translate.instant(
      freeCancellation ? 'freeCancellationNoFee' : (feeRequired ? 'nonFreeCancellationNotice' : 'pendingCancellationNoFee'),
    ));
    const policy = this.cancellationPolicy(booking);
    const policyMarkup = policy
      ? `<div class="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"><p class="font-semibold">${this.escapeHtml(this.translate.instant('cancellationPolicyLabel'))}</p><p class="mt-1 whitespace-pre-wrap">${this.escapeHtml(policy)}</p></div>`
      : '';
    const result = await Swal.fire({
      icon: 'warning',
      title: this.translate.instant('cancelBookingConfirm'),
      html: `<div class="space-y-3 text-start">
        <p class="text-sm text-slate-500">${cancellationDescription}</p>
        ${policyMarkup}
        ${feeRequired ? `<label for="booking-cancellation-fee" class="block text-sm font-semibold">${feeLabel}</label><input id="booking-cancellation-fee" type="number" min="0" step="0.01" value="${defaultFee}" class="swal2-input !m-0 !w-full"><p class="text-xs font-semibold text-rose-600">${this.escapeHtml(this.translate.instant('customerCancellationCharge', { amount: defaultFee.toFixed(2) }))}</p>` : ''}
        <label for="booking-feedback" class="block text-sm font-semibold">${feedbackLabel}</label>
        <textarea id="booking-feedback" maxlength="1000" rows="4" placeholder="${feedbackPlaceholder}" class="swal2-textarea !m-0 !w-full"></textarea>
      </div>`,
      focusConfirm: false,
      preConfirm: () => {
        const popup = Swal.getPopup();
        const feedback = popup?.querySelector<HTMLTextAreaElement>('#booking-feedback')?.value.trim() ?? '';
        const cancellationFeeAmount = freeCancellation
          ? 0
          : Number(popup?.querySelector<HTMLInputElement>('#booking-cancellation-fee')?.value ?? 0);
        if (!Number.isFinite(cancellationFeeAmount) || cancellationFeeAmount < 0) {
          Swal.showValidationMessage(this.translate.instant('cancellationFeeInvalid'));
          return false;
        }
        if (feeRequired && cancellationFeeAmount <= 0) {
          Swal.showValidationMessage(this.translate.instant('cancellationFeeRequired'));
          return false;
        }
        return { feedback, cancellationFeeAmount };
      },
      showCancelButton: true,
      confirmButtonText: this.translate.instant('cancelBooking'),
      cancelButtonText: this.translate.instant('cancel'),
    });
    if (!result.isConfirmed) return;
    const values = result.value as { feedback: string; cancellationFeeAmount: number };
    this.changeStatus(booking, BookingStatusEnum.Cancelled, {
      cancellationFeeAmount: values.cancellationFeeAmount,
      feedback: values.feedback || null,
    });
  }

  private cancellationPolicy(booking: any): string {
    const isArabic = this.translate.currentLang()?.toLowerCase().startsWith('ar') ?? false;
    return String(booking?.[isArabic ? 'cancellationPolicyAr' : 'cancellationPolicyEng'] ?? '').trim();
  }

  async setPendingBooking(booking: any): Promise<void> {
    if (!this.canSetPending(booking)) return;
    const result = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('setBookingPending'),
      text: this.translate.instant('setBookingPendingDescription'),
      input: 'textarea',
      inputLabel: this.translate.instant('bookingFeedbackOptional'),
      inputPlaceholder: this.translate.instant('bookingFeedbackPlaceholder'),
      inputAttributes: { maxlength: '1000' },
      showCancelButton: true,
      confirmButtonText: this.translate.instant('setPending'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#f59e0b',
    });
    if (!result.isConfirmed) return;
    this.changeStatus(booking, BookingStatusEnum.Pending, {
      feedback: String(result.value ?? '').trim() || null,
    });
  }

  private changeStatus(booking: any, status: BookingStatusEnum, details: Record<string, unknown> = {}): void {
    const bookingId = Number(booking?.id ?? booking?.bookingId);
    if (!Number.isInteger(bookingId) || bookingId <= 0 || this.updatingBookingId !== null) return;

    this.updatingBookingId = bookingId;
    this.apiService
      .patch(`Bookings/${bookingId}/ChangeStatus`, { status: Number(status), ...details })
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
          iconColor: '#00d492',
          title: response?.message || this.translate.instant('bookingStatusUpdated'),
          showConfirmButton: false,
          timer: 2200,
          timerProgressBar: true,
        });
        this.loadBookings();
      });
  }

  private async confirmStatusChange(statusKey: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant('statusChangeConfirmation', {
        status: this.translate.instant(statusKey),
      }),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#00d492',
      reverseButtons: true,
    });
    return result.isConfirmed;
  }

  private escapeHtml(value: unknown): string {
    return String(value ?? '').replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    })[character] ?? character);
  }
}
