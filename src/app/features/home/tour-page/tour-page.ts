import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable, catchError, distinctUntilChanged, finalize, map, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { UtilityService } from '../../../core/services/utilityservice';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';
import { TourBookingCard } from './tour-detail/tour-booking-card/tour-booking-card';
import { TourDetail } from './tour-detail/tour-detail/tour-detail';
import { ProductRatingSummary, ProductReviews } from '../../../shared/components/product-reviews/product-reviews';
import { SeoService } from '../../../core/services/seo.service';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { TourCard } from '../../../shared/components/tour-card/tour-card';
import { IGenericResponse } from '../../../core/models/genericReponse.model';
import { TourHomeDTO } from '../home-sections/tours-section/tours-section';
import { PaginationModel } from '../../../core/models/pagination.model';

@Component({
  selector: 'app-home-tour-page',
  standalone: true,
  imports: [Breadcrumbs, RouterLink, TranslatePipe, HomeNavbar, FooterOne, TourDetail, TourBookingCard, ItineraryTimeline, ImageViewerModal, ProductReviews, TourCard],
  templateUrl: './tour-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTourPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);
  private readonly utilityService = inject(UtilityService);

  @ViewChild('relatedToursTrack') private relatedToursTrack?: ElementRef<HTMLElement>;

  tour: any = null;
  relatedTours: any[] = [];
  isLoading = true;
  errorMessage = '';
  selectedImageIndex = 0;
  imageViewerOpen = false;
  averageRating = 0;

  get images(): any[] {
    const cover =
      this.tour?.coverImageUrl ??
      this.tour?.imageUrl ??
      this.tour?.coverImage ??
      null;
    const gallery = Array.isArray(this.tour?.images) ? this.tour.images : [];
    if (!cover) return gallery;
    const coverIndex = gallery.findIndex((image: any) => this.imageMatchesCover(image, cover));
    if (coverIndex < 0) return [cover, ...gallery];
    return [gallery[coverIndex], ...gallery.filter((_: any, index: number) => index !== coverIndex)];
  }

  get destinationId(): number | null {
    const id = this.tour?.destinationId ?? this.tour?.destination?.id;
    return id === null || id === undefined ? null : Number(id);
  }

  get resolvedImages(): string[] {
    return this.images.map((image) => this.imageUrl(image));
  }

  get itinerary(): any[] {
    const value = this.tour?.itinerary
      ?? this.tour?.Itinerary
      ?? this.tour?.itineraries
      ?? this.tour?.tourItinerary
      ?? this.tour?.itinerarySteps;
    return Array.isArray(value) ? value : [];
  }

  get title(): string {
    return this.tour?.title ?? '';
  }

  /** The brief description belongs below the gallery; the detail component keeps the full text. */
  get shortDescription(): string {
    const isArabic = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
    const description = this.tour?.description ?? '';
    const descriptionAr = this.tour?.descriptionAr ?? '';
    const descriptionEng = this.tour?.descriptionEng ?? '';
    return isArabic
      ? (description || descriptionAr || descriptionEng || '')
      : (description || descriptionEng || descriptionAr || '');
  }

  get destinationName(): string {
    return this.tour?.destinationName ?? '';
  }

  scrollRelatedTours(direction: -1 | 1): void {
    this.relatedToursTrack?.nativeElement.scrollBy({ left: direction * 320, behavior: 'smooth' });
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
          this.tour = null;
          this.isLoading = false;
          this.errorMessage = 'tourNotFound';
          this.seo.markNotFound('Tour not found');
          this.cdr.markForCheck();
          return;
        }

        this.loadTour(routeName);
      });
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

  imageAlt(source: any, fallback = this.title): string {
    return this.utilityService.imageAlt(source, fallback);
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

  private imageMatchesCover(image: any, cover: string): boolean {
    return this.normalizeImagePath(this.imageUrl(image)) === this.normalizeImagePath(cover);
  }

  private normalizeImagePath(url: string): string {
    return String(url ?? '')
      .trim()
      .replace(/\\/g, '/')
      .replace(/^https?:\/\/[^/]+\/images\//i, '')
      .replace(/^\/+/, '')
      .replace(/^images\//i, '')
      .toLowerCase();
  }

  private loadTour(routeName: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tour = null;
    this.relatedTours = [];
    this.selectedImageIndex = 0;
    this.imageViewerOpen = false;
    this.averageRating = 0;

    this.tourRequest(routeName)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((tour) => {
        this.tour = tour;
        if (!tour) {
          this.errorMessage = 'tourNotFound';
          this.seo.markNotFound('Tour not found');
          return;
        }
        this.seo.updateFrom(tour, { image: this.images[0], imageUrl: this.resolvedImages[0], schemaType: 'TouristTrip' });
        this.loadRelatedTours(tour);
      });
  }

 

  private tourRequest(routeName: string): Observable<any> {
    return this.apiService.getUnauthntecated(`Tours/by-route/${encodeURIComponent(routeName)}`).pipe(
      map((response) => this.extractEntity(response, 'tour')),
      catchError(() => of(null)),
    );
  }

  private extractEntity(response: any, key: string): any {
    if (response?.isSuccess === false) return null;
    const data =
      response && Object.prototype.hasOwnProperty.call(response, 'data')
        ? response.data
        : response;
    return data?.[key] ?? data;
  }

  private loadRelatedTours(tour: any): void {
    const destinationId = Number(tour?.destinationId ?? tour?.destination?.id);
    const tourId = Number(tour?.id ?? tour?.tourId);
    if (!Number.isInteger(destinationId) || destinationId <= 0) return;

    this.apiService.getUnauthntecated(`Tours/RelatedTours?page=1&pageSize=12&destinationId=${destinationId}`)
      .pipe(catchError(() => of(null)), takeUntilDestroyed(this.destroyRef))
      .subscribe((response:IGenericResponse<PaginationModel<TourHomeDTO>>) => {
        if (Number(this.tour?.id) !== tourId) return;
        const rows = response?.data?.data ?? response;

        this.relatedTours = (Array.isArray(rows) ? rows : [])
          .filter((item) =>  Number(item?.id ) !== tourId)
          .slice(0, 10);
        this.cdr.markForCheck();
      });
  }

}
