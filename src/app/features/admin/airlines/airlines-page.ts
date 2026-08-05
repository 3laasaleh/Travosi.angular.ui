import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AirlinesFromCard } from './airlines-from-card/airlines-from-card';
import { AirlinesList } from './airlines-list/airlines-list';

@Component({
  selector: 'app-airlines',
  standalone: true,
  imports: [RouterLink, TranslatePipe, AirlinesFromCard, AirlinesList],
  templateUrl: './airlines-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Airlines {
  viewMode: 'table' | 'grid' = 'table';
  showForm = false;
  selectedAirline: any = null;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedAirline = null;
  }

  selectAirlineForEdit(airline: any): void {
    this.selectedAirline = airline;
    this.showForm = true;
  }

  clearSelectedAirline(): void {
    this.selectedAirline = null;
  }

  handleAirlineSaved(): void {
    this.selectedAirline = null;
    this.refreshToken++;
  }
}
