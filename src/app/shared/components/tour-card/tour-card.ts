import { Title } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { CurrencyService } from '../../../core/services/currency.service';
import { SeoService } from '../../../core/services/seo.service';
import { formatHomePrice } from '../../../features/home/home-price.util';
import type { TourHomeDTO } from '../../../features/home/home-sections/tours-section/tours-section';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './tour-card.html',
  host: { class: 'block h-full min-w-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourCard {
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);

  @Input({ required: true }) tour: TourHomeDTO|null=null;
  @Input() compact = false;

  get routeLink(): string[] {
    return this.tour?.routeName ? ['/tours', this.tour.routeName] : ['/tours'];
  }

  get imageUrl(): string {
    const images = Array.isArray(this.tour?.images) ? this.tour.images : [];
    const source = this.tour?.coverImageUrl ?? images[0] ;
    const url = typeof source === 'string'
      ? source
      : (source?.imageUrl ?? source?.url ?? '');
    if (!url) return 'assets/images/bg/3.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  get imageAlt(): string {
    const images = Array.isArray(this.tour?.images) ? this.tour.images : [];
    return this.seo.imageAlt(images[0], this.tour?.title ?? "" );
  }

  get formattedPrice(): string {
    return formatHomePrice(
      this.currencyService,
      this.tour?.discountedPricePerPerson ?? this.tour?.pricePerPerson ,
      this.tour,
    );
  }

  get formattedOriginalPrice(): string {
    return formatHomePrice(
      this.currencyService,
      this.tour?.pricePerPerson ?? this.tour?.pricePerPerson,
      this.tour,
    );
  }

  get hasDiscount(): boolean {
    return this.tour?.activeDiscount?.isCurrentlyActive === true;
  }

  get discountPercentage(): number {
    return Number(this.tour?.activeDiscount?.percentage ?? 0);
  }

  private get isArabic(): boolean {
    return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
  }
}
