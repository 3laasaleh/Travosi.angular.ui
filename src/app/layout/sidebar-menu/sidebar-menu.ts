import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../features/user/_services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { CONFIGURATION_MENU_ITEMS } from '../configuration-menu-items';

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-menu.html',
  styles: [':host { display: contents; }'],
})
export class SidebarMenu {
  private authService = inject(AuthService);
  readonly languageService = inject(LanguageService);
  activeMenu = '';
  collapsed = false;

  readonly menuItems = CONFIGURATION_MENU_ITEMS;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  get currentRole(): string | undefined {
    return this.authService.getCurrentUserRole();
  }

  get showSidebar(): boolean {
    return this.currentRole === 'Admin' || this.currentRole === 'Agent';
  }

  localizedPath(path: string): string[] {
    return ['/', this.languageService.currentLanguage(), ...path.split('/').filter(Boolean)];
  }
}
