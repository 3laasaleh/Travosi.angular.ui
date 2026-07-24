import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../pages/user/auth-pages/_services/auth.service';

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-menu.html',
  styles: [':host { display: contents; }'],
})
export class SidebarMenu {
  private authService = inject(AuthService);

  get currentRole(): string | undefined {
    return this.authService.getCurrentUserRole();
  }

  get showSidebar(): boolean {
    return this.currentRole === 'Admin' || this.currentRole === 'Agent';
  }
}
