import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CountriesFromCard } from './countries-from-card/countries-from-card';
import { CountriesList } from './countries-list/countries-list';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [RouterLink, TranslatePipe, CountriesFromCard, CountriesList],
  templateUrl: './countries-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Countries {
  viewMode: 'table' | 'grid' = 'table';
  showForm = false;
  selectedCountry: any = null;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedCountry = null;
  }

  selectCountryForEdit(country: any): void {
    this.selectedCountry = country;
    this.showForm = true;
  }

  clearSelectedCountry(): void {
    this.selectedCountry = null;
  }

  handleCountrySaved(): void {
    this.selectedCountry = null;
    this.refreshToken++;
  }
}
