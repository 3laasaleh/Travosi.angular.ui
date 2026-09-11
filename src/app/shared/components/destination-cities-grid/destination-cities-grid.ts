import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilityService } from '../../../core/services/utilityservice';
import { CityHomeDTO } from '../../models/city-home.model';

@Component({ selector: 'app-destination-cities-grid', standalone: true, imports: [RouterLink], templateUrl: './destination-cities-grid.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class DestinationCitiesGrid {
  private readonly utilityService = inject(UtilityService);
  @Input() destinationId!: number;
  @Input() cities: CityHomeDTO[] = [];
  cityName(city: CityHomeDTO): string {
    return city.title ?? '';
  }
  cityImage(city: CityHomeDTO): string { return this.utilityService.imageUrl(city.coverImageUrl ?? city.imageUrl ?? city.images?.[0]?.imageUrl ?? ''); }
  onCityImageError(event: Event): void { this.utilityService.onCityImageError(event); }
}
