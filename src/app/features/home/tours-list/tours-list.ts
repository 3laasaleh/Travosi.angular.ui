import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import { formatHomePrice } from '../home-price.util';
import { isWithinDateRange, matchesSearchQuery } from '../list-search.util';

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-home-tours-list',
  standalone: true,
  imports: [RouterLink, FormsModule, TranslatePipe, HomeNavbar, FooterOne, PaginationOne, DatePicker],
  templateUrl: './tours-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeToursList implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currencyService = inject(CurrencyService);

  readonly pageSizeOptions = [10, 20, 50];
  readonly heroImage = 'assets/images/bg/cta.jpg';
  private readonly imageIndexMap = new Map<string, number>();

  tours: any[] = [];
  private allTours: any[] = [];
  isLoading = false;
  errorMessage = '';
  searchText = '';
  dateFrom = this.toDateInput(new Date());
  dateTo = this.toDateInput(this.addDays(new Date(), 7));
  dateRangeError = false;
  paginationInfo: PaginationInfo = {
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  };

  ngOnInit(): void {
    this.loadTours();
  }

  onSearchChange(value: string): void {
    this.searchText = value;
    this.applyFilters();
  }

  applyFilters(): void {
    const hasFromAndTo = !!this.dateFrom && !!this.dateTo;
    if (hasFromAndTo && this.dateTo < this.dateFrom) {
      this.dateRangeError = true;
      return;
    }

    this.dateRangeError = false;
    this.paginationInfo.page = 1;
    this.loadTours();
  }

  clearFilters(): void {
    this.searchText = '';
    this.dateFrom = this.toDateInput(new Date());
    this.dateTo = this.toDateInput(this.addDays(new Date(), 7));
    this.dateRangeError = false;
    this.paginationInfo.page = 1;
    this.loadTours();
  }

  loadTours(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const params = new URLSearchParams({
      page: String(this.paginationInfo.page),
      pageSize: String(this.paginationInfo.pageSize),
    });

    const trimmedSearch = this.searchText.trim();
    if (trimmedSearch) params.set('searchTerm', trimmedSearch);
    if (this.dateFrom) params.set('dateFrom', this.dateFrom);
    if (this.dateTo) params.set('dateTo', this.dateTo);

    this.apiService
      .getUnauthntecated(`Tours?${params.toString()}`)
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
        this.allTours = Array.isArray(rows) ? rows : [];
        this.tours = this.allTours.filter((tour) =>
          matchesSearchQuery(this.searchText, tour) && isWithinDateRange(this.dateFrom, this.dateTo, tour),
        );
        this.updatePagination(pageData, this.allTours.length);
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

  formattedPrice(tour: any): string {
    return formatHomePrice(this.currencyService, tour?.pricePerPerson ?? tour?.price, tour);
  }

  imageItems(tour: any): any[] {
    const images = Array.isArray(tour?.images) ? tour.images : [];
    if (images.length) return images;
    const fallback = tour?.coverImageUrl ?? tour?.imageUrl;
    return fallback ? [{ imageUrl: fallback }] : [];
  }

  imageUrl(tour: any): string {
    return this.imageAt(tour, 0);
  }

  imageAt(tour: any, index: number): string {
    const images = this.imageItems(tour);
    const source = images[Math.max(0, Math.min(index, images.length - 1))] ?? null;
    const url = source?.imageUrl ?? source?.url ?? source?.path ?? tour?.coverImageUrl ?? tour?.imageUrl ?? '';
    if (!url) return 'assets/images/bg/3.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  getImageIndex(key: string): number {
    return this.imageIndexMap.get(key) ?? 0;
  }

  setImageIndex(key: string, index: number, total: number): void {
    if (!total) return;
    this.imageIndexMap.set(key, ((index % total) + total) % total);
  }

  prevImage(key: string, total: number): void {
    if (!total) return;
    const current = this.getImageIndex(key);
    this.setImageIndex(key, current - 1, total);
  }

  nextImage(key: string, total: number): void {
    if (!total) return;
    const current = this.getImageIndex(key);
    this.setImageIndex(key, current + 1, total);
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

  private addDays(value: Date, days: number): Date {
    const clone = new Date(value.getTime());
    clone.setDate(clone.getDate() + days);
    return clone;
  }

  private toDateInput(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
