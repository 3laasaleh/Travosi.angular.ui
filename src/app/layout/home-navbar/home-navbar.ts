import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import feather from 'feather-icons';
import { AuthService } from '../../pages/user/_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-navbar',
  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  templateUrl: './home-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavbar implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  accountMenuOpen = false;
  mobileMenuOpen = false;

  
  get isAdmin(): boolean {
    return this.authService.isAdmin() ?? false;
  }

  get isLoggedIn(): boolean {
    return !!this.authService.getCurentUser();
  }

  get userName(): string {
    const user = this.authService.getCurentUser();
    return [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.userName || '';
  }

  get userEmail(): string {
    return this.authService.getCurentUser()?.email ?? '';
  }

  get userInitials(): string {
    return this.userName
      .split(' ')
      .slice(0, 2)
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase();
  }

  ngAfterViewInit(): void {
    this.refreshIcons();
  }

  toggleAccountMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.accountMenuOpen = !this.accountMenuOpen;
    this.refreshIcons();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.refreshIcons();
  }

  closeMenus(): void {
    this.accountMenuOpen = false;
    this.mobileMenuOpen = false;
  }

  logout(): void {
    this.closeMenus();
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  closeAccountMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.accountMenuOpen = false;
    }
  }

  private refreshIcons(): void {
    requestAnimationFrame(() => feather.replace());
  }
}
