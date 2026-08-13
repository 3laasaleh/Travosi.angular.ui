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
import { DecimalPipe } from '@angular/common';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { DestinationsMenu } from './destinations-menu/destinations-menu';
import { PackagesMenu } from './packages-menu/packages-menu';
import { ToursMenu } from './tours-menu/tours-menu';
import { SearchBox } from './search-box/search-box';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../core/services/apiservice.service';
import { AuthService } from '../../features/user/_services/auth.service';
import { CurrencyService } from '../../core/services/currency.service';

@Component({
  selector: 'app-home-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, DecimalPipe, DestinationsMenu, PackagesMenu, SearchBox],
  templateUrl: './home-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavbar implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly apiService = inject(ApiService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly languageService = inject(LanguageService);
  readonly currencyService = inject(CurrencyService);

  accountMenuOpen = false;
  mobileMenuOpen = false;
  languageMenuOpen = false;
  currencyMenuOpen = false;
  switchingLanguage: string | null = null;
  mobileDestinationsOpen = false;
  mobileNavigationLoading = false;
  mobileDestinations: any[] = [];
  mobileDestinationMenuLevel: 'destinations' | 'cities' | 'tours' = 'destinations';
  selectedMobileDestination: any = null;
  selectedMobileCity: any = null;

  get currentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  toggleLanguageMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.languageMenuOpen = !this.languageMenuOpen;
    this.accountMenuOpen = false;
    this.currencyMenuOpen = false;
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
    if (!this.mobileMenuOpen) this.resetMobileDestinationMenu();
    this.accountMenuOpen = false;
    this.languageMenuOpen = false;
    this.refreshIcons();
  }

  toggleCurrencyMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.currencyMenuOpen = !this.currencyMenuOpen;
    this.languageMenuOpen = false;
    this.accountMenuOpen = false;
  }

  switchCurrency(code: string): void {
    this.currencyMenuOpen = false;
    this.mobileMenuOpen = false;
    this.currencyService.selectCurrency(code);
  }

  toggleMobileDestinations(): void {
    this.mobileDestinationsOpen = !this.mobileDestinationsOpen;
    if (this.mobileDestinationsOpen) {
      this.resetMobileDestinationMenu();
      if (!this.mobileDestinations.length) this.loadMobileNavigation();
    }
  }

  openMobileDestination(destination: any): void {
    this.selectedMobileDestination = destination;
    this.selectedMobileCity = null;
    this.mobileDestinationMenuLevel = 'cities';
  }

  openMobileCity(city: any): void {
    this.selectedMobileCity = city;
    this.mobileDestinationMenuLevel = 'tours';
  }

  backMobileDestinationMenu(): void {
    if (this.mobileDestinationMenuLevel === 'tours') {
      this.selectedMobileCity = null;
      this.mobileDestinationMenuLevel = 'cities';
      return;
    }
    if (this.mobileDestinationMenuLevel === 'cities') this.resetMobileDestinationMenu();
  }

  mobileDestinationName(item: any): string { return this.currentLanguage === 'ar' ? item?.nameAr ?? item?.nameEng ?? '' : item?.nameEng ?? item?.nameAr ?? ''; }
  mobileCityName(item: any): string { return this.mobileDestinationName(item); }
  mobileTourName(item: any): string { return this.currentLanguage === 'ar' ? item?.titleAr ?? item?.titleEng ?? '' : item?.titleEng ?? item?.titleAr ?? ''; }

  closeMenus(): void {
    this.accountMenuOpen = false;
    this.mobileMenuOpen = false;
    this.languageMenuOpen = false;
    this.currencyMenuOpen = false;
    this.mobileDestinationsOpen = false;
    this.resetMobileDestinationMenu();
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

  private loadMobileNavigation(): void {
    this.mobileNavigationLoading = true;
    this.apiService.getUnauthntecated('Destinations/Navigation?takeDestinations=10&takeCities=10&takeTours=5').pipe(
      catchError(() => of(null)),
      finalize(() => { this.mobileNavigationLoading = false; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      const data = response?.data ?? response;
      const rows = data?.data ?? data?.destinations ?? data;
      this.mobileDestinations = Array.isArray(rows) ? rows : [];
    });
  }

  private resetMobileDestinationMenu(): void {
    this.mobileDestinationMenuLevel = 'destinations';
    this.selectedMobileDestination = null;
    this.selectedMobileCity = null;
  }
}
