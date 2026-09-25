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
import { ApiService } from '../../../core/services/apiservice.service';
import { LanguageService } from '../../../core/services/language.service';
import { UtilityService } from '../../../core/services/utilityservice';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-home-destinations-list',
  standalone: true,
  imports: [Breadcrumbs, RouterLink, TranslatePipe, HomeNavbar, FooterOne, PaginationOne],
  templateUrl: './destinations-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDestinationsList implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);
  private readonly utilityService = inject(UtilityService);

  readonly pageSizeOptions = [10, 20, 50];
  readonly heroImage = 'assets/images/bg/cta.jpg';
  private readonly imageIndexMap = new Map<string, number>();

  destinations: any[] = [];
  isLoading = false;
  errorMessage = '';
  paginationInfo: PaginationInfo = {
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  };

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService
      .getUnauthntecated(
        `destinations?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`,
      )
      .pipe(
        catchError(() => {
          this.errorMessage = 'destinationsLoadError';
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
          this.destinations = [];
          return;
        }

        const pageData = response?.data ;
        const rows = pageData?.data ;
        this.destinations = Array.isArray(rows) ? rows : [];
        
        this.updatePagination(pageData);
      });
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) {
      return;
    }

    this.paginationInfo.page = page;
    this.loadDestinations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;

    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadDestinations();
  }

  destinationName(destination: any): string {
    const isArabic = this.languageService.getCurrentLanguage() === 'ar';
    const title = destination?.title ?? '';
    const nameAr = destination?.nameAr ?? '';
    const nameEng = destination?.nameEng ?? '';
    return isArabic
      ? title || nameAr || nameEng
      : title || nameEng || nameAr;
  }

  destinationDescription(destination: any): string {
    const isArabic = this.languageService.getCurrentLanguage() === 'ar';
    const description = destination?.description ?? destination?.subDescription ?? '';
    const descriptionAr = destination?.descriptionAr ?? destination?.subDescriptionAr ?? '';
    const descriptionEng = destination?.descriptionEng ?? destination?.subDescriptionEng ?? '';
    return isArabic
      ? (description || descriptionAr || descriptionEng || '')
      : (description || descriptionEng || descriptionAr || '');
  }

  imageItems(destination: any): any[] {
    const images = Array.isArray(destination?.images) ? destination.images : [];
    if (images.length) return images;
    const fallback = destination?.coverImageUrl ?? destination?.imageUrl;
    return fallback ? [{ imageUrl: fallback }] : [];
  }

  imageUrl(destination: any): string {
    return this.imageAt(destination, 0);
  }

  onImageError(event: Event): void {
    this.utilityService.onImageError(event, 'assets/images/bg/2.jpg');
  }

  imageAt(destination: any, index: number): string {
    const images = this.imageItems(destination);
    const source = images[Math.max(0, Math.min(index, images.length - 1))] ?? null;
    const url = source?.imageUrl ?? source?.url ?? source?.path ?? destination?.coverImageUrl ?? destination?.imageUrl ?? '';
    return this.utilityService.imageUrl(url || 'assets/images/bg/2.jpg');
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

  private updatePagination(pageData: any): void {
    const totalCount = Number(pageData?.totalCount);
    const pageSize = Number(pageData?.pageSize);
    this.paginationInfo = {
      page: Number(pageData?.page ?? this.paginationInfo.page),
      pageSize,
      totalCount,
      totalPages:pageData.totalPages 
    };
  }
}
