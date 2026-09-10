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
import { UtilityService } from '../../../core/services/utilityservice';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { TourBookingCard } from '../tour-page/tour-detail/tour-booking-card/tour-booking-card';
import { ProductReviews } from '../../../shared/components/product-reviews/product-reviews';
import { SeoService } from '../../../core/services/seo.service';
import { DescriptionLinks } from '../../../shared/components/description-links/description-links';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { TourCard } from '../../../shared/components/tour-card/tour-card';

@Component({
  selector: 'app-home-package-page',
  standalone: true,
  imports: [Breadcrumbs, 
    TranslatePipe,
    HomeNavbar,
    FooterOne,
    ItineraryTimeline,
    TourBookingCard,
    ImageViewerModal,
    ProductReviews,
    DescriptionLinks,
    TourCard,
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
  private readonly utilityService = inject(UtilityService);

  travelPackage: any = null;
  isLoading = true;
  errorMessage = '';
  selectedImageIndex = 0;
  imageViewerOpen = false;

  get title(): string {
    return this.travelPackage?.name ?? '';
  }

  get description(): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? this.travelPackage?.fullDescriptionAr || this.travelPackage?.descriptionAr || this.travelPackage?.fullDescriptionEng || this.travelPackage?.descriptionEng || this.travelPackage?.fullDescription || this.travelPackage?.description || ''
      : this.travelPackage?.fullDescriptionEng || this.travelPackage?.descriptionEng || this.travelPackage?.fullDescription || this.travelPackage?.description || this.travelPackage?.fullDescriptionAr || this.travelPackage?.descriptionAr || '';
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
    return this.utilityService.formattedPrice(this.currencyService, this.travelPackage);
  }

  get formattedOriginalPrice(): string {
    return this.utilityService.formattedOriginalPrice(this.currencyService, this.travelPackage);
  }

  get hasDiscount(): boolean {
    return this.utilityService.hasDiscount(this.travelPackage);
  }

  get discountPercentage(): number {
    return this.utilityService.discountPercentage(this.travelPackage);
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
          this.seo.markNotFound('Package not found');
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
    return this.utilityService.imageUrl(source);
  }

  onImageError(event: Event): void {
    this.utilityService.onImageError(event);
  }

  imageAlt(source: any, fallback = this.title): string {
    return this.utilityService.imageAlt(source, fallback);
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
          this.seo.markNotFound('Package not found');
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
      catchError(() => of(null)),
    );
  }

  private extractEntity(response: any, key: string): any {
    if (response?.isSuccess === false) return null;
    const data =
      response && Object.prototype.hasOwnProperty.call(response, 'data') ? response.data : response;
    return data?.[key] ?? data;
  }

}
