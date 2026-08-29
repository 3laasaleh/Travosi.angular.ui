import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountTab } from '../account-tab/account-tab';
import { FooterOne } from '../../../layout/footer-one/footer-one';

import { ApiService } from '../../../core/services/apiservice.service';
import { AuthService } from '../_services/auth.service';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, map, of } from 'rxjs';

interface ReviewEligibility {
  canReview: boolean;
  alreadyReviewed: boolean;
  message: string;
}

interface UserBookingItem {
  id: number;
  tourTitle?: string;
  packageName?: string;
  createdDate: string;
  dateFrom: string;
  dateTo: string;
  numberOfTravelers: number;
  statusName: string;
  totalPrice: number;
  cancellationFeeAmount: number;
  reviewEligibility?: ReviewEligibility;
  reviewComment?: string;
  reviewError?: string;
  isSavingReview?: boolean;
}

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeNavbar, AccountTab, FooterOne, TranslatePipe],
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
    return booking.reviewEligibility?.canReview === true && !booking.isSavingReview;
  }

  submitReview(booking: UserBookingItem): void {
    const comment = booking.reviewComment?.trim() ?? '';
    booking.reviewError = '';
    if (!comment) {
      booking.reviewError = 'reviewTextRequired';
      this.cdr.markForCheck();
      return;
    }
    if (comment.length > 2000) {
      booking.reviewError = 'reviewTextTooLong';
      this.cdr.markForCheck();
      return;
    }

    booking.isSavingReview = true;
    this.apiService.post('Reviews', { bookingId: booking.id, comment }).pipe(
      finalize(() => {
        booking.isSavingReview = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: (response) => {
        if (response?.isSuccess === false) {
          booking.reviewError = response.message || 'reviewSaveError';
          return;
        }
        booking.reviewComment = '';
        booking.reviewEligibility = {
          canReview: false,
          alreadyReviewed: true,
          message: 'alreadyReviewedBooking',
        };
      },
      error: (error) => {
        booking.reviewError = error?.error?.message || 'reviewSaveError';
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
