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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
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
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-home-packages-list',
  standalone: true,
  imports: [Breadcrumbs, RouterLink, FormsModule, TranslatePipe, HomeNavbar, FooterOne, PaginationOne, DatePicker],
  templateUrl: './packages-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePackagesList implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly currencyService = inject(CurrencyService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  readonly pageSizeOptions = [10, 20, 50];
  readonly heroImage = 'assets/images/bg/cta.jpg';
  private readonly imageIndexMap = new Map<string, number>();

  packages: any[] = [];
  private allPackages: any[] = [];
  isLoading = false;
  errorMessage = '';
  searchText = '';
  dateFrom = '';
  dateTo = '';
  dateRangeError = false;
  private appliedSearchText = '';
  private appliedDateFrom = '';
  private appliedDateTo = '';
  paginationInfo: PaginationInfo = {
    page: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 1,
  };

  ngOnInit(): void {
    this.loadPackages();
  }

  get searchSuggestions(): string[] {
    const values = this.allPackages.flatMap((item) => [
      this.packageTitle(item),
      this.destinationName(item),
    ]);
    return [...new Set(values.map((value) => value.trim()).filter(Boolean))].slice(0, 20);
  }

  applyFilters(): void {
    const hasFromAndTo = !!this.dateFrom && !!this.dateTo;
    if (hasFromAndTo && this.dateTo < this.dateFrom) {
      this.dateRangeError = true;
      return;
    }

    this.dateRangeError = false;
    this.appliedSearchText = this.searchText.trim();
    this.appliedDateFrom = this.dateFrom;
    this.appliedDateTo = this.dateTo;
    this.paginationInfo.page = 1;
    this.loadPackages();
  }

  clearFilters(): void {
    this.searchText = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.appliedSearchText = '';
    this.appliedDateFrom = '';
    this.appliedDateTo = '';
    this.dateRangeError = false;
    this.paginationInfo.page = 1;
    this.loadPackages();
  }

  loadPackages(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const params = new URLSearchParams({
      page: String(this.paginationInfo.page),
      pageSize: String(this.paginationInfo.pageSize),
    });

    if (this.appliedSearchText) params.set('searchTerm', this.appliedSearchText);
    if (this.appliedDateFrom) params.set('dateFrom', this.appliedDateFrom);
    if (this.appliedDateTo) params.set('dateTo', this.appliedDateTo);

    this.apiService
      .getUnauthntecated(`Packages?${params.toString()}`)
      .pipe(
        catchError(() => {
          this.errorMessage = 'packagesLoadError';
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
          this.packages = [];
          return;
        }

        const pageData = response?.data ?? response;
        const rows = pageData?.data ?? pageData?.items ?? pageData?.packages ?? pageData;
        this.allPackages = Array.isArray(rows) ? rows : [];
        this.packages = this.allPackages.filter((item) =>
          matchesSearchQuery(this.appliedSearchText, item)
          && isWithinDateRange(this.appliedDateFrom, this.appliedDateTo, item),
        );

        const totalCount = Number(pageData?.totalCount ?? this.allPackages.length);
        const pageSize = Number(pageData?.pageSize ?? this.paginationInfo.pageSize);
        this.paginationInfo = {
          page: Number(pageData?.page ?? this.paginationInfo.page),
          pageSize,
          totalCount,
          totalPages: Math.max(
            1,
            Number(pageData?.totalPages ?? Math.ceil(totalCount / Math.max(1, pageSize))),
          ),
        };
      });
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) {
      return;
    }

    this.paginationInfo.page = page;
    this.loadPackages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;

    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadPackages();
  }

  packageTitle(item: any): string {
    return item?.name ?? '';
  }

  packageDescription(item: any): string {
    return item?.description ?? '';
  }

  destinationName(item: any): string {
    return item?.destinationName ?? item?.destination?.titleEng ?? item?.destination?.title ?? '';
  }

  durationDays(item: any): number | null {
    const value = Number(item?.durationDays ?? item?.days);
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  formattedPrice(item: any): string {
    return formatHomePrice(this.currencyService, item?.discountedPricePerPerson ?? item?.pricePerPerson ?? item?.price, item);
  }

  formattedOriginalPrice(item: any): string {
    return formatHomePrice(this.currencyService, item?.pricePerPerson ?? item?.price, item);
  }

  imageItems(item: any): any[] {
    const images = Array.isArray(item?.images) ? item.images : [];
    if (images.length) return images;
    const fallback = item?.coverImageUrl ?? item?.imageUrl;
    return fallback ? [{ imageUrl: fallback }] : [];
  }

  imageUrl(item: any): string {
    return this.imageAt(item, 0);
  }

  imageAt(item: any, index: number): string {
    const images = this.imageItems(item);
    const source = images[Math.max(0, Math.min(index, images.length - 1))] ?? null;
    const url = source?.imageUrl ?? source?.url ?? source?.path ?? item?.coverImageUrl ?? item?.imageUrl ?? '';

    if (!url) return 'assets/images/bg/2.jpg';
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

}
