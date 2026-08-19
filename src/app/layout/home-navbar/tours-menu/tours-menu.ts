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
import { environment } from '../../../../environments/environment';
import { CurrencyService } from '../../../core/services/currency.service';

@Component({
  selector: 'app-tours-menu',
  standalone: true,
  imports: [NgClass, RouterLink, TranslatePipe],
  templateUrl: './tours-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursMenu {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);
  private readonly currencyService = inject(CurrencyService);

  /** `desktop` renders a full-width mega menu bar, `mobile` renders an inline collapsible panel. */
  @Input() layout: 'desktop' | 'mobile' = 'desktop';
  @Output() navigated = new EventEmitter<void>();

  menuOpen = false;
  isLoading = false;
  loaded = false;
  loadFailed = false;
  tours: any[] = [];
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  tourName(tour: any): string {
    return this.isArabic
      ? tour?.titleAr ?? tour?.titleEng ?? ''
      : tour?.titleEng ?? tour?.titleAr ?? '';
  }

  tourLocation(tour: any): string {
    return [tour?.cityName, tour?.destinationName].filter(Boolean).join(', ');
  }

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
  get isMobile(): boolean { return this.layout === 'mobile'; }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen && !this.loaded && !this.isLoading) this.loadTours();
  }

  openMenu(): void {
    if (this.isMobile) return;
    this.cancelClose();
    this.menuOpen = true;
    if (!this.loaded && !this.isLoading) this.loadTours();
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
  }

  onNavigate(): void {
    this.closeMenu();
    this.navigated.emit();
  }

  retry(): void { this.loaded = false; this.loadTours(); }

  private loadTours(): void {
    this.isLoading = true;
    this.loadFailed = false;
    this.apiService.getUnauthntecated('Tours?page=1&pageSize=12').pipe(
      catchError(() => {
        this.loadFailed = true;
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.tours ?? pageData;
      this.tours = Array.isArray(rows) ? rows : [];
      this.loaded = true;
    });
  }

  @HostListener('document:keydown.escape') closeOnEscape(): void { this.closeMenu(); }
  @HostListener('document:click', ['$event']) closeOnOutsideClick(event: MouseEvent): void {
    if (this.isMobile) return;
    if (!this.elementRef.nativeElement.contains(event.target as Node)) this.closeMenu();
  }
}
