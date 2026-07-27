import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../pages/user/_services/auth.service';

interface SidebarMenuItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-menu.html',
  styles: [':host { display: contents; }'],
})
export class SidebarMenu {
  private authService = inject(AuthService);
  activeMenu = '';
  collapsed = false;

  readonly menuItems: SidebarMenuItem[] = [
    { label: 'destinations', path: '/admin/destinations', icon: 'mdi-map-marker-outline' },
    { label: 'tours', path: '/admin/tours', icon: 'mdi-compass-outline' },
    { label: 'packages', path: '/admin/packages', icon: 'mdi-package-variant-closed' },
    { label: 'bookings', path: '/admin/agent-booking-manager', icon: 'mdi-calendar-check-outline' },
    { label: 'customers', path: '/admin/customers', icon: 'mdi-account-group-outline' },
    { label: 'tasks', path: '/admin/tasks', icon: 'mdi-checkbox-marked-outline' },
    { label: 'airlines', path: '/admin/Airlines', icon: 'mdi-airplane' },
    { label: 'hotels', path: '/admin/hotels', icon: 'mdi-bed-outline' },
    { label: 'flights', path: '/admin/Flights', icon: 'mdi-airplane-takeoff' },
    { label: 'countries', path: '/admin/countries', icon: 'mdi-earth' },
    { label: 'cities', path: '/admin/cities', icon: 'mdi-city-variant-outline' },
    { label: 'quotations', path: '/admin/quotations', icon: 'mdi-file-document-outline' },
  ];

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  get currentRole(): string | undefined {
    return this.authService.getCurrentUserRole();
  }

  get showSidebar(): boolean {
    return this.currentRole === 'Admin' || this.currentRole === 'Agent';
  }
}
