import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CurrencyService } from '../../../../../core/services/currency.service';
import { UtilityService } from '../../../../../core/services/utilityservice';
import { DescriptionPreview } from '../../../../../shared/components/description-preview/description-preview';

@Component({
  selector: 'app-tour-detail',
  imports: [DescriptionPreview, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tour-detail.html',
})
export class TourDetail {
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  private readonly utilityService = inject(UtilityService);
  @Input() tour: any = null;

  get title(): string {
    return this.tour?.name ?? this.tour?.nameEng ?? this.tour?.nameAr ?? '';
  }

  get destinationName(): string {
    return (
      this.tour?.destinationName ??
      this.tour?.destination?.nameEng ??
      this.tour?.destination?.name ??
      ''
    );
  }

  get durationDays(): number {
    return this.durationNumber(this.tour?.durationDays ?? this.tour?.days ?? this.tour?.duration);
  }

  get durationHours(): number {
    return this.durationNumber(this.tour?.durationHours ?? this.tour?.durationhours ?? this.tour?.hours);
  }

  private durationNumber(value: unknown): number {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
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
    const facilityLanguages = this.languageFacilities
      .map((facility) => this.localizedFacilityName(facility))
      .filter(Boolean);
    const directLanguages = this.toValues(this.tour?.languages ?? this.tour?.language);
    const values = facilityLanguages.length ? facilityLanguages : directLanguages;
    return [...new Set(values)].join(', ') || this.translate.instant('languageEnglish');
  }

  private get languageFacilities(): any[] {
    const facilities = this.toArray(
      this.tour?.languageFacilities ?? this.tour?.facilities ?? this.tour?.tourFacilities ?? this.tour?.amenities,
    );
    return facilities.filter((facility) => this.isLanguageFacility(facility));
  }

  private isLanguageFacility(facility: any): boolean {
    if (facility?.isLanguage === true || facility?.isLanguageFacility === true) return true;
    const category = [
      facility?.facilityCategoryName,
      facility?.facilityCategoryNameEng,
      facility?.facilityCategoryNameAr,
      facility?.categoryName,
      facility?.category,
      facility?.facilityCategory?.name,
      facility?.facilityCategory?.nameEng,
      facility?.facilityCategory?.nameAr,
    ].filter(Boolean).join(' ').toLowerCase();
    if (/language|languages|spoken|guide language|لغة/.test(category)) return true;

    const name = this.localizedFacilityName(facility).toLowerCase();
    return /^(english|arabic|french|german|italian|spanish|russian|chinese|japanese|turkish|portuguese|dutch|polish|korean|hindi|urdu|العربية|الإنجليزية)/.test(name);
  }

  private localizedFacilityName(facility: any): string {
    if (typeof facility === 'string') return facility.trim();
    const source = facility?.facility ?? facility;
    const value = this.isArabic
      ? source?.nameAr ?? source?.nameEng ?? source?.name ?? source?.facilityNameAr ?? source?.facilityNameEng ?? source?.facilityName
      : source?.nameEng ?? source?.nameAr ?? source?.name ?? source?.facilityNameEng ?? source?.facilityNameAr ?? source?.facilityName;
    return typeof value === 'string' ? value.trim() : '';
  }

  private toValues(value: unknown): string[] {
    return this.toArray(value)
      .map((item) => this.localizedFacilityName(item))
      .filter(Boolean);
  }

  private toArray(value: unknown): any[] {
    return Array.isArray(value) ? value : value == null ? [] : [value];
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

  get description(): string {
    return this.tour?.fullDescription ?? this.tour?.description ?? this.tour?.fullDescriptionEng ?? this.tour?.fullDescriptionAr ?? this.tour?.descriptionEng ?? this.tour?.descriptionAr ?? '';
  }

  private get isArabic(): boolean {
    return this.utilityService.isArabic(this.translate);
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
