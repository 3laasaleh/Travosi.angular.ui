import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../user/_services/auth.service';
import { BookingsFromCard } from './bookings-from-card/bookings-from-card';
import { BookingsList } from './bookings-list/bookings-list';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [RouterLink, TranslatePipe, BookingsFromCard, BookingsList],
  templateUrl: './bookings-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bookings {
  private readonly authService = inject(AuthService);

  viewMode: 'table' | 'grid' = 'table';
  selectedBooking: any = null;
  refreshToken = 0;

  get isAdmin(): boolean {
    return this.authService.getCurrentUserRole() === 'Admin';
  }

  selectBookingForEdit(booking: any): void {
    this.selectedBooking = booking;
  }

  clearSelectedBooking(): void {
    this.selectedBooking = null;
    this.refreshToken++;
  }

  handleBookingSaved(): void {
    this.selectedBooking = null;
    this.refreshToken++;
  }
}
