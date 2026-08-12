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
import { TranslatePipe } from '@ngx-translate/core';
import { Observable, catchError, distinctUntilChanged, finalize, forkJoin, map, of } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../../../../../core/services/apiservice.service';
import { apiCurrencyLabel, apiPrice } from '../../../../../core/utils/api-price.util';
import { FooterOne } from '../../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../../layout/home-navbar/home-navbar';
import { ImageViewerModal } from '../../../../../shared/components/image-viewer-modal/image-viewer-modal';
import { DestinationCitiesCarousel } from '../../../../../shared/components/destination-cities-carousel/destination-cities-carousel';
import { DestinationCitiesGrid } from '../../../../../shared/components/destination-cities-grid/destination-cities-grid';

@Component({
  selector: 'app-home-destination-detail',
  standalone: true,
  imports: [RouterLink, TranslatePipe, DecimalPipe, HomeNavbar, FooterOne, ImageViewerModal, DestinationCitiesCarousel, DestinationCitiesGrid],
  templateUrl: './destination-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDestinationDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  destination: any = null;
  tours: any[] = [];
  cities: any[] = [];
  cityViewMode: 'carousel' | 'grid' = 'carousel';
  isLoading = true;
  errorMessage = '';
  selectedImageIndex = 0;
  imageViewerOpen = false;

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

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((destinationId) => {
        if (!Number.isFinite(destinationId) || destinationId <= 0) {
          this.destination = null;
          this.tours = [];
          this.cities = [];
          this.isLoading = false;
          this.errorMessage = 'destinationNotFound';
          this.cdr.markForCheck();
          return;
        }

        this.loadDestination(destinationId);
      });
  }

  imageUrl(source: any, fallback = 'assets/images/bg/2.jpg'): string {
    const url =
      typeof source === 'string'
        ? source
        : (source?.imageUrl ?? source?.url ?? source?.path ?? '');

    if (!url) return fallback;
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`;
  }

  destinationImage(): string {
    return this.imageUrl(this.images[0]);
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
    return this.imageUrl(
      tour?.coverImageUrl ?? image ?? tour?.imageUrl,
      'assets/images/bg/3.jpg',
    );
  }

  tourTitle(tour: any): string {
    return tour?.titleEng ?? tour?.nameEng ?? tour?.title ?? tour?.name ?? '';
  }

  tourPrice(tour: any): number {
    return apiPrice(tour?.pricePerPerson ?? tour?.price);
  }

  tourCurrencySymbol(tour: any): string {
    return apiCurrencyLabel(tour.currencyId ?? tour?.currency?.id ?? 2);
  }

  tourDestinationName(tour: any): string {
    return (
      tour?.destinationName ??
      tour?.destination?.nameEng ??
      this.destination?.nameEng ??
      this.destination?.name ??
      ''
    );
  }

  setCityViewMode(viewMode: 'carousel' | 'grid'): void {
    this.cityViewMode = viewMode;
  }

  private loadDestination(destinationId: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.destination = null;
    this.tours = [];
    this.cities = [];
    this.selectedImageIndex = 0;
    this.imageViewerOpen = false;

    forkJoin({
      destination: this.destinationRequest(destinationId),
      tours: this.apiService
        .getUnauthntecated(`Tours?page=1&pageSize=100&destinationId=${destinationId}`)
        .pipe(catchError(() => of(null))),
      cities: this.apiService
        .getUnauthntecated(`Cities?destinationId=${destinationId}&page=1&pageSize=10`)
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
          return;
        }

        const apiTours = this.extractCollection(tours, ['tours']);
        const nestedTours = Array.isArray(destination?.tours) ? destination.tours : [];
        const hasDestinationIds = apiTours.some(
          (tour) => this.resolveDestinationId(tour) !== null,
        );
        const matchingTours = hasDestinationIds
          ? apiTours.filter(
              (tour) => Number(this.resolveDestinationId(tour)) === Number(destinationId),
            )
          : apiTours;

        this.tours = matchingTours.length ? matchingTours : nestedTours;
        this.cities = this.extractCollection(cities, ['cities']).slice(0, 10);
      });
  }

  private destinationRequest(destinationId: number): Observable<any> {
    return this.apiService.getUnauthntecated(`destinations/${destinationId}`).pipe(
      map((response) => this.extractEntity(response, 'destination')),
      catchError(() =>
        this.apiService.getUnauthntecated('destinations?page=1&pageSize=100').pipe(
          map((response) =>
            this.extractCollection(response, ['destinations']).find(
              (destination) =>
                Number(destination?.id ?? destination?.destinationId) === Number(destinationId),
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

  private resolveDestinationId(tour: any): number | null {
    const id = tour?.destinationId ?? tour?.destination?.id ?? tour?.destination?.destinationId;
    return id === null || id === undefined || id === '' ? null : Number(id);
  }
}
