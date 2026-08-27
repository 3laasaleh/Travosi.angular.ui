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
import { LanguageService } from '../../../core/services/language.service';
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
  selector: 'app-home-destinations-list',
  standalone: true,
  imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, PaginationOne],
  templateUrl: './destinations-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDestinationsList implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

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
    return isArabic
      ? destination?.nameAr ?? destination?.nameEng ?? destination?.name ?? ''
      : destination?.nameEng ?? destination?.name ?? destination?.nameAr ?? '';
  }

  destinationDescription(destination: any): string {
    const isArabic = this.languageService.getCurrentLanguage() === 'ar';
    return isArabic
      ? (destination?.subDescriptionAr || destination?.descriptionAr || destination?.subDescriptionEng || destination?.descriptionEng || destination?.subDescription || destination?.description || '')
      : (destination?.subDescriptionEng || destination?.descriptionEng || destination?.subDescription || destination?.description || destination?.subDescriptionAr || destination?.descriptionAr || '');
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

  imageAt(destination: any, index: number): string {
    const images = this.imageItems(destination);
    const source = images[Math.max(0, Math.min(index, images.length - 1))] ?? null;
    const url = source?.imageUrl ?? source?.url ?? source?.path ?? destination?.coverImageUrl ?? destination?.imageUrl ?? '';

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
