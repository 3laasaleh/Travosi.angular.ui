import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FlightsFromCard } from './flights-from-card/flights-from-card';
import { FlightsList } from './flights-list/flights-list';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [RouterLink, TranslatePipe, FlightsFromCard, FlightsList],
  templateUrl: './flights-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Flights {
  viewMode: 'table' | 'grid' = 'table';
  showForm = true;
  selectedFlight: any = null;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedFlight = null;
  }

  selectFlightForEdit(flight: any): void {
    this.selectedFlight = flight;
    this.showForm = true;
  }

  clearSelectedFlight(): void {
    this.selectedFlight = null;
  }

  handleFlightSaved(): void {
    this.selectedFlight = null;
    this.refreshToken++;
  }
}
