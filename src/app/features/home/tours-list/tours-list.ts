import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { CatalogSearchForm, CatalogTravelers } from '../../../shared/components/catalog-search-form/catalog-search-form';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import { isWithinDateRange, matchesSearchQuery } from '../list-search.util';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { TourCard } from '../../../shared/components/tour-card/tour-card';

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-home-tours-list',
  standalone: true,
  imports: [Breadcrumbs, FormsModule, TranslatePipe, HomeNavbar, FooterOne, PaginationOne, TourCard, CatalogSearchForm],
  templateUrl: './tours-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeToursList implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);

  readonly pageSizeOptions = [10, 20, 50];
  readonly heroImage = 'assets/images/bg/cta.jpg';
  readonly nileCruisesOnly = this.route.snapshot.data['nileCruisesOnly'] === true;
  readonly cityId = this.parsePositiveId(this.route.snapshot.queryParamMap.get('cityId'));

  tours: any[] = [];
  private allTours: any[] = [];
  isLoading = false;
  errorMessage = '';
  searchText = '';
  dateFrom = '';
  dateTo = '';
  dateRangeError = false;
  readonly travelers = signal<CatalogTravelers>({ adults: 1, children: 0, infants: 0 });

  get bookingSelection() {
    return { ...this.travelers(), dateFrom: this.dateFrom, dateTo: this.dateTo };
  }
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
    this.loadTours();
  }

  get pageTitleKey(): string { return this.nileCruisesOnly ? 'nileCruises' : 'tours'; }
  get emptyMessageKey(): string { return this.nileCruisesOnly ? 'noNileCruisesFound' : 'noToursFound'; }

  get searchSuggestions(): string[] {
    const values = this.allTours.flatMap((tour) => [
      this.tourTitle(tour),
      this.destinationName(tour),
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
    this.loadTours();
  }

  clearFilters(): void {
    this.travelers.set({ adults: 1, children: 0, infants: 0 });
    this.searchText = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.appliedSearchText = '';
    this.appliedDateFrom = '';
    this.appliedDateTo = '';
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

    if (this.appliedSearchText) params.set('searchTerm', this.appliedSearchText);
    if (this.appliedDateFrom) params.set('dateFrom', this.appliedDateFrom);
    if (this.appliedDateTo) params.set('dateTo', this.appliedDateTo);
    if (this.cityId) params.set('cityId', String(this.cityId));
    if (this.nileCruisesOnly) params.set('isNileCruise', 'true');

    this.apiService
      .getUnauthntecated(`Tours?${params.toString()}`)
      .pipe(
        catchError(() => {
          this.errorMessage = this.nileCruisesOnly ? 'nileCruisesLoadError' : 'toursLoadError';
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
          matchesSearchQuery(this.appliedSearchText, tour)
          && isWithinDateRange(this.appliedDateFrom, this.appliedDateTo, tour),
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
    return tour?.title ?? tour?.name ?? '';
  }

  private get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }

  destinationName(tour: any): string {
    return tour?.destinationName ?? tour?.destination?.title ?? tour?.destination?.name ?? '';
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

  private parsePositiveId(value: string | null): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

}
