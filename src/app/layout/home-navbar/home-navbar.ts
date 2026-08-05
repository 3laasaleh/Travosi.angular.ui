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
import { AuthService } from '../../features/user/_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { CurrencyService } from '../../core/services/currency.service';
import { DestinationsMenu } from './destinations-menu/destinations-menu';
import { PackagesMenu } from './packages-menu/packages-menu';
import { SearchBox } from './search-box/search-box';
import { finalize } from 'rxjs';

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
  readonly currencyService = inject(CurrencyService);

  accountMenuOpen = false;
  mobileMenuOpen = false;
  languageMenuOpen = false;
  currencyMenuOpen = false;
  switchingLanguage: string | null = null;

  get currentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  toggleLanguageMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.languageMenuOpen = !this.languageMenuOpen;
    this.currencyMenuOpen = false;
    this.accountMenuOpen = false;
    this.refreshIcons();
  }

  toggleCurrencyMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.currencyMenuOpen = !this.currencyMenuOpen;
    this.languageMenuOpen = false;
    this.accountMenuOpen = false;
    this.refreshIcons();
  }

  switchLanguage(lang: string): void {
    if (this.switchingLanguage !== null) return;
    this.switchingLanguage = lang;
    this.languageService.setGLobalLanguage(lang).pipe(
      finalize(() => {
        this.switchingLanguage = null;
        this.closeMenus();
        this.cdr.markForCheck();
      }),
    ).subscribe({ error: () => {} });
  }

  switchCurrency(code: string): void {
    this.currencyService.setCurrency(code);
    this.closeMenus();
  }

  
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
    this.refreshIcons();
  }

  closeMenus(): void {
    this.accountMenuOpen = false;
    this.mobileMenuOpen = false;
    this.languageMenuOpen = false;
    this.currencyMenuOpen = false;
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
      this.currencyMenuOpen = false;
    }
  }

  private refreshIcons(): void {
    requestAnimationFrame(() => feather.replace());
  }
}
