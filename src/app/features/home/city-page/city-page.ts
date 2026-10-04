import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, forkJoin, map, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { SeoService } from '../../../core/services/seo.service';
import { UtilityService } from '../../../core/services/utilityservice';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { DescriptionPreview } from '../../../shared/components/description-preview/description-preview';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { TourCard } from '../../../shared/components/tour-card/tour-card';

@Component({
  selector: 'app-city-page',
  standalone: true,
  imports: [Breadcrumbs, DescriptionPreview, RouterLink, TranslatePipe, HomeNavbar, FooterOne, TourCard],
  templateUrl: './city-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currencyService = inject(CurrencyService);
  private readonly breadcrumbs = inject(BreadcrumbService);
  private readonly seo = inject(SeoService);
  private readonly utilityService = inject(UtilityService);
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
        map((params) => ({
          routeName: params.get('routeName')?.trim() ?? '',
          destinationRouteName: params.get('destinationRouteName')?.trim() ?? '',
        })),
        distinctUntilChanged((left, right) => left.routeName === right.routeName && left.destinationRouteName === right.destinationRouteName),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ routeName, destinationRouteName }) => this.loadByRouteName(routeName, destinationRouteName));
  }

  cityName(): string {
    return this.cityNameHomeResolver(this.city);
  }

  cityNameHomeResolver(city: any): string {
    return city?.name ?? '';
  }

  cityDescription(): string {
    return this.city?.description ?? '';
  }

  destinationName(): string {
    return this.destinationTitleHomeResolver(this.destination);
  }

  destinationTitleHomeResolver(destination: any): string {
    return destination?.title ?? destination?.name ?? '';
  }
  cityImage(): string {
    return this.imageUrl(
      this.city?.coverImageUrl ??
        this.city?.imageUrl ??
        this.city?.images?.[0] ??
        this.destination?.coverImageUrl ??
        this.destination?.imageUrl ??
        this.destination?.images?.[0],
    );
  }
  cityImageAlt(): string {
    return this.seo.imageAlt(this.city?.images?.[0], this.cityName());
  }
  onCityImageError(event: Event): void {
    this.utilityService.onCityImageError(event);
  }
  imageUrl(source: any): string {
    return this.utilityService.imageUrl(source);
  }
  tourImage(tour: any): string {
    return this.imageUrl(tour?.coverImageUrl ?? tour?.images?.[0] ?? tour?.imageUrl);
  }
  onTourImageError(event: Event): void {
    this.utilityService.onImageError(event);
  }
  tourImageAlt(tour: any): string {
    const image = tour?.images?.[0];
    return this.utilityService.imageAlt(image, this.tourTitle(tour));
  }
  tourTitle(tour: any): string {
    return tour?.name ?? (this.isArabic
      ? (tour?.nameAr ?? tour?.nameEng ?? '')
      : (tour?.nameEng ?? tour?.nameAr ?? ''));
  }
  formattedTourPrice(tour: any): string {
    return this.utilityService.formattedPrice(this.currencyService, tour);
  }
    formattedOriginalPrice(tour: any): string {
    return this.utilityService.formattedOriginalPrice(this.currencyService, tour);
  }
  get isArabic(): boolean {
    return this.utilityService.isArabic(this.translate);
  }

  private load(city: any, destinationId: number, cityId: number, destinationRouteName: string): void {
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
          `Tours?page=1&pageSize=10&cityId=${cityId}`,
        )
        .pipe(catchError(() => of(null))),
      recommended: this.api
        .getUnauthntecated(`Tours/RecommendedTours?page=1&pageSize=5&destinationId=${destinationId}`)
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
        this.setDestinationBreadcrumb();
        if (!this.city || Number(this.city.destinationId) !== destinationId) {
          this.errorMessage = 'cityNotFound';
          this.seo.markNotFound('City not found');
          return;
        }
        const canonicalDestinationRouteName = String(this.destination?.routeName ?? this.destination?.RouteName ?? '').trim();
        if (canonicalDestinationRouteName && destinationRouteName.toLowerCase() !== canonicalDestinationRouteName.toLowerCase()) {
          const language = this.translate.currentLang()?.toLowerCase() === 'ar' ? 'ar' : 'en';
          const cityRouteName = String(this.city?.routeName ?? this.route.snapshot.paramMap.get('routeName') ?? '').trim();
          void this.router.navigateByUrl(
            `/${language}/destinations/${encodeURIComponent(canonicalDestinationRouteName)}/cities/${encodeURIComponent(cityRouteName)}`,
            { replaceUrl: true },
          );
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

  private loadByRouteName(routeName: string, destinationRouteName: string): void {
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
        this.load(city, destinationId, cityId, destinationRouteName);
      });
  }

  private setDestinationBreadcrumb(): void {
    const name = String(this.destination?.title ?? this.destination?.name ?? '').trim();
    if (!name) {
      this.breadcrumbs.setCurrentParent(null);
      return;
    }
    const language = this.translate.currentLang()?.toLowerCase() === 'ar' ? 'ar' : 'en';
    const routeName = String(this.destination?.routeName ?? this.destination?.RouteName ?? '').trim();
    this.breadcrumbs.setCurrentParent({
      name,
      path: routeName ? `/${language}/destinations/${encodeURIComponent(routeName)}` : `/${language}/destinations`,
    });
  }
  private updateSeo(_destinationId: number, _cityId: number): void {
    const image = this.city?.coverImageUrl ?? this.city?.imageUrl ?? this.city?.images?.[0]
      ?? this.destination?.coverImageUrl ?? this.destination?.imageUrl ?? this.destination?.images?.[0];
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

  onBookNowClick(tour: any): void {
    const section = tour?.isNileCruise === true ? 'nile-cruises' : 'tours';
    const routeName = tour?.routeName;
    if (routeName) this.router.navigate([`/${section}/${routeName}`]);
  }
}
