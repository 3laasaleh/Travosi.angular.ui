import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CitiesFromCard } from './cities-from-card/cities-from-card';
import { CitiesList } from './cities-list/cities-list';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [RouterLink, TranslatePipe, CitiesFromCard, CitiesList],
  templateUrl: './cities-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cities {
  viewMode: 'table' | 'grid' = 'table';
  showForm = false;
  selectedCity: any = null;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedCity = null;
  }

  selectCityForEdit(city: any): void {
    this.selectedCity = city;
    this.showForm = true;
  }

  clearSelectedCity(): void {
    this.selectedCity = null;
    this.showForm = false;
  }

  handleCitySaved(): void {
    this.selectedCity = null;
    this.showForm = false;
    this.refreshToken++;
  }
}
