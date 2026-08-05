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
import { apiCurrencyLabel, apiPrice } from '../../../core/utils/api-price.util';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { environment } from '../../../../environments/environment';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';
import { TourBookingCard } from '../tour-page/tour-detail/tour-booking-card/tour-booking-card';

@Component({
  selector: 'app-home-package-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, DecimalPipe, HomeNavbar, FooterOne, ItineraryTimeline, TourBookingCard],
  templateUrl: './package-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePackagePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  travelPackage: any = null;
  isLoading = true;
  errorMessage = '';
  selectedImageIndex = 0;

  get title(): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (this.travelPackage?.nameAr ?? this.travelPackage?.titleAr ?? this.travelPackage?.nameEng ?? this.travelPackage?.titleEng ?? this.travelPackage?.name ?? this.travelPackage?.title ?? '')
      : (this.travelPackage?.nameEng ?? this.travelPackage?.titleEng ?? this.travelPackage?.name ?? this.travelPackage?.title ?? this.travelPackage?.nameAr ?? this.travelPackage?.titleAr ?? '');
  }

  get description(): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (this.travelPackage?.descriptionAr ?? this.travelPackage?.fullDescriptionAr ?? this.travelPackage?.description ?? this.travelPackage?.fullDescription ?? this.travelPackage?.subDescription ?? '')
      : (this.travelPackage?.descriptionEng ?? this.travelPackage?.fullDescriptionEng ?? this.travelPackage?.fullDescription ?? this.travelPackage?.description ?? this.travelPackage?.subDescription ?? '');
  }

  get images(): any[] {
    if (Array.isArray(this.travelPackage?.images) && this.travelPackage.images.length) return this.travelPackage.images;
    const fallback = this.travelPackage?.coverImageUrl ?? this.travelPackage?.imageUrl;
    return fallback ? [fallback] : [];
  }

  get itinerary(): any[] {
    const value = this.travelPackage?.itinerary ?? this.travelPackage?.itineraries ?? this.travelPackage?.packageItinerary;
    return Array.isArray(value) ? value : [];
  }

  get highlights(): any[] {
    return Array.isArray(this.travelPackage?.highlights) ? this.travelPackage.highlights : [];
  }

  get includes(): any[] {
    return Array.isArray(this.travelPackage?.includes) ? this.travelPackage.includes : [];
  }

  get tours(): any[] {
    return Array.isArray(this.travelPackage?.tours) ? this.travelPackage.tours : [];
  }

  get destinationId(): number | null {
    const id = this.travelPackage?.destinationId ?? this.travelPackage?.destination?.id;
    const parsed = Number(id);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }

  get destinationName(): string {
    return this.travelPackage?.destinationName ?? this.travelPackage?.destination?.nameEng ?? this.travelPackage?.destination?.name ?? '';
  }

  get price(): number {
    return apiPrice(this.travelPackage?.pricePerPerson ?? this.travelPackage?.price);
  }

  get currencySymbol(): string {
    return apiCurrencyLabel(this.travelPackage.currencyId ?? this.travelPackage?.currency?.id ?? 2);
  }

  get duration(): string {
    const days = this.travelPackage?.durationDays ?? this.travelPackage?.days;
    const duration = this.travelPackage?.duration;
    return days ? `${days}` : (duration ? String(duration) : '-');
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((packageId) => {
      if (!Number.isFinite(packageId) || packageId <= 0) {
        this.isLoading = false;
        this.errorMessage = 'packageNotFound';
        this.cdr.markForCheck();
        return;
      }
      this.loadPackage(packageId);
    });
  }

  selectImage(index: number): void {
    if (index >= 0 && index < this.images.length) this.selectedImageIndex = index;
  }

  imageUrl(source: any): string {
    const url = typeof source === 'string' ? source : (source?.imageUrl ?? source?.url ?? source?.path ?? '');
    if (!url) return 'assets/images/bg/2.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  itemText(item: any): string {
    return typeof item === 'string' ? item : (item?.text ?? item?.title ?? item?.name ?? '');
  }

  tourTitle(tour: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (tour?.titleAr ?? tour?.nameAr ?? tour?.titleEng ?? tour?.nameEng ?? tour?.title ?? tour?.name ?? '')
      : (tour?.titleEng ?? tour?.nameEng ?? tour?.title ?? tour?.name ?? tour?.titleAr ?? tour?.nameAr ?? '');
  }

  private loadPackage(packageId: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.travelPackage = null;
    this.selectedImageIndex = 0;
    this.packageRequest(packageId).pipe(
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((travelPackage) => {
      this.travelPackage = travelPackage;
      if (!travelPackage) this.errorMessage = 'packageNotFound';
    });
  }

  private packageRequest(packageId: number): Observable<any> {
    return this.apiService.getUnauthntecated(`Packages/${packageId}`).pipe(
      map((response) => this.extractEntity(response, 'package')),
      catchError(() => this.apiService.getUnauthntecated('Packages?page=1&pageSize=100').pipe(
        map((response) => this.extractCollection(response, ['packages']).find(
          (item) => Number(item?.id ?? item?.packageId) === packageId,
        ) ?? null),
        catchError(() => of(null)),
      )),
    );
  }

  private extractEntity(response: any, key: string): any {
    if (response?.isSuccess === false) return null;
    const data = response && Object.prototype.hasOwnProperty.call(response, 'data') ? response.data : response;
    return data?.[key] ?? data;
  }

  private extractCollection(response: any, keys: string[]): any[] {
    const data = response?.data ?? response;
    const rows = data?.data ?? data?.items ?? keys.map((key) => data?.[key]).find(Array.isArray) ?? data;
    return Array.isArray(rows) ? rows : [];
  }
}
