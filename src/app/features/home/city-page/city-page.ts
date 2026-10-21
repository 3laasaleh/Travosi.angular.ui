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
import { catchError, defer, distinctUntilChanged, EMPTY, finalize, forkJoin, map, of, switchMap } from 'rxjs';
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
import { cityAreaIds, selectCityTours } from './city-tours';
import { localizedEntityText } from '../../../core/services/entity-seo';

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
        switchMap(({ routeName, destinationRouteName }) => this.loadByRouteName(routeName, destinationRouteName)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  cityName(): string {
    return this.cityNameHomeResolver(this.city);
  }

  cityNameHomeResolver(city: any): string {
    return localizedEntityText(city, this.isArabic ? 'ar' : 'en', 'name', 'title');
  }

  cityDescription(): string {
    return localizedEntityText(this.city, this.isArabic ? 'ar' : 'en', 'description');
  }

  destinationName(): string {
    return this.destinationTitleHomeResolver(this.destination);
  }

  destinationTitleHomeResolver(destination: any): string {
    return localizedEntityText(destination, this.isArabic ? 'ar' : 'en', 'name', 'title');
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

  private loadByRouteName(routeName: string, destinationRouteName: string) {
    return defer(() => {
      this.breadcrumbs.setLoading(true);
      this.isLoading = true;
      this.errorMessage = '';
      this.city = null;
      this.destination = null;
      this.tours = [];
      this.recommendedTours = [];
      if (!routeName) {
        this.showLoadError(404);
        return EMPTY;
      }
      return this.api.getUnauthntecated(`Cities/by-route/${encodeURIComponent(routeName)}`).pipe(
        switchMap((response) => {
          const city = this.entity(response, 'city');
          if (!city || !Number(city.id) || !Number(city.destinationId)) {
            this.showLoadError(response?.statusCode === 404 ? 404 : 503);
            return EMPTY;
          }
          this.city = city;
          this.destinationId = Number(city.destinationId);
          return forkJoin({
            destination: this.api.getUnauthntecated(`Destinations/${this.destinationId}`).pipe(catchError(() => of(null))),
            tours: forkJoin(cityAreaIds(city).map(id => this.api
              .getUnauthntecated(`Tours?page=1&pageSize=20&cityId=${id}`)
              .pipe(catchError(() => of(null))))),
          });
        }),
        map((result) => {
          this.destination = this.entity(result.destination, 'destination');
          if (!this.destination) {
            this.showLoadError(503);
            return;
          }
          this.setDestinationBreadcrumb();
          const canonicalDestinationRouteName = String(this.destination?.routeName ?? this.destination?.RouteName ?? '').trim();
          if (canonicalDestinationRouteName && destinationRouteName.toLowerCase() !== canonicalDestinationRouteName.toLowerCase()) {
            const cityRouteName = String(this.city?.routeName ?? routeName).trim();
            void this.router.navigateByUrl(
              `/${this.isArabic ? 'ar' : 'en'}/destinations/${encodeURIComponent(canonicalDestinationRouteName)}/cities/${encodeURIComponent(cityRouteName)}`,
              { replaceUrl: true },
            );
            return;
          }
          this.updateSeo();
          const relevant = selectCityTours(result.tours.flatMap(response => this.collection(response, 'tours')), this.city);
          this.tours = relevant.slice(0, 10);
          this.recommendedTours = relevant.slice(10, 15);
        }),
        catchError((error) => {
          this.showLoadError(error?.status === 404 ? 404 : 503);
          return EMPTY;
        }),
      );
    }).pipe(finalize(() => {
      this.isLoading = false;
      this.breadcrumbs.setLoading(false);
      this.cdr.markForCheck();
    }));
  }

  private showLoadError(status: number): void {
    this.errorMessage = status === 404 ? 'cityNotFound' : 'contentTemporarilyUnavailable';
    if (status === 404) this.seo.markNotFound(this.isArabic ? 'المدينة غير موجودة' : 'City not found');
    else this.seo.markUnavailable();
  }

  private setDestinationBreadcrumb(): void {
    const name = this.destinationName();
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
  private updateSeo(): void {
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

  tourRouteLink(tour: any): string[] {
    const section = tour?.isNileCruise === true ? 'nile-cruises' : 'tours';
    const routeName = tour?.routeName;
    return [`/${this.isArabic ? 'ar' : 'en'}/${section}`, ...(routeName ? [routeName] : [])];
  }
}
