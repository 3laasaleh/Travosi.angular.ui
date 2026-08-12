import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Component({ selector: 'app-destination-cities-grid', standalone: true, imports: [RouterLink], templateUrl: './destination-cities-grid.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class DestinationCitiesGrid {
  private readonly translate = inject(TranslateService);
  @Input() destinationId!: number;
  @Input() cities: any[] = [];
  cityName(city: any): string { return this.isArabic ? city?.nameAr ?? city?.nameEng ?? city?.name ?? '' : city?.nameEng ?? city?.nameAr ?? city?.name ?? ''; }
  get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
  cityImage(city: any): string { const raw = city?.coverImageUrl ?? city?.imageUrl ?? city?.images?.[0]?.imageUrl ?? ''; return !raw ? 'assets/images/bg/2.jpg' : /^(blob:|data:|https?:\/\/)/i.test(raw) ? raw : `${environment.imageUrl}${String(raw).replace(/^\/+/, '')}`; }
}
