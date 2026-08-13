import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, forkJoin, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-city-page', standalone: true,
  imports: [RouterLink, TranslatePipe, DecimalPipe, HomeNavbar, FooterOne],
  templateUrl: './city-page.html', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currencyService = inject(CurrencyService);
  destinationId = 0;
  city: any = null;
  destination: any = null;
  tours: any[] = [];
  recommendedTours: any[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => ({ destinationId: Number(params.get('destinationId')), cityId: Number(params.get('cityId')) })),
      distinctUntilChanged((left, right) => left.destinationId === right.destinationId && left.cityId === right.cityId),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(({ destinationId, cityId }) => this.load(destinationId, cityId));
  }

  cityName(): string { return this.isArabic ? this.city?.nameAr ?? this.city?.nameEng ?? '' : this.city?.nameEng ?? this.city?.nameAr ?? ''; }
  destinationName(): string { return this.isArabic ? this.destination?.nameAr ?? this.destination?.nameEng ?? '' : this.destination?.nameEng ?? this.destination?.nameAr ?? ''; }
  cityImage(): string {
    return this.imageUrl(
      this.destination?.coverImageUrl ??
      this.destination?.imageUrl ??
      this.destination?.images?.[0] ??
      this.city?.coverImageUrl ??
      this.city?.imageUrl,
    );
  }
  imageUrl(source: any): string { const raw = typeof source === 'string' ? source : source?.imageUrl ?? source?.url ?? ''; return !raw ? 'assets/images/bg/3.jpg' : /^(blob:|data:|https?:\/\/)/i.test(raw) ? raw : `${environment.imageUrl}${String(raw).replace(/^\/+/, '')}`; }
  tourImage(tour: any): string { return this.imageUrl(tour?.coverImageUrl ?? tour?.images?.[0] ?? tour?.imageUrl); }
  tourTitle(tour: any): string { return this.isArabic ? tour?.titleAr ?? tour?.titleEng ?? '' : tour?.titleEng ?? tour?.titleAr ?? ''; }
  tourPrice(tour: any): number { return this.currencyService.convert(tour?.pricePerPerson ?? tour?.price, tour?.currencyId ?? tour?.currency?.id ?? 2); }
  currency(tour: any): string { return this.currencyService.displayLabel(tour?.currencyId ?? 2); }
  get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }

  private load(destinationId: number, cityId: number): void {
    this.destinationId = destinationId;
    this.isLoading = true; this.errorMessage = ''; this.city = null; this.destination = null; this.tours = []; this.recommendedTours = [];
    if (!destinationId || !cityId) { this.errorMessage = 'cityNotFound'; this.isLoading = false; return; }
    forkJoin({
      city: this.api.getUnauthntecated(`Cities/${cityId}`).pipe(catchError(() => of(null))),
      destination: this.api.getUnauthntecated(`Destinations/${destinationId}`).pipe(catchError(() => of(null))),
      tours: this.api.getUnauthntecated(`Tours?page=1&pageSize=10&destinationId=${destinationId}&cityId=${cityId}`).pipe(catchError(() => of(null))),
      recommended: this.api.getUnauthntecated(`Tours?page=1&pageSize=5&destinationId=${destinationId}`).pipe(catchError(() => of(null))),
    }).pipe(finalize(() => { this.isLoading = false; this.cdr.markForCheck(); }), takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      this.city = this.entity(result.city, 'city'); this.destination = this.entity(result.destination, 'destination');
      if (!this.city || Number(this.city.destinationId) !== destinationId) { this.errorMessage = 'cityNotFound'; return; }
      this.tours = this.collection(result.tours, 'tours').filter(tour => Number(tour?.cityId) === cityId).slice(0, 10);
      this.recommendedTours = this.collection(result.recommended, 'tours').filter(tour => Number(tour?.cityId) !== cityId).slice(0, 5);
    });
  }
  private entity(response: any, key: string): any { const data = response?.data ?? response; return response?.isSuccess === false ? null : data?.[key] ?? data; }
  private collection(response: any, key: string): any[] { const data = response?.data ?? response; const rows = data?.data ?? data?.items ?? data?.[key] ?? data; return Array.isArray(rows) ? rows : []; }
}
