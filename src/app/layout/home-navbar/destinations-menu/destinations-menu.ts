import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { environment } from '../../../../environments/environment';
import { CurrencyService } from '../../../core/services/currency.service';

@Component({
  selector: 'app-destinations-menu', standalone: true, imports: [RouterLink, TranslatePipe],
  templateUrl: './destinations-menu.html', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsMenu {
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);
  private readonly currencyService = inject(CurrencyService);
  menuOpen = false;
  isLoading = false;
  loaded = false;
  loadFailed = false;
  destinations: any[] = [];
  selectedDestination: any = null;
  selectedCity: any = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  destinationName(item: any): string { return this.isArabic ? item?.nameAr ?? item?.nameEng ?? '' : item?.nameEng ?? item?.nameAr ?? ''; }
  cityName(item: any): string { return this.destinationName(item); }
  tourName(item: any): string { return this.isArabic ? item?.titleAr ?? item?.titleEng ?? '' : item?.titleEng ?? item?.titleAr ?? ''; }
  tourImage(tour: any): string {
    const raw = String(tour?.coverImageUrl ?? '').trim();
    if (!raw) return 'assets/images/bg/3.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(raw)) return raw;
    const path = raw.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }
  formattedTourPrice(tour: any): string {
    return this.currencyService.formatPrice(
      tour?.pricePerPerson,
      tour?.currencyId ?? tour?.currency ?? 'USD',
    );
  }
  get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
  get cities(): any[] { return this.selectedDestination?.cities ?? []; }
  get tours(): any[] { return this.selectedCity?.tours ?? []; }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen && !this.loaded) this.loadHierarchy();
  }

  openMenu(): void {
    this.cancelClose();
    this.menuOpen = true;
    if (!this.loaded && !this.isLoading) this.loadHierarchy();
  }

  scheduleClose(): void {
    this.cancelClose();
    this.closeTimer = setTimeout(() => this.closeMenu(), 140);
  }

  cancelClose(): void {
    if (this.closeTimer !== null) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  closeMenu(): void {
    this.cancelClose();
    this.menuOpen = false;
    this.selectedDestination = null;
    this.selectedCity = null;
  }

  selectDestination(destination: any): void {
    if (this.selectedDestination?.id === destination?.id) return;
    this.selectedDestination = destination;
    this.selectedCity = null;
  }

  selectCity(city: any): void { this.selectedCity = city; }

  retry(): void { this.loaded = false; this.loadHierarchy(); }

  private loadHierarchy(): void {
    this.isLoading = true;
    this.loadFailed = false;
    this.api.getUnauthntecated('Destinations/Navigation?takeDestinations=10&takeCities=10&takeTours=8').pipe(
      catchError(() => {
        this.loadFailed = true;
        return of(null);
      }),
      finalize(() => { this.isLoading = false; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const data = response?.data ?? response;
      const rows = data?.data ?? data?.destinations ?? data;
      this.destinations = Array.isArray(rows) ? rows : [];
      this.selectedDestination = null;
      this.selectedCity = null;
      this.loaded = true;
    });
  }

  @HostListener('document:keydown.escape') closeOnEscape(): void { this.closeMenu(); }
  @HostListener('document:click', ['$event']) closeOnOutsideClick(event: MouseEvent): void { if (!this.elementRef.nativeElement.contains(event.target as Node)) this.closeMenu(); }
}
