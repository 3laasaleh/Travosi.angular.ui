import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HotelsFromCard } from './hotels-from-card/hotels-from-card';
import { HotelsList } from './hotels-list/hotels-list';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [RouterLink, TranslatePipe, HotelsFromCard, HotelsList],
  templateUrl: './hotels-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hotels {
  viewMode: 'table' | 'grid' = 'table';
  showForm = true;
  selectedHotel: any = null;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedHotel = null;
  }

  selectHotelForEdit(hotel: any): void {
    this.selectedHotel = hotel;
    this.showForm = true;
  }

  clearSelectedHotel(): void {
    this.selectedHotel = null;
  }

  handleHotelSaved(): void {
    this.selectedHotel = null;
    this.refreshToken++;
  }
}
