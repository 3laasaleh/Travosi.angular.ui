import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { formatHomePrice } from '../../features/home/home-price.util';
import { CurrencyService } from './currency.service';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  _imgUrl = environment.imageUrl;
  defaultImage = 'assets/images/bg/3.jpg';
  loader = '/assets/loaders/loader.gif';

  constructor(
    private _coockiesService: CookieService,
    private readonly seo: SeoService,
  ) { }

  onImageError(event: Event, fallback = this.defaultImage): void {
    const target = event.target as HTMLImageElement | null;
    if (!target) return;
    if (target.getAttribute('data-fallback-applied') === 'true') return;

    target.setAttribute('data-fallback-applied', 'true');
    target.src = fallback;
  }

  onCityImageError(event: Event): void {
    this.onImageError(event, this.defaultImage);
  }

  onImageStartLoad(event: Event): void {
    const target = event.target as HTMLImageElement | null;
    if (!target) return;
    target.src = this.loader;
  }

  imageUrl(source: any, fallback = this.defaultImage): string {
    const raw = typeof source === 'string'
      ? source
      : (source?.imageUrl ?? source?.url ?? source?.path ?? '');

    if (!raw) return fallback;
    if (/^(blob:|data:|https?:\/\/)/i.test(raw)) return raw;

    const path = String(raw).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  imageAlt(image: any, fallbackTitle = ''): string {
    return this.seo.imageAlt(image, fallbackTitle);
  }

  formattedPrice(currencyService: CurrencyService, item: any, priceValue?: any): string {
    return formatHomePrice(
      currencyService,
      priceValue ?? item?.discountedPricePerPerson ?? item?.pricePerPerson ?? item?.price,
      item,
    );
  }

  formattedOriginalPrice(currencyService: CurrencyService, item: any): string {
    return formatHomePrice(currencyService, item?.pricePerPerson ?? item?.price, item);
  }

  hasDiscount(item: any): boolean {
    const percentage = Number(item?.activeDiscount?.percentage);
    const originalPrice = Number(item?.pricePerPerson ?? item?.price);
    const discountedPrice = Number(item?.discountedPricePerPerson);

    return item?.activeDiscount?.isCurrentlyActive === true
      && Number.isFinite(percentage)
      && percentage > 0
      && percentage < 100
      && Number.isFinite(originalPrice)
      && originalPrice > 0
      && Number.isFinite(discountedPrice)
      && discountedPrice >= 0
      && discountedPrice < originalPrice;
  }

  discountPercentage(item: any): number {
    return Number(item?.activeDiscount?.percentage ?? 0);
  }

  isArabic(translate: TranslateService): boolean {
    return (translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
  }

  getHeaders() {
    const bearer = 'Bearer ' + this._coockiesService.get('token');
    return {
      headers: new HttpHeaders({
        Authorization: bearer,
        'Content-Type': 'application/json',
      }),
    };
  }
}
