import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CurrencyService } from '../../../core/services/currency.service';
import { UtilityService } from '../../../core/services/utilityservice';
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
  private readonly utilityService = inject(UtilityService);

  @Input({ required: true }) tour: TourHomeDTO|null=null;
  @Input() compact = false;

  get routeLink(): string[] {
    return this.tour?.routeName ? ['/tours', this.tour.routeName] : ['/tours'];
  }

  get imageUrl(): string {
    const images = Array.isArray(this.tour?.images) ? this.tour.images : [];
    return this.utilityService.imageUrl(this.tour?.coverImageUrl ?? images[0]);
  }

  onImageError(event: Event): void {
    this.utilityService.onImageError(event);
  }

  get imageAlt(): string {
    const images = Array.isArray(this.tour?.images) ? this.tour.images : [];
    return this.utilityService.imageAlt(images[0], this.tour?.title ?? '');
  }

  get formattedPrice(): string {
    return this.utilityService.formattedPrice(this.currencyService, this.tour);
  }

  get formattedOriginalPrice(): string {
    return this.utilityService.formattedOriginalPrice(this.currencyService, this.tour);
  }

  get hasDiscount(): boolean {
    return this.utilityService.hasDiscount(this.tour);
  }

  get discountPercentage(): number {
    return this.utilityService.discountPercentage(this.tour);
  }

  private get isArabic(): boolean {
    return this.utilityService.isArabic(this.translate);
  }
}
