import { DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import feather from 'feather-icons';
import { apiCurrencyLabel, apiPrice } from '../../../../../core/utils/api-price.util';
import { datas } from '../../../../../data/data';

@Component({
  selector: 'app-tour-detail',
  imports: [TranslatePipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tour-detail.html',
})
export class TourDetail implements AfterViewInit {
  @Input() tour: any = null;

  datas = datas;
  activeIndex = 1;

  get title(): string {
    return (
      this.tour?.titleEng ??
      this.tour?.nameEng ??
      this.tour?.title ??
      this.tour?.name ??
      ''
    );
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

  get price(): number {
    return apiPrice(this.tour?.pricePerPerson ?? this.tour?.price);
  }

  get currencySymbol(): string {
    return apiCurrencyLabel(this.tour);
  }

  get description(): string {
    return this.tour?.fullDescription ?? this.tour?.description ?? this.tour?.overview ?? '';
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

  ngAfterViewInit(): void {
    feather.replace();
  }

  handleclick(id: number): void {
    this.activeIndex = id;
  }
}
