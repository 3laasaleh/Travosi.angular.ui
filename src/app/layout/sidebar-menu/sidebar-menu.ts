import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../pages/user/_services/auth.service';

interface SidebarMenuItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-menu.html',
  styles: [':host { display: contents; }'],
})
export class SidebarMenu {
  private authService = inject(AuthService);
activeMenu='';
  readonly menuItems: SidebarMenuItem[] = [
    { label: 'Destinations', path: '/admin/destinations' },
    { label: 'Tours', path: '/admin/tours' },
    { label: 'Packages', path: '/admin/packages' },
    { label: 'Booking', path: '/user-booking' },
    { label: 'Customers', path: '/admin/customers' },
    { label: 'Tasks', path: '/admin/tasks' },
    { label: 'Service Types', path: '/admin/service-types' },
    { label: 'Flight Companies', path: '/admin/flight-companies' },
    { label: 'Hotels', path: '/admin/hotels' },
  ];

  get currentRole(): string | undefined {
    return this.authService.getCurrentUserRole();
  }

  get showSidebar(): boolean {
    return this.currentRole === 'Admin' || this.currentRole === 'Agent';
  }
}
