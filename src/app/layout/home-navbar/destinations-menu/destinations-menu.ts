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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { UtilityService } from '../../../core/services/utilityservice';

@Component({
  selector: 'app-destinations-menu', standalone: true, imports: [NgClass, RouterLink, TranslatePipe],
  templateUrl: './destinations-menu.html', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsMenu {
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);
  private readonly utilityService = inject(UtilityService);

  /** `desktop` renders a full-width mega menu bar, `mobile` renders an inline collapsible panel. */
  @Input() layout: 'desktop' | 'mobile' = 'desktop';
  @Output() navigated = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  menuOpen = false;
  isLoading = false;
  loaded = false;
  loadFailed = false;
  destinations: any[] = [];
  activeDestinationId: number | null = null;
  activeCityId: number | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  destinationName(item: any): string { return this.isArabic ? item?.titleAr ?? item?.titleEng ?? '' : item?.titleEng ?? item?.titleAr ?? ''; }
  cityName(item: any): string { return this.destinationName(item); }
  cities(destination: any): any[] { return destination?.cities ?? []; }
  tours(city: any): any[] { return city?.tours ?? []; }
  tourName(item: any): string {
    return this.isArabic ? item?.titleAr ?? item?.titleEng ?? '' : item?.titleEng ?? item?.titleAr ?? '';
  }
  get isArabic(): boolean { return this.utilityService.isArabic(this.translate); }
  get isMobile(): boolean { return this.layout === 'mobile'; }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (this.menuOpen) {
      this.closeMenu();
      return;
    }

    this.menuOpen = true;
    this.opened.emit();
    if (!this.loaded && !this.isLoading) this.loadHierarchy();
  }

  openMenu(): void {
    if (this.isMobile) return;
    this.cancelClose();
    this.menuOpen = true;
    this.opened.emit();
    if (!this.loaded && !this.isLoading) this.loadHierarchy();
  }

  activateDestination(destination: any): void {
    if (this.isMobile) return;
    this.activeDestinationId = Number(destination?.id) || null;
    this.activeCityId = null;
  }

  activateCity(city: any): void {
    if (this.isMobile) return;
    this.activeCityId = Number(city?.id) || null;
  }

  toggleDestination(destination: any, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isMobile) return;

    const destinationId = this.itemId(destination);
    if (destinationId === null) return;

    this.activeDestinationId = this.activeDestinationId === destinationId ? null : destinationId;
    this.activeCityId = null;
  }

  toggleCity(city: any, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isMobile) return;

    const cityId = this.itemId(city);
    if (cityId === null) return;

    this.activeCityId = this.activeCityId === cityId ? null : cityId;
  }

  isDestinationExpanded(destination: any): boolean {
    const destinationId = this.itemId(destination);
    return destinationId !== null && this.activeDestinationId === destinationId;
  }

  isCityExpanded(city: any): boolean {
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

  private itemId(item: any): number | null {
    const id = Number(item?.id);
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
    });
  }

  @HostListener('document:keydown.escape') closeOnEscape(): void { this.closeMenu(); }
  @HostListener('document:click', ['$event']) closeOnOutsideClick(event: MouseEvent): void {
    if (this.isMobile) return;
    if (!this.elementRef.nativeElement.contains(event.target as Node)) this.closeMenu();
  }
}
