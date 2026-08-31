import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Observable, catchError, distinctUntilChanged, finalize, forkJoin, map, of } from 'rxjs';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { DestinationCitiesCarousel } from '../../../shared/components/destination-cities-carousel/destination-cities-carousel';
import { formatHomePrice } from '../home-price.util';
import { SeoService } from '../../../core/services/seo.service';
import { DescriptionLinks } from '../../../shared/components/description-links/description-links';

@Component({
  selector: 'app-home-destination-detail',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    HomeNavbar,
    FooterOne,
    ImageViewerModal,
    DestinationCitiesCarousel,
    DescriptionLinks,
  ],
  templateUrl: './destination-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDestinationDetail implements OnInit, AfterViewInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  destination: any = null;
  tours: any[] = [];
  cities: any[] = [];
  isLoading = true;
  errorMessage = '';
  selectedImageIndex = 0;
  imageViewerOpen = false;
  private tourCarousel: Swiper | null = null;
  private viewInitialized = false;

  get images(): any[] {
    if (Array.isArray(this.destination?.images) && this.destination.images.length) {
      return this.destination.images;
    }

    const fallback = this.destination?.coverImageUrl ?? this.destination?.imageUrl;
    return fallback ? [fallback] : [];
  }

  get resolvedImages(): string[] {
    return this.images.map((image) => this.imageUrl(image));
  }

  get isArabic(): boolean {
    return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
  }

  destinationTitle(): string {
    return this.destination?.name ?? (this.isArabic
      ? this.destination?.titleAr || this.destination?.titleEng || ''
      : this.destination?.titleEng || this.destination?.titleAr || '');
  }

  destinationShortDescription(): string {
    return this.isArabic
      ? this.destination?.subDescriptionAr ||
          this.destination?.descriptionAr ||
          this.destination?.subDescriptionEng ||
          this.destination?.subDescription ||
          ''
      : this.destination?.subDescriptionEng ||
          this.destination?.subDescription ||
          this.destination?.subDescriptionAr ||
          '';
  }

  destinationDescription(): string {
    return this.isArabic
      ? this.destination?.fullDescriptionAr ||
          this.destination?.descriptionAr ||
          this.destination?.fullDescriptionEng ||
          this.destination?.descriptionEng ||
          this.destination?.fullDescription ||
          this.destination?.description ||
          ''
      : this.destination?.fullDescriptionEng ||
          this.destination?.descriptionEng ||
          this.destination?.fullDescription ||
          this.destination?.description ||
          this.destination?.fullDescriptionAr ||
          this.destination?.descriptionAr ||
          '';
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
          this.destination = null;
          this.tours = [];
          this.cities = [];
          this.isLoading = false;
          this.errorMessage = 'destinationNotFound';
          this.seo.markNotFound('Destination not found');
          this.cdr.markForCheck();
          return;
        }

        this.loadDestination(routeName);
      });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = isPlatformBrowser(this.platformId);
    this.initializeTourCarousel();
  }

  ngOnDestroy(): void {
    this.tourCarousel?.destroy(true, true);
  }

  imageUrl(source: any, fallback = 'assets/images/bg/2.jpg'): string {
    const url =
      typeof source === 'string' ? source : (source?.imageUrl ?? source?.url ?? source?.path ?? '');

    if (!url) return fallback;
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`;
  }

  destinationImage(): string {
    return this.imageUrl(this.images[0]);
  }

  imageAlt(source: any, fallback = this.destinationTitle()): string {
    return this.seo.imageAlt(source, fallback);
  }

  selectImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    this.selectedImageIndex = index;
  }

  previousImage(): void {
    const imageCount = this.images.length;
    if (imageCount < 2) return;
    this.selectedImageIndex = (this.selectedImageIndex - 1 + imageCount) % imageCount;
  }

  nextImage(): void {
    const imageCount = this.images.length;
    if (imageCount < 2) return;
    this.selectedImageIndex = (this.selectedImageIndex + 1) % imageCount;
  }

  openImageViewer(): void {
    if (this.images.length) this.imageViewerOpen = true;
  }

  closeImageViewer(): void {
    this.imageViewerOpen = false;
  }

  tourImage(tour: any): string {
    const image = Array.isArray(tour?.images) ? tour.images[0] : null;
    return this.imageUrl(tour?.coverImageUrl ?? image ?? tour?.imageUrl, 'assets/images/bg/3.jpg');
  }

  tourTitle(tour: any): string {
    return this.isArabic
      ? tour?.titleAr ||
          tour?.nameAr ||
          tour?.titleEng ||
          tour?.nameEng ||
          tour?.title ||
          tour?.name ||
          ''
      : tour?.titleEng ||
          tour?.nameEng ||
          tour?.title ||
          tour?.name ||
          tour?.titleAr ||
          tour?.nameAr ||
          '';
  }

  tourDescription(tour: any): string {
    return this.isArabic
      ? tour?.descriptionAr ||
          tour?.fullDescriptionAr ||
          tour?.descriptionEng ||
          tour?.description ||
          ''
      : tour?.descriptionEng || tour?.description || tour?.descriptionAr || '';
  }

  formattedTourPrice(tour: any): string {
    return formatHomePrice(
      this.currencyService,
      tour?.discountedPricePerPerson ?? tour?.pricePerPerson ?? tour?.price,
      tour,
    );
  }

  tourDestinationName(tour: any): string {
    return (
      tour?.destinationName ??
      tour?.destination?.titleEng ??
      this.destination?.titleEng ??
      this.destination?.name ??
      ''
    );
  }

  private loadDestination(routeName: string): void {
    this.tourCarousel?.destroy(true, true);
    this.tourCarousel = null;
    this.isLoading = true;
    this.errorMessage = '';
    this.destination = null;
    this.tours = [];
    this.cities = [];
    this.selectedImageIndex = 0;
    this.imageViewerOpen = false;

    forkJoin({
      destination: this.destinationRequest(routeName),
      tours: this.apiService
        .getUnauthntecated('Tours?page=1&pageSize=100')
        .pipe(catchError(() => of(null))),
      cities: this.apiService
        .getUnauthntecated('Cities?page=1&pageSize=100')
        .pipe(catchError(() => of(null))),
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ destination, tours, cities }) => {
        this.destination = destination;
        if (!destination) {
          this.errorMessage = 'destinationNotFound';
          this.seo.markNotFound('Destination not found');
          return;
        }

        this.updateSeo();
        const destinationId = Number(destination.id ?? destination.destinationId);

        const apiTours = this.extractCollection(tours, ['tours']);
        const nestedTours = Array.isArray(destination?.tours) ? destination.tours : [];
        const hasDestinationIds = apiTours.some((tour) => this.resolveDestinationId(tour) !== null);
        const matchingTours = hasDestinationIds
          ? apiTours.filter(
              (tour) => Number(this.resolveDestinationId(tour)) === Number(destinationId),
            )
          : apiTours;

        this.tours = matchingTours.length ? matchingTours : nestedTours;
        this.cities = this.extractCollection(cities, ['cities'])
          .filter((city) => Number(city?.destinationId) === destinationId)
          .slice(0, 10);
        this.cdr.markForCheck();
        if (isPlatformBrowser(this.platformId)) setTimeout(() => this.initializeTourCarousel());
      });
  }

  private updateSeo(): void {
    this.seo.updateFrom(this.destination, { image: this.images[0], imageUrl: this.resolvedImages[0], schemaType: 'TouristDestination' });
  }

  private initializeTourCarousel(): void {
    if (!this.viewInitialized) return;

    this.tourCarousel?.destroy(true, true);
    this.tourCarousel = null;

    const carousel = document.querySelector('#destination-tours-carousel .swiper');
    if (!carousel || !this.tours.length) return;

    this.tourCarousel = new Swiper(carousel as HTMLElement, {
      modules: [Autoplay, Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 18,
      watchOverflow: true,
      loop: this.tours.length > 1,
      autoplay:
        this.tours.length > 1
          ? {
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false,
      navigation: {
        nextEl: '#destination-tours-carousel .tours-next',
        prevEl: '#destination-tours-carousel .tours-prev',
      },
      pagination: {
        el: '#destination-tours-carousel .tours-pagination',
        clickable: true,
      },
    });
  }

  private destinationRequest(routeName: string): Observable<any> {
    return this.apiService.getUnauthntecated(`destinations/by-route/${encodeURIComponent(routeName)}`).pipe(
      map((response) => this.extractEntity(response, 'destination')),
      catchError(() => of(null)),
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
      data?.data ??
      data?.items ??
      keys.map((key) => data?.[key]).find((value) => Array.isArray(value)) ??
      data;
    return Array.isArray(rows) ? rows : [];
  }

  private resolveDestinationId(tour: any): number | null {
    const id = tour?.destinationId ?? tour?.destination?.id ?? tour?.destination?.destinationId;
    return id === null || id === undefined || id === '' ? null : Number(id);
  }
}
