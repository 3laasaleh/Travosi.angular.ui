import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from '../../../core/services/utilityservice';

@Component({ selector: 'app-destination-cities-grid', standalone: true, imports: [RouterLink], templateUrl: './destination-cities-grid.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class DestinationCitiesGrid {
  private readonly translate = inject(TranslateService);
  private readonly utilityService = inject(UtilityService);
  @Input() destinationId!: number;
  @Input() cities: any[] = [];
  cityName(city: any): string { return this.isArabic ? city?.titleAr ?? city?.titleEng ?? city?.title ?? '' : city?.titleEng ?? city?.titleAr ?? city?.title ?? ''; }
  get isArabic(): boolean { return this.utilityService.isArabic(this.translate); }
  cityImage(city: any): string { return this.utilityService.imageUrl(city?.coverImageUrl ?? city?.imageUrl ?? city?.images?.[0]?.imageUrl ?? ''); }
}
