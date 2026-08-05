import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { DestinationsMenu } from './destinations-menu/destinations-menu';
import { PackagesMenu } from './packages-menu/packages-menu';
import { SearchBox } from './search-box/search-box';
import { finalize } from 'rxjs';
import { AuthService } from '../../features/user/_services/auth.service';

@Component({
  selector: 'app-home-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, DestinationsMenu, PackagesMenu, SearchBox],
  templateUrl: './home-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavbar implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly languageService = inject(LanguageService);

  accountMenuOpen = false;
  mobileMenuOpen = false;
  languageMenuOpen = false;
  switchingLanguage: string | null = null;

  get currentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  toggleLanguageMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.languageMenuOpen = !this.languageMenuOpen;
    this.accountMenuOpen = false;
    this.refreshIcons();
  }

  switchLanguage(lang: string): void {
    if (this.switchingLanguage !== null) return;
    this.switchingLanguage = lang;
    this.mobileMenuOpen = false;
    this.languageService.setGLobalLanguage(lang).pipe(
      finalize(() => {
        this.switchingLanguage = null;
        this.closeMenus();
        this.cdr.markForCheck();
      }),
    ).subscribe({ error: () => {} });
  }

  get canAccessConfigurations(): boolean {
    return this.authService.isAdmin() || this.authService.isAgent();
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

  get profileImageUrl(): string | null {
    return this.authService.profileImageUrl();
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
    this.accountMenuOpen = false;
    this.languageMenuOpen = false;
    this.refreshIcons();
  }

  closeMenus(): void {
    this.accountMenuOpen = false;
    this.mobileMenuOpen = false;
    this.languageMenuOpen = false;
  }

  logout(): void {
    this.closeMenus();
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  closeAccountMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.accountMenuOpen = false;
      this.languageMenuOpen = false;
    }
  }

  private refreshIcons(): void {
    requestAnimationFrame(() => feather.replace());
  }
}
