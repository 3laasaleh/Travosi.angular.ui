import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import feather from 'feather-icons';
import { CurrencyService } from '../../../core/services/currency.service';
import { datas } from '../../../data/data';

@Component({
  selector: 'app-tour-detail',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tour-detail.html',
})
export class TourDetail implements AfterViewInit {
  readonly currencyService = inject(CurrencyService);

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

  get price(): number | string {
    return this.tour?.pricePerPerson ?? this.tour?.price ?? 0;
  }

  get currencySymbol(): string {
    return (
      this.tour?.currencySymbol ??
      this.tour?.currency?.symbol ??
      this.currencyService.currentCurrency().symbol
    );
  }

  get description(): string {
    return this.tour?.fullDescription ?? this.tour?.description ?? this.tour?.overview ?? '';
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  handleclick(id: number): void {
    this.activeIndex = id;
  }
}
