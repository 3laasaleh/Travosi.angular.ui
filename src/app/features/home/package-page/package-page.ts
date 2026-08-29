import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable, catchError, distinctUntilChanged, finalize, map, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { environment } from '../../../../environments/environment';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { TourBookingCard } from '../tour-page/tour-detail/tour-booking-card/tour-booking-card';
import { formatHomePrice } from '../home-price.util';
import { ProductReviews } from '../../../shared/components/product-reviews/product-reviews';
import { SeoService } from '../../../core/services/seo.service';
import { DescriptionLinks } from '../../../shared/components/description-links/description-links';

@Component({
  selector: 'app-home-package-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    HomeNavbar,
    FooterOne,
    ItineraryTimeline,
    TourBookingCard,
    ImageViewerModal,
    ProductReviews,
    DescriptionLinks,
  ],
  templateUrl: './package-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePackagePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private readonly currencyService = inject(CurrencyService);
  private readonly seo = inject(SeoService);

  travelPackage: any = null;
  isLoading = true;
  errorMessage = '';
  selectedImageIndex = 0;
  imageViewerOpen = false;

  get title(): string {
    return this.travelPackage?.name ?? '';
  }

  get description(): string {
    return this.travelPackage?.description ?? '';
  }

  get images(): any[] {
    if (Array.isArray(this.travelPackage?.images) && this.travelPackage.images.length)
      return this.travelPackage.images;
    const fallback = this.travelPackage?.coverImageUrl ?? this.travelPackage?.imageUrl;
    return fallback ? [fallback] : [];
  }

  get resolvedImages(): string[] {
    return this.images.map((image) => this.imageUrl(image));
  }

  get itinerary(): any[] {
    const value =
      this.travelPackage?.itinerary ??
      this.travelPackage?.itineraries ??
      this.travelPackage?.packageItinerary;
    return Array.isArray(value) ? value : [];
  }

  get highlights(): any[] {
    return Array.isArray(this.travelPackage?.highlights) ? this.travelPackage.highlights : [];
  }

  get includes(): any[] {
    return Array.isArray(this.travelPackage?.includes) ? this.travelPackage.includes : [];
  }

  get includedItems(): any[] {
    return this.includes.filter((item) => item?.isIncluded !== false);
  }

  get excludedItems(): any[] {
    const excludes = Array.isArray(this.travelPackage?.excludes) ? this.travelPackage.excludes : [];
    return excludes.length ? excludes : this.includes.filter((item) => item?.isIncluded === false);
  }

  get tours(): any[] {
    return Array.isArray(this.travelPackage?.tours) ? this.travelPackage.tours : [];
  }

  get destinationId(): number | null {
    const id =
      this.travelPackage?.destinationId ??
      this.travelPackage?.destination?.id ??
      this.travelPackage?.destinations?.[0]?.destinationId;
    const parsed = Number(id);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }

  get destinationName(): string {
    return (
      this.travelPackage?.destinationName ??
      this.travelPackage?.destination?.titleEng ??
      this.travelPackage?.destination?.name ??
      this.travelPackage?.destinations?.[0]?.destinationName ??
      ''
    );
  }

  get formattedPrice(): string {
    return formatHomePrice(
      this.currencyService,
      this.travelPackage?.discountedPricePerPerson ??
        this.travelPackage?.pricePerPerson ??
        this.travelPackage?.price,
      this.travelPackage,
    );
  }

  get formattedOriginalPrice(): string {
    return formatHomePrice(
      this.currencyService,
      this.travelPackage?.pricePerPerson ?? this.travelPackage?.price,
      this.travelPackage,
    );
  }

  get hasDiscount(): boolean {
    return this.travelPackage?.activeDiscount?.isCurrentlyActive === true;
  }

  get discountPercentage(): number {
    return Number(this.travelPackage?.activeDiscount?.percentage ?? 0);
  }

  get duration(): string {
    const days = this.travelPackage?.durationDays ?? this.travelPackage?.days;
    const duration = this.travelPackage?.duration;
    return days ? `${days}` : duration ? String(duration) : '-';
  }

  get durationHours(): number {
    return Number(this.travelPackage?.durationHours ?? 0);
  }

  get groupSize(): number {
    return Number(this.travelPackage?.maxCapacity ?? this.travelPackage?.maxSeats ?? 0);
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('routeName')?.trim() ?? ''),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((routeName) => {
        if (!routeName) {
          this.isLoading = false;
          this.errorMessage = 'packageNotFound';
          this.cdr.markForCheck();
          return;
        }
        this.loadPackage(routeName);
      });
  }

  selectImage(index: number): void {
    if (index >= 0 && index < this.images.length) this.selectedImageIndex = index;
  }

  openImageViewer(index = this.selectedImageIndex): void {
    if (!this.images.length) return;
    this.selectImage(index);
    this.imageViewerOpen = true;
  }

  closeImageViewer(): void {
    this.imageViewerOpen = false;
  }

  imageUrl(source: any): string {
    const url =
      typeof source === 'string' ? source : (source?.imageUrl ?? source?.url ?? source?.path ?? '');
    if (!url) return 'assets/images/bg/2.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url)
      .replace(/^\/+/, '')
      .replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  imageAlt(source: any, fallback = this.title): string {
    return this.seo.imageAlt(source, fallback);
  }

  itemText(item: any): string {
    return typeof item === 'string'
      ? item
      : this.translate.currentLang()?.toLowerCase().startsWith('ar')
        ? (item?.valueAr ?? item?.valueEng ?? item?.value ?? item?.text ?? item?.title ?? item?.name ?? '')
        : (item?.valueEng ?? item?.valueAr ?? item?.value ?? item?.text ?? item?.title ?? item?.name ?? '');
  }

  tourTitle(tour: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (tour?.titleAr ??
          tour?.nameAr ??
          tour?.titleEng ??
          tour?.nameEng ??
          tour?.title ??
          tour?.name ??
          '')
      : (tour?.titleEng ??
          tour?.nameEng ??
          tour?.title ??
          tour?.name ??
          tour?.titleAr ??
          tour?.nameAr ??
          '');
  }

  private loadPackage(routeName: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.travelPackage = null;
    this.selectedImageIndex = 0;
    this.imageViewerOpen = false;
    this.packageRequest(routeName)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((travelPackage) => {
        this.travelPackage = travelPackage;
        if (!travelPackage) {
          this.errorMessage = 'packageNotFound';
          return;
        }
        this.updateSeo();
      });
  }

  private updateSeo(): void {
    this.seo.updateFrom(this.travelPackage, { image: this.images[0], imageUrl: this.resolvedImages[0], schemaType: 'TouristTrip' });
  }

  private packageRequest(routeName: string): Observable<any> {
    return this.apiService.getUnauthntecated(`Packages/by-route/${encodeURIComponent(routeName)}`).pipe(
      map((response) => this.extractEntity(response, 'package')),
      catchError(() =>
        this.apiService.getUnauthntecated('Packages?page=1&pageSize=100').pipe(
          map(
            (response) =>
              this.extractCollection(response, ['packages']).find(
                (item) => String(item?.routeName ?? '').toLowerCase() === routeName.toLowerCase(),
              ) ?? null,
          ),
          catchError(() => of(null)),
        ),
      ),
    );
  }

  private extractEntity(response: any, key: string): any {
    if (response?.isSuccess === false) return null;
    const data =
      response && Object.prototype.hasOwnProperty.call(response, 'data') ? response.data : response;
    return data?.[key] ?? data;
  }

  private extractCollection(response: any, keys: string[]): any[] {
    const data = response?.data ?? response;
    const rows =
      data?.data ?? data?.items ?? keys.map((key) => data?.[key]).find(Array.isArray) ?? data;
    return Array.isArray(rows) ? rows : [];
  }
}
