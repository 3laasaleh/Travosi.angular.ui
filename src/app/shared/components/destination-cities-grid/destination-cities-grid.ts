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
  cityName(city: any): string {
    const title = city?.title ?? '';
    const titleAr = city?.titleAr ?? '';
    const titleEng = city?.titleEng ?? '';
    return this.isArabic ? (title || titleAr || titleEng) : (title || titleEng || titleAr);
  }
  get isArabic(): boolean { return this.utilityService.isArabic(this.translate); }
  cityImage(city: any): string { return this.utilityService.imageUrl(city?.coverImageUrl ?? city?.imageUrl ?? city?.images?.[0]?.imageUrl ?? ''); }
  onCityImageError(event: Event): void { this.utilityService.onCityImageError(event); }
}
