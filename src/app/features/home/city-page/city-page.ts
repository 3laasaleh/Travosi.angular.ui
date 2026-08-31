import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, forkJoin, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { formatHomePrice } from '../home-price.util';
import { SeoService } from '../../../core/services/seo.service';
import { DescriptionLinks } from '../../../shared/components/description-links/description-links';

@Component({
  selector: 'app-city-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, DescriptionLinks],
  templateUrl: './city-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currencyService = inject(CurrencyService);
  private readonly seo = inject(SeoService);
  destinationId = 0;
  city: any = null;
  destination: any = null;
  tours: any[] = [];
  recommendedTours: any[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('routeName')?.trim() ?? ''),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((routeName) => this.loadByRouteName(routeName));
  }

  cityName(): string {
    return this.city?.name ?? (this.isArabic
      ? (this.city?.titleAr ?? this.city?.titleEng ?? '')
      : (this.city?.titleEng ?? this.city?.titleAr ?? ''));
  }
  cityDescription(): string {
    return this.city?.description ?? (this.isArabic
      ? this.city?.descriptionAr || this.city?.descriptionEng || ''
      : this.city?.descriptionEng || this.city?.descriptionAr || '');
  }
  destinationName(): string {
    return this.isArabic
      ? (this.destination?.titleAr ?? this.destination?.titleEng ?? '')
      : (this.destination?.titleEng ?? this.destination?.titleAr ?? '');
  }
  cityImage(): string {
    return this.imageUrl(
      this.destination?.coverImageUrl ??
        this.destination?.imageUrl ??
        this.destination?.images?.[0] ??
        this.city?.coverImageUrl ??
        this.city?.imageUrl,
    );
  }
  imageUrl(source: any): string {
    const raw = typeof source === 'string' ? source : (source?.imageUrl ?? source?.url ?? '');
    return !raw
      ? 'assets/images/bg/3.jpg'
      : /^(blob:|data:|https?:\/\/)/i.test(raw)
        ? raw
        : `${environment.imageUrl}${String(raw).replace(/^\/+/, '')}`;
  }
  tourImage(tour: any): string {
    return this.imageUrl(tour?.coverImageUrl ?? tour?.images?.[0] ?? tour?.imageUrl);
  }
  tourImageAlt(tour: any): string {
    const image = tour?.images?.[0];
    return this.seo.imageAlt(image, this.tourTitle(tour));
  }
  tourTitle(tour: any): string {
    return tour?.title ?? (this.isArabic
      ? (tour?.titleAr ?? tour?.titleEng ?? '')
      : (tour?.titleEng ?? tour?.titleAr ?? ''));
  }
  formattedTourPrice(tour: any): string {
    return formatHomePrice(
      this.currencyService,
      tour?.discountedPricePerPerson ?? tour?.pricePerPerson ?? tour?.price,
      tour,
    );
  }
  get isArabic(): boolean {
    return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
  }

  private load(city: any, destinationId: number, cityId: number): void {
    this.destinationId = destinationId;
    this.isLoading = true;
    this.errorMessage = '';
    this.city = city;
    this.destination = null;
    this.tours = [];
    this.recommendedTours = [];
    if (!destinationId || !cityId) {
      this.errorMessage = 'cityNotFound';
      this.seo.markNotFound('City not found');
      this.isLoading = false;
      return;
    }
    forkJoin({
      destination: this.api
        .getUnauthntecated(`Destinations/${destinationId}`)
        .pipe(catchError(() => of(null))),
      tours: this.api
        .getUnauthntecated(
          `Tours?page=1&pageSize=10&destinationId=${destinationId}&cityId=${cityId}`,
        )
        .pipe(catchError(() => of(null))),
      recommended: this.api
        .getUnauthntecated(`Tours?page=1&pageSize=5&destinationId=${destinationId}`)
        .pipe(catchError(() => of(null))),
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((result) => {
        this.destination = this.entity(result.destination, 'destination');
        if (!this.city || Number(this.city.destinationId) !== destinationId) {
          this.errorMessage = 'cityNotFound';
          this.seo.markNotFound('City not found');
          return;
        }
        this.updateSeo(destinationId, cityId);
        this.tours = this.collection(result.tours, 'tours')
          .filter((tour) => Number(tour?.cityId) === cityId)
          .slice(0, 10);
        this.recommendedTours = this.collection(result.recommended, 'tours')
          .filter((tour) => Number(tour?.cityId) !== cityId)
          .slice(0, 5);
      });
  }

  private loadByRouteName(routeName: string): void {
    if (!routeName) {
      this.errorMessage = 'cityNotFound';
      this.isLoading = false;
      this.seo.markNotFound('City not found');
      return;
    }
    this.isLoading = true;
    this.api.getUnauthntecated(`Cities/by-route/${encodeURIComponent(routeName)}`)
      .pipe(catchError(() => of(null)), takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        const city = this.entity(response, 'city');
        const destinationId = Number(city?.destinationId);
        const cityId = Number(city?.id);
        if (!city || !destinationId || !cityId) {
          this.errorMessage = 'cityNotFound';
          this.isLoading = false;
          this.seo.markNotFound('City not found');
          this.cdr.markForCheck();
          return;
        }
        this.load(city, destinationId, cityId);
      });
  }
  private updateSeo(_destinationId: number, _cityId: number): void {
    const image = this.destination?.coverImageUrl ?? this.destination?.imageUrl ?? this.destination?.images?.[0];
    this.seo.updateFrom(this.city, { image, imageUrl: this.cityImage(), schemaType: 'City' });
  }
  private entity(response: any, key: string): any {
    const data = response?.data ?? response;
    return response?.isSuccess === false ? null : (data?.[key] ?? data);
  }
  private collection(response: any, key: string): any[] {
    const data = response?.data ?? response;
    const rows = data?.data ?? data?.items ?? data?.[key] ?? data;
    return Array.isArray(rows) ? rows : [];
  }
}
