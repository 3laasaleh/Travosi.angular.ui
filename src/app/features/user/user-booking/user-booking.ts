import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountTab } from '../account-tab/account-tab';
import { FooterOne } from '../../../layout/footer-one/footer-one';

import { ApiService } from '../../../core/services/apiservice.service';
import { AuthService } from '../_services/auth.service';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, map, of } from 'rxjs';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import Swal from 'sweetalert2';

interface ReviewEligibility {
  canReview: boolean;
  alreadyReviewed: boolean;
  message: string;
  reviewId?: number;
  reviewComment?: string;
  reviewRating?: number;
}

interface UserBookingItem {
  id: number;
  bookingNo?: string;
  tourTitle?: string;
  tourRouteName?: string;
  packageName?: string;
  packageRouteName?: string;
  hotelId?: number;
  hotelName?: string;
  hotelRoomName?: string;
  hotelRouteName?: string;
  bookingType?: string;
  specialRequests?: string | null;
  statusNote?: string | null;
  createdDate: string;
  dateFrom?: string | null;
  dateTo?: string | null;
  numberOfTravelers: number;
  roomCount?: number;
  adults?: number;
  children?: number;
  infants?: number;
  statusName: string;
  totalPrice: number;
  cancellationFeeAmount: number;
  reviewEligibility?: ReviewEligibility;
}

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [Breadcrumbs, CommonModule, FormsModule, HomeNavbar, AccountTab, FooterOne, TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-booking.html',
})
export class UserBooking implements OnInit {
  bookings: UserBookingItem[] = [];
  isLoading = false;
  errorMessage = '';
  page = 1;
  pageSize = 10;
  pageSizes = [10, 20, 50];
  selectedBooking: UserBookingItem | null = null;
  reviewBooking: UserBookingItem | null = null;
  reviewModalMode: 'create' | 'edit' | null = null;
  reviewDraft = { comment: '', rating: undefined as number | undefined };
  reviewModalError = '';
  isSavingReview = false;
  isDeletingReview = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadBookings(user.userId);
  }

  get pagedBookings(): UserBookingItem[] {
    const start = (this.page - 1) * this.pageSize;
    return this.bookings.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.bookings.length / this.pageSize));
  }

  loadBookings(userId: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.get(`Bookings/user/${userId}`).subscribe({
      next: (data) => {
        this.bookings = Array.isArray(data) ? data : [];
        this.page = 1;
        this.isLoading = false;
        this.loadReviewEligibility();
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'userBookingsLoadError';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      complete: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  bookingStatusKey(statusName: string): string {
    const keys: Record<string, string> = {
      pending: 'bookingStatusPending',
      confirmed: 'bookingStatusConfirmed',
      cancelled: 'bookingStatusCancelled',
      completed: 'bookingStatusCompleted',
    };
    return keys[(statusName ?? '').toLowerCase()] ?? statusName;
  }

  canWriteReview(booking: UserBookingItem): boolean {
    return booking.reviewEligibility?.canReview === true;
  }

  canEditReview(booking: UserBookingItem): boolean {
    return booking.reviewEligibility?.alreadyReviewed === true && Number(booking.reviewEligibility.reviewId) > 0;
  }

  serviceName(booking: UserBookingItem): string {
    if (booking.hotelName) {
      return booking.hotelRoomName ? `${booking.hotelName} · ${booking.hotelRoomName}` : booking.hotelName;
    }
    return booking.tourTitle ?? booking.packageName ?? '-';
  }

  serviceTypeKey(booking: UserBookingItem): string {
    if (booking.hotelId || booking.bookingType?.toLowerCase() === 'hotel') return 'bookingTypeHotel';
    if (booking.tourTitle || booking.tourId || booking.bookingType?.toLowerCase() === 'tour') return 'bookingTypeTour';
    return 'bookingTypePackage';
  }

  openBookingDetails(booking: UserBookingItem): void {
    this.selectedBooking = booking;
  }

  closeBookingDetails(): void {
    this.selectedBooking = null;
  }

  openReviewModal(booking: UserBookingItem): void {
    const eligibility = booking.reviewEligibility;
    this.reviewBooking = booking;
    this.reviewModalMode = eligibility?.alreadyReviewed ? 'edit' : 'create';
    this.reviewDraft = {
      comment: eligibility?.reviewComment ?? '',
      rating: eligibility?.reviewRating,
    };
    this.reviewModalError = '';
  }

  closeReviewModal(): void {
    if (this.isSavingReview || this.isDeletingReview) return;
    this.reviewBooking = null;
    this.reviewModalMode = null;
    this.reviewModalError = '';
  }

  submitReview(): void {
    const booking = this.reviewBooking;
    if (!booking || !this.reviewModalMode || this.isSavingReview) return;
    const comment = this.reviewDraft.comment.trim();
    this.reviewModalError = '';
    if (!comment) {
      this.reviewModalError = 'reviewTextRequired';
      this.cdr.markForCheck();
      return;
    }
    if (comment.length > 2000) {
      this.reviewModalError = 'reviewTextTooLong';
      this.cdr.markForCheck();
      return;
    }
    if (!this.reviewDraft.rating || this.reviewDraft.rating < 1 || this.reviewDraft.rating > 5) {
      this.reviewModalError = 'reviewRatingRequired';
      this.cdr.markForCheck();
      return;
    }

    const reviewId = booking.reviewEligibility?.reviewId;
    if (this.reviewModalMode === 'edit' && !reviewId) {
      this.reviewModalError = 'reviewUnavailable';
      return;
    }
    this.isSavingReview = true;
    const request = this.reviewModalMode === 'edit'
      ? this.apiService.put(`Reviews/${reviewId}`, { comment, rating: this.reviewDraft.rating })
      : this.apiService.post('Reviews', { bookingId: booking.id, comment, rating: this.reviewDraft.rating });
    request.pipe(
      finalize(() => {
        this.isSavingReview = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: (response) => {
        if (response?.isSuccess === false) {
          this.reviewModalError = response.message || 'reviewSaveError';
          return;
        }
        booking.reviewEligibility = {
          canReview: false,
          alreadyReviewed: true,
          message: 'alreadyReviewedBooking',
          reviewId: response?.data?.id ?? reviewId,
          reviewComment: comment,
          reviewRating: this.reviewDraft.rating,
        };
        this.reviewBooking = null;
        this.reviewModalMode = null;
      },
      error: (error) => {
        this.reviewModalError = error?.error?.message || 'reviewSaveError';
      },
    });
  }

  async deleteReview(): Promise<void> {
    const booking = this.reviewBooking;
    const reviewId = booking?.reviewEligibility?.reviewId;
    if (!booking || !reviewId || this.isDeletingReview) return;
    const confirmation = await Swal.fire({
      icon: 'warning',
      title: this.translate.instant('deleteReviewConfirmTitle'),
      text: this.translate.instant('deleteReviewConfirmMessage'),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('deleteReview'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#e11d48',
    });
    if (!confirmation.isConfirmed) return;

    this.isDeletingReview = true;
    this.reviewModalError = '';
    this.apiService.delete('Reviews', reviewId).pipe(
      finalize(() => {
        this.isDeletingReview = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: (response) => {
        if (response?.isSuccess === false) {
          this.reviewModalError = response.message || 'reviewDeleteError';
          return;
        }
        booking.reviewEligibility = {
          canReview: true,
          alreadyReviewed: false,
          message: 'ReviewAllowed',
        };
        this.reviewBooking = null;
        this.reviewModalMode = null;
      },
      error: (error) => {
        this.reviewModalError = error?.error?.message || 'reviewDeleteError';
      },
    });
  }

  private loadReviewEligibility(): void {
    const requests = this.bookings.map((booking) =>
      this.apiService.get(`Reviews/eligibility/${booking.id}`).pipe(
        map((response: any) => response?.data as ReviewEligibility | undefined),
        catchError(() => of(undefined)),
      ),
    );
    if (!requests.length) return;

    forkJoin(requests).subscribe((eligibilities) => {
      this.bookings.forEach((booking, index) => {
        booking.reviewEligibility = eligibilities[index];
      });
      this.cdr.markForCheck();
    });
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page -= 1;
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page += 1;
    }
  }

  onPageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (value > 0) {
      this.pageSize = value;
      this.page = 1;
    }
  }
}
