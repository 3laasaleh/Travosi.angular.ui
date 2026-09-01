import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

interface ProductReview {
  id: number;
  comment: string;
  rating: number;
  authorName: string;
  createdAtUtc: string;
}

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, DatePipe, TranslatePipe],
  templateUrl: './product-reviews.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReviews implements OnChanges {
  @Input({ required: true }) productType: 'tour' | 'package' = 'tour';
  @Input({ required: true }) productId: number | null | undefined;

  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  reviews: ProductReview[] = [];
  isLoading = false;
  loadFailed = false;

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
      });
  }
}
