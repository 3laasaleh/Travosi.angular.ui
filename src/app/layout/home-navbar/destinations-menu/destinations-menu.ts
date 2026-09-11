import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

interface DestinationTourNavigationDTO {
  id: number;
  routeName?: string | null;
  title: string;
}

interface DestinationCityNavigationDTO {
  id: number;
  routeName?: string | null;
  title: string;
  tours: DestinationTourNavigationDTO[];
}

interface DestinationNavigationDTO {
  id: number;
  routeName?: string | null;
  title: string;
  cities: DestinationCityNavigationDTO[];
}

@Component({
  selector: 'app-destinations-menu', standalone: true, imports: [NgClass, RouterLink, TranslatePipe],
  templateUrl: './destinations-menu.html', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsMenu {
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** `desktop` renders a full-width mega menu bar, `mobile` renders an inline collapsible panel. */
  @Input() layout: 'desktop' | 'mobile' = 'desktop';
  @Output() navigated = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  menuOpen = false;
  isLoading = false;
  loaded = false;
  loadFailed = false;
  destinations: DestinationNavigationDTO[] = [];
  activeDestinationId: number | null = null;
  activeCityId: number | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  destinationName(item: DestinationNavigationDTO): string { return item.title; }
  cityName(item: DestinationCityNavigationDTO): string { return item.title; }
  cities(destination: DestinationNavigationDTO): DestinationCityNavigationDTO[] { return destination.cities ?? []; }
  tours(city: DestinationCityNavigationDTO): DestinationTourNavigationDTO[] { return city.tours ?? []; }
  tourName(item: DestinationTourNavigationDTO): string { return item.title; }
  get isMobile(): boolean { return this.layout === 'mobile'; }
  get menuId(): string { return `destinations-mega-menu-${this.layout}`; }
  get selectedDestination(): DestinationNavigationDTO | null {
    return this.destinations.find((item) => item.id === this.activeDestinationId) ?? null;
  }
  get selectedCity(): DestinationCityNavigationDTO | null {
    return this.selectedDestination?.cities.find((item) => item.id === this.activeCityId) ?? null;
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (this.menuOpen) {
      this.closeMenu();
      return;
    }

    this.menuOpen = true;
    this.opened.emit();
    if (!this.loaded && !this.isLoading) this.loadHierarchy();
    else this.ensureDesktopSelection();
  }

  openMenu(): void {
    if (this.isMobile) return;
    this.cancelClose();
    this.menuOpen = true;
    this.opened.emit();
    if (!this.loaded && !this.isLoading) this.loadHierarchy();
    else this.ensureDesktopSelection();
  }

  activateDestination(destination: DestinationNavigationDTO): void {
    if (this.isMobile) return;
    this.activeDestinationId = this.itemId(destination);
    this.activeCityId=null;
   
  }

  activateCity(city: DestinationCityNavigationDTO): void {
    if (this.isMobile) return;
    this.activeCityId = Number(city?.id) || null;
  }

  toggleDestination(destination: DestinationNavigationDTO, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isMobile) return;

    const destinationId = this.itemId(destination);
    if (destinationId === null) return;

    this.activeDestinationId = this.activeDestinationId === destinationId ? null : destinationId;
    this.activeCityId = null;
  }

  toggleCity(city: DestinationCityNavigationDTO, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isMobile) return;

    const cityId = this.itemId(city);
    if (cityId === null) return;

    this.activeCityId = this.activeCityId === cityId ? null : cityId;
  }

  isDestinationExpanded(destination: DestinationNavigationDTO): boolean {
    const destinationId = this.itemId(destination);
    return destinationId !== null && this.activeDestinationId === destinationId;
  }

  isCityExpanded(city: DestinationCityNavigationDTO): boolean {
    const cityId = this.itemId(city);
    return cityId !== null && this.activeCityId === cityId;
  }

  scheduleClose(): void {
    if (this.isMobile) return;
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
    this.activeDestinationId = null;
    this.activeCityId = null;
    this.cdr.markForCheck();
  }

  onNavigate(): void {
    this.closeMenu();
    this.navigated.emit();
  }

  retry(): void { this.loaded = false; this.loadHierarchy(); }

  private itemId(item: { id: number }): number | null {
    const id = Number(item.id);
    return Number.isFinite(id) ? id : null;
  }

  private loadHierarchy(): void {
    this.isLoading = true;
    this.loadFailed = false;
    this.api.getUnauthntecated('Destinations/Navigation?takeDestinations=8&takeCities=10&takeTours=8').pipe(
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
      this.loaded = true;
      this.ensureDesktopSelection();
    });
  }

  private ensureDesktopSelection(): void {
    if (this.isMobile || !this.destinations.length) return;


  }



  @HostListener('document:keydown.escape') closeOnEscape(): void { this.closeMenu(); }
  @HostListener('document:click', ['$event']) closeOnOutsideClick(event: MouseEvent): void {
    if (this.isMobile) return;
    if (!this.elementRef.nativeElement.contains(event.target as Node)) this.closeMenu();
  }
}
