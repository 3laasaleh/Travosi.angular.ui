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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
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
  selector: 'app-home-packages-list',
  standalone: true,
  imports: [DecimalPipe, RouterLink, TranslatePipe, HomeNavbar, FooterOne, PaginationOne],
  templateUrl: './packages-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePackagesList implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  readonly pageSizeOptions = [8, 12, 24];
  readonly heroImage = 'assets/images/bg/cta.jpg';

  packages: any[] = [];
  isLoading = false;
  errorMessage = '';
  paginationInfo: PaginationInfo = {
    page: 1,
    pageSize: 12,
    totalCount: 0,
    totalPages: 1,
  };

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService
      .getUnauthntecated(
        `Packages?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`,
      )
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
        this.packages = Array.isArray(rows) ? rows : [];

        const totalCount = Number(pageData?.totalCount ?? this.packages.length);
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
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (item?.nameAr ?? item?.titleAr ?? item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? '')
      : (item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? item?.nameAr ?? item?.titleAr ?? '');
  }

  packageDescription(item: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (item?.descriptionAr ?? item?.subDescriptionAr ?? item?.description ?? item?.subDescription ?? '')
      : (item?.descriptionEng ?? item?.subDescriptionEng ?? item?.description ?? item?.subDescription ?? '');
  }

  destinationName(item: any): string {
    return item?.destinationName ?? item?.destination?.nameEng ?? item?.destination?.name ?? '';
  }

  durationDays(item: any): number | null {
    const value = Number(item?.durationDays ?? item?.days);
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  price(item: any): number {
    return apiPrice(item?.pricePerPerson ?? item?.price);
  }

  currencySymbol(item: any): string {
    return apiCurrencyLabel(item.currencyId ?? item?.currency?.id ?? 2);
  }

  imageUrl(item: any): string {
    const image = Array.isArray(item?.images) ? item.images[0] : null;
    const url =
      image?.imageUrl ??
      image?.url ??
      image?.path ??
      item?.coverImageUrl ??
      item?.imageUrl ??
      '';

    if (!url) return 'assets/images/bg/2.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;

    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }
}
