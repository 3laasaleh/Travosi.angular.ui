import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CurrencyService } from '../../../../../core/services/currency.service';
import { formatHomePrice } from '../../../home-price.util';
import { DescriptionLinks } from '../../../../../shared/components/description-links/description-links';

@Component({
  selector: 'app-tour-detail',
  imports: [TranslatePipe, DescriptionLinks],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tour-detail.html',
})
export class TourDetail {
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  @Input() tour: any = null;

  get title(): string {
    return this.isArabic
      ? (this.tour?.titleAr || this.tour?.nameAr || this.tour?.titleEng || this.tour?.nameEng || this.tour?.title || this.tour?.name || '')
      : (this.tour?.titleEng || this.tour?.nameEng || this.tour?.title || this.tour?.name || this.tour?.titleAr || this.tour?.nameAr || '');
  }

  get destinationName(): string {
    return (
      this.tour?.destinationName ??
      this.tour?.destination?.nameEng ??
      this.tour?.destination?.name ??
      ''
    );
  }

  get durationDays(): number | string {
    return this.tour?.durationDays ?? this.tour?.days ?? this.tour?.duration ?? 0;
  }

  get durationHours(): number | string {
    return this.tour?.durationHours ?? this.tour?.durationhours ?? this.tour?.hours ?? 0;
  }

  get tourType(): string {
    return (
      this.tour?.typeName ??
      this.tour?.tourType ??
      this.tour?.type ??
      this.tour?.categoryName ??
      '-'
    );
  }

  get groupSize(): number | string {
    return this.tour?.maxSeats ?? this.tour?.groupSize ?? this.tour?.capacity ?? 0;
  }

  get languages(): string {
    const languages = this.tour?.languages ?? this.tour?.language;
    if (Array.isArray(languages)) {
      return languages
        .map((language) => language?.name ?? language?.nameEng ?? language)
        .filter(Boolean)
        .join(', ');
    }
    return languages || '-';
  }

  get formattedPrice(): string {
    return formatHomePrice(this.currencyService, this.tour?.discountedPricePerPerson ?? this.tour?.pricePerPerson ?? this.tour?.price, this.tour);
  }

  get formattedOriginalPrice(): string {
    return formatHomePrice(this.currencyService, this.tour?.pricePerPerson ?? this.tour?.price, this.tour);
  }

  get hasDiscount(): boolean {
    return this.tour?.activeDiscount?.isCurrentlyActive === true;
  }

  get description(): string {
    return this.isArabic
      ? (this.tour?.fullDescriptionAr || this.tour?.descriptionAr || this.tour?.fullDescriptionEng || this.tour?.descriptionEng || this.tour?.fullDescription || this.tour?.description || '')
      : (this.tour?.fullDescriptionEng || this.tour?.descriptionEng || this.tour?.fullDescription || this.tour?.description || this.tour?.fullDescriptionAr || this.tour?.descriptionAr || '');
  }

  private get isArabic(): boolean {
    return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
  }

  get highlightItems(): any[] {
    return Array.isArray(this.tour?.highlights) ? this.tour.highlights : [];
  }

  get includedItems(): any[] {
    const items = Array.isArray(this.tour?.includes) ? this.tour.includes : [];
    return items.filter((item: any) => item?.isIncluded !== false);
  }

  get excludedItems(): any[] {
    const items = Array.isArray(this.tour?.excludes) ? this.tour.excludes : [];
    if (items.length) return items;

    const legacyItems = Array.isArray(this.tour?.includes) ? this.tour.includes : [];
    return legacyItems.filter((item: any) => item?.isIncluded === false);
  }

  itemValue(item: any): string {
    return typeof item === 'string'
      ? item
      : this.isArabic
        ? (item?.valueAr ?? item?.valueEng ?? item?.value ?? item?.text ?? item?.name ?? '')
        : (item?.valueEng ?? item?.valueAr ?? item?.value ?? item?.text ?? item?.name ?? '');
  }

  get itineraryItems(): any[] {
    const items = this.tour?.itinerary ?? this.tour?.itineraries ?? [];
    return Array.isArray(items) ? items : [];
  }

  get itinerarySteps(): any[] {
    const ids = new Set(this.itineraryItems.map((item) => Number(item?.id)));
    return this.itineraryItems.filter(
      (item) => item?.isChildNode !== true || !item?.parentId || !ids.has(Number(item.parentId)),
    );
  }

  itineraryChildren(step: any): any[] {
    const stepId = Number(step?.id);
    if (!Number.isFinite(stepId) || stepId <= 0) return [];
    return this.itineraryItems.filter(
      (item) => item?.isChildNode === true && Number(item?.parentId) === stepId,
    );
  }

  itineraryTime(step: any): string {
    const format = (value: unknown): string => {
      const match = typeof value === 'string' ? value.match(/^(\d{2}):(\d{2})/) : null;
      return match ? `${match[1]}:${match[2]}` : '';
    };
    return [format(step?.startTime), format(step?.endTime)].filter(Boolean).join(' - ');
  }

}
