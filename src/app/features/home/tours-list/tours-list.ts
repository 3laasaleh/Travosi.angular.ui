import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/apiservice.service';
import { apiCurrencyLabel, apiPrice } from '../../../core/utils/api-price.util';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../../shared/components/listing/tour-grid/pagination-one/pagination-one';

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-home-tours-list',
  standalone: true,
  imports: [DecimalPipe, RouterLink, TranslatePipe, HomeNavbar, FooterOne, PaginationOne],
  templateUrl: './tours-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeToursList implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly pageSizeOptions = [8, 12, 24];
  readonly heroImage = 'assets/images/bg/cta.jpg';

  tours: any[] = [];
  isLoading = false;
  errorMessage = '';
  paginationInfo: PaginationInfo = {
    page: 1,
    pageSize: 12,
    totalCount: 0,
    totalPages: 1,
  };

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService
      .getUnauthntecated(`Tours?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`)
      .pipe(
        catchError(() => {
          this.errorMessage = 'toursLoadError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response: any) => {
        if (response === null) {
          this.tours = [];
          return;
        }

        const pageData = response?.data ?? response;
        const rows = pageData?.data ?? pageData?.items ?? pageData?.tours ?? pageData;
        this.tours = Array.isArray(rows) ? rows : [];
        this.updatePagination(pageData, this.tours.length);
      });
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadTours();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadTours();
  }

  tourTitle(tour: any): string {
    return tour?.titleEng ?? tour?.nameEng ?? tour?.title ?? tour?.name ?? '';
  }

  destinationName(tour: any): string {
    return tour?.destinationName ?? tour?.destination?.nameEng ?? tour?.destination?.name ?? '';
  }

  durationDays(tour: any): number | null {
    const value = Number(tour?.durationDays ?? tour?.days);
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  price(tour: any): number {
    return apiPrice(tour?.pricePerPerson ?? tour?.price);
  }

  currencyLabel(tour: any): string {
    return apiCurrencyLabel(tour);
  }

  imageUrl(tour: any): string {
    const image = Array.isArray(tour?.images) ? tour.images[0] : null;
    const url = image?.imageUrl ?? image?.url ?? image?.path ?? tour?.coverImageUrl ?? tour?.imageUrl ?? '';
    if (!url) return 'assets/images/bg/3.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private updatePagination(pageData: any, rowCount: number): void {
    const totalCount = Number(pageData?.totalCount ?? rowCount);
    const pageSize = Number(pageData?.pageSize ?? this.paginationInfo.pageSize);
    this.paginationInfo = {
      page: Number(pageData?.page ?? this.paginationInfo.page),
      pageSize,
      totalCount,
      totalPages: Math.max(1, Number(pageData?.totalPages ?? Math.ceil(totalCount / Math.max(1, pageSize)))),
    };
  }
}
