import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { environment } from '../../../../environments/environment';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-tours-section',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tours-section.html',
})
export class ToursSection implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly currencyService = inject(CurrencyService);

  tours: any[] = [];
  isLoading = false;
  isLoadingMore = false;
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 20, totalCount: 0, totalPages: 1 };

  get hasMore(): boolean {
    return this.paginationInfo.page < this.paginationInfo.totalPages;
  }

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.isLoading = this.paginationInfo.page === 1;
    this.isLoadingMore = this.paginationInfo.page > 1;
    this.apiService.getUnauthntecated(`Tours?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(
      catchError(() => of(null)),
      finalize(() => {
        this.isLoading = false;
        this.isLoadingMore = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.tours ?? pageData;
      const newItems = Array.isArray(rows) ? rows : [];
      this.tours = this.paginationInfo.page === 1 ? newItems : [...this.tours, ...newItems];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.tours.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
      };
    });
  }

  showMore(): void {
    if (!this.hasMore || this.isLoadingMore) return;
    this.paginationInfo.page++;
    this.loadTours();
  }

  imageUrl(item: any): string {
    const image = Array.isArray(item?.images) ? item.images[0] : null;
    const url = image?.imageUrl ?? image?.url ?? item?.imageUrl ?? '';
    if (!url) return 'assets/images/bg/3.jpg';
    return url.startsWith('http') ? url : environment.imageUrl + url;
  }
}
