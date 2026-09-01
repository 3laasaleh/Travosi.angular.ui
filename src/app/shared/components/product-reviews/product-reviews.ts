import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { AuthService } from '../../../features/user/_services/auth.service';
import { environment } from '../../../../environments/environment';

interface ProductReview {
  id: number;
  comment: string;
  rating: number;
  authorName: string;
  authorImageUrl?: string | null;
  createdAtUtc: string;
}

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, TranslatePipe],
  templateUrl: './product-reviews.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReviews implements OnChanges {
  @Input({ required: true }) productType: 'tour' | 'package' = 'tour';
  @Input({ required: true }) productId: number | null | undefined;

  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly authService = inject(AuthService);

  reviews: ProductReview[] = [];
  isLoading = false;
  loadFailed = false;
  reviewBookingId: number | null = null;
  reviewComment = '';
  reviewRating = 0;
  reviewError = '';
  isSavingReview = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] || changes['productType']) this.reload();
  }

  reload(): void {
    const productId = Number(this.productId);
    if (!Number.isFinite(productId) || productId <= 0) {
      this.reviews = [];
      return;
    }

    this.isLoading = true;
    this.loadFailed = false;
    this.reviewBookingId = null;
    this.reviewError = '';
    this.apiService
      .getUnauthntecated<any>(`Reviews/${this.productType}/${productId}`)
      .pipe(
        catchError(() => {
          this.loadFailed = true;
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response) => {
        const data = response?.data ?? response;
        this.reviews = Array.isArray(data) ? data : [];
        this.loadEligibleBooking(productId);
      });
  }

  submitReview(): void {
    if (!this.reviewBookingId || !this.reviewRating || !this.reviewComment.trim()) {
      this.reviewError = 'reviewRatingAndTextRequired';
      return;
    }
    this.isSavingReview = true;
    this.reviewError = '';
    this.apiService.post('Reviews', {
      bookingId: this.reviewBookingId,
      rating: this.reviewRating,
      comment: this.reviewComment.trim(),
    }).pipe(finalize(() => { this.isSavingReview = false; this.cdr.markForCheck(); })).subscribe({
      next: (response) => {
        if (response?.isSuccess !== true) {
          this.reviewError = response?.message || 'reviewSaveError';
          return;
        }
        this.reviewComment = '';
        this.reviewRating = 0;
        this.reviewBookingId = null;
        this.reload();
      },
      error: (error) => { this.reviewError = error?.error?.message || 'reviewSaveError'; },
    });
  }

  private loadEligibleBooking(productId: number): void {
    const user = this.authService.getCurentUser();
    if (!user?.userId) return;
    this.apiService.get(`Bookings/user/${user.userId}`).pipe(
      catchError(() => of([])),
    ).subscribe((response: any) => {
      const bookings = Array.isArray(response) ? response : (response?.data ?? []);
      const matching = bookings.filter((booking: any) => {
        const id = this.productType === 'tour' ? booking.tourId ?? booking.TourId : booking.packageId ?? booking.PackageId;
        return Number(id) === productId && String(booking.statusName ?? booking.StatusName ?? '').toLowerCase() === 'completed';
      });
      if (!matching.length) return;
      forkJoin(matching.map((booking: any) => this.apiService.get(`Reviews/eligibility/${booking.id ?? booking.Id}`).pipe(catchError(() => of(null))))).subscribe((eligibilities: any) => {
        const eligible = eligibilities.find((response: any) => response?.data?.canReview === true);
        if (eligible) this.reviewBookingId = Number(eligible.data.bookingId);
        this.cdr.markForCheck();
      });
    });
  }

  authorImageUrl(source: ProductReview): string {
    const value = source.authorImageUrl;
    if (!value) return '';
    if (/^(https?:\/\/|data:|blob:)/i.test(value)) return value;
    return `${environment.imageUrl.replace(/\/+$/, '')}/${String(value).replace(/^\/+/, '').replace(/^images\//i, '')}`;
  }
}
