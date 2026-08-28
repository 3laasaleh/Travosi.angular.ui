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
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { environment } from '../../../../environments/environment';
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';
import { TourBookingCard } from './tour-detail/tour-booking-card/tour-booking-card';
import { TourDetail } from './tour-detail/tour-detail/tour-detail';

@Component({
  selector: 'app-home-tour-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, TourDetail, TourBookingCard, ItineraryTimeline, ImageViewerModal],
  templateUrl: './tour-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTourPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  tour: any = null;
  isLoading = true;
  errorMessage = '';
  selectedImageIndex = 0;
  imageViewerOpen = false;

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
    const arabic = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
    return arabic
      ? (this.tour?.titleAr || this.tour?.nameAr || this.tour?.titleEng || this.tour?.nameEng || this.tour?.title || this.tour?.name || '')
      : (this.tour?.titleEng || this.tour?.nameEng || this.tour?.title || this.tour?.name || this.tour?.titleAr || this.tour?.nameAr || '');
  }

  get destinationName(): string {
    const arabic = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
    return arabic
      ? (this.tour?.destinationNameAr || this.tour?.destination?.nameAr || this.tour?.destinationNameEng || this.tour?.destinationName || this.tour?.destination?.nameEng || '')
      : (this.tour?.destinationNameEng || this.tour?.destinationName || this.tour?.destination?.nameEng || this.tour?.destinationNameAr || this.tour?.destination?.nameAr || '');
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((tourId) => {
        if (!Number.isFinite(tourId) || tourId <= 0) {
          this.tour = null;
          this.isLoading = false;
          this.errorMessage = 'tourNotFound';
          this.cdr.markForCheck();
          return;
        }

        this.loadTour(tourId);
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
    const url =
      typeof source === 'string'
        ? source
        : (source?.imageUrl ?? source?.url ?? source?.path ?? '');

    if (!url) return 'assets/images/bg/3.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`;
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

  private loadTour(tourId: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tour = null;
    this.selectedImageIndex = 0;
    this.imageViewerOpen = false;

    this.tourRequest(tourId)
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
          return;
        }
        this.updateSeo(tourId);
      });
  }

  private updateSeo(tourId: number): void {
    const arabic = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
    const title = arabic
      ? (this.tour?.metaTitleAr || this.tour?.titleAr || this.tour?.metaTitleEng || this.title)
      : (this.tour?.metaTitleEng || this.tour?.titleEng || this.title);
    const description = arabic
      ? (this.tour?.metaDescriptionAr || this.tour?.descriptionAr || this.tour?.metaDescriptionEng || this.tour?.description || '')
      : (this.tour?.metaDescriptionEng || this.tour?.descriptionEng || this.tour?.description || this.tour?.fullDescription || '');
    const price = Number(this.tour?.discountedPricePerPerson ?? this.tour?.pricePerPerson ?? this.tour?.price);

  }

  private tourRequest(tourId: number): Observable<any> {
    return this.apiService.getUnauthntecated(`Tours/${tourId}`).pipe(
      map((response) => this.extractEntity(response, 'tour')),
      catchError(() =>
        this.apiService.getUnauthntecated('Tours?page=1&pageSize=100').pipe(
          map(
            (response) =>
              this.extractCollection(response, ['tours']).find(
                (tour) => Number(tour?.id ?? tour?.tourId) === Number(tourId),
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
      response && Object.prototype.hasOwnProperty.call(response, 'data')
        ? response.data
        : response;
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
}
