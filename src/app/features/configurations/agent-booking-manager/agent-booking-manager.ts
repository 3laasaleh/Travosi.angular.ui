import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BookingsList } from '../bookings/bookings-list/bookings-list';

@Component({
  selector: 'app-agent-booking-manager',
  standalone: true,
  imports: [RouterLink, TranslatePipe, BookingsList],
  templateUrl: './agent-booking-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentBookingManager {}
