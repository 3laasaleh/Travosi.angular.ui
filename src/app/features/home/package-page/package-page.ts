import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
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
import { ProductRatingSummary, ProductReviews } from '../../../shared/components/product-reviews/product-reviews';
import { SeoService } from '../../../core/services/seo.service';
import { DescriptionPreview } from '../../../shared/components/description-preview/description-preview';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { TourCard } from '../../../shared/components/tour-card/tour-card';

@Component({
  selector: 'app-home-package-page',
  standalone: true,
  imports: [Breadcrumbs, DecimalPipe, RouterLink,
    TranslatePipe,
    HomeNavbar,
    FooterOne,
    ItineraryTimeline,
    TourBookingCard,
    ImageViewerModal,
    ProductReviews,
    DescriptionPreview,
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
  averageRating = 0;
  benefitTime(value: unknown): string {
    const time = String(value ?? '').trim();
    return /^\d{2}:\d{2}/.test(time) ? time.slice(0, 5) : '-';
  }

  get title(): string {
    return this.travelPackage?.name ?? '';
  }

  get packageSoldOut(): boolean {
    if (this.travelPackage?.isSoldOut === true) return true;
    const capacity = Number(this.travelPackage?.maxCapacity ?? 0);
    return capacity > 0 && Number(this.travelPackage?.seatsAvailable ?? capacity) <= 0;
  }

  get packageExpired(): boolean {
    if (this.travelPackage?.isExpired === true) return true;
    const start = String(this.travelPackage?.dateFrom ?? '').slice(0, 10);
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60_000;
    const today = new Date(now.getTime() - offset).toISOString().slice(0, 10);
    return Boolean(start && start < today);
  }

  get description(): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    const fullDescription = this.travelPackage?.fullDescription ?? '';
    const description = this.travelPackage?.description ?? '';
    const fullDescriptionAr = this.travelPackage?.fullDescriptionAr ?? '';
    const descriptionAr = this.travelPackage?.descriptionAr ?? '';
    const fullDescriptionEng = this.travelPackage?.fullDescriptionEng ?? '';
    const descriptionEng = this.travelPackage?.descriptionEng ?? '';

    return arabic
      ? (fullDescription || description || fullDescriptionAr || descriptionAr || fullDescriptionEng || descriptionEng || '')
      : (fullDescription || description || fullDescriptionEng || descriptionEng || fullDescriptionAr || descriptionAr || '');
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
    const destination = this.travelPackage?.destination ?? this.travelPackage?.destinations?.[0] ?? null;
    const title = destination?.title ?? destination?.name ?? '';
    const nameEng = destination?.nameEng ?? '';
    const nameAr = destination?.nameAr ?? '';
    const currentLanguage = this.translate.currentLang()?.toLowerCase() ?? '';
    return this.travelPackage?.destinationName
      ?? (currentLanguage.startsWith('ar') ? (title || nameAr || nameEng) : (title || nameEng || nameAr))
      ?? '';
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
    return this.durationDays > 0 ? `${this.durationDays}` : '-';
  }

  get durationDays(): number {
    return this.durationNumber(
      this.travelPackage?.durationDays ?? this.travelPackage?.days ?? this.travelPackage?.duration,
    );
  }

  get durationHours(): number {
    return this.durationNumber(this.travelPackage?.durationHours);
  }

  private durationNumber(value: unknown): number {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  get groupSize(): number {
    return Number(this.travelPackage?.maxCapacity ?? this.travelPackage?.maxSeats ?? 0);
  }

  get languages(): string {
    const facilityLanguages = this.languageFacilities
      .map((facility) => this.localizedFacilityName(facility))
      .filter(Boolean);
    const directLanguages = this.toValues(this.travelPackage?.languages ?? this.travelPackage?.language);
    const values = facilityLanguages.length ? facilityLanguages : directLanguages;
    return [...new Set(values)].join(', ') || this.translate.instant('languageEnglish');
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

  updateRatingSummary(summary: ProductRatingSummary): void {
    this.averageRating = summary.average;
  }

  ratingStarIcon(star: number): string {
    const fill = this.averageRating - star + 1;
    if (fill >= 0.75) return 'mdi-star';
    if (fill >= 0.25) return 'mdi-star-half-full';
    return 'mdi-star-outline';
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

  private get languageFacilities(): any[] {
    const facilities = this.toArray(
      this.travelPackage?.languageFacilities
      ?? this.travelPackage?.facilities
      ?? this.travelPackage?.packageFacilities
      ?? this.travelPackage?.amenities,
    );
    return facilities.filter((facility) => this.isLanguageFacility(facility));
  }

  private isLanguageFacility(facility: any): boolean {
    if (facility?.isLanguage === true || facility?.isLanguageFacility === true) return true;
    const category = [
      facility?.facilityCategoryName,
      facility?.facilityCategoryNameEng,
      facility?.facilityCategoryNameAr,
      facility?.categoryName,
      facility?.category,
      facility?.facilityCategory?.name,
      facility?.facilityCategory?.nameEng,
      facility?.facilityCategory?.nameAr,
    ].filter(Boolean).join(' ').toLowerCase();
    if (/language|languages|spoken|guide language|لغة/.test(category)) return true;

    const name = this.localizedFacilityName(facility).toLowerCase();
    return /^(english|arabic|french|german|italian|spanish|russian|chinese|japanese|turkish|portuguese|dutch|polish|korean|hindi|urdu|العربية|الإنجليزية)/.test(name);
  }

  private localizedFacilityName(facility: any): string {
    if (typeof facility === 'string') return facility.trim();
    const source = facility?.facility ?? facility;
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    const value = arabic
      ? source?.nameAr ?? source?.nameEng ?? source?.name ?? source?.facilityNameAr ?? source?.facilityNameEng ?? source?.facilityName
      : source?.nameEng ?? source?.nameAr ?? source?.name ?? source?.facilityNameEng ?? source?.facilityNameAr ?? source?.facilityName;
    return typeof value === 'string' ? value.trim() : '';
  }

  private toValues(value: unknown): string[] {
    return this.toArray(value)
      .map((item) => this.localizedFacilityName(item))
      .filter(Boolean);
  }

  private toArray(value: unknown): any[] {
    return Array.isArray(value) ? value : value == null ? [] : [value];
  }

  tourTitle(tour: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    const title = tour?.name ?? '';
    const nameAr = tour?.nameAr  ?? '';
    const nameEng = tour?.nameEng  ?? '';
    return arabic ? (title || nameAr || nameEng) : (title || nameEng || nameAr);
  }

  roomLink(room: any): string[] | null {
    const hotelRouteName = String(room?.hotelRouteName ?? '').trim();
    const roomRouteName = String(room?.roomRouteName ?? '').trim();
    const language = this.translate.currentLang()?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    return hotelRouteName && roomRouteName
      ? ['/', language, 'hotels', hotelRouteName, 'rooms', roomRouteName]
      : null;
  }

  private loadPackage(routeName: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.travelPackage = null;
    this.selectedImageIndex = 0;
    this.imageViewerOpen = false;
    this.averageRating = 0;
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
