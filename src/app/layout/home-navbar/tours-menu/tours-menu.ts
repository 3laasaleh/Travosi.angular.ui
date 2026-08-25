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
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

@Component({
  selector: 'app-tours-menu',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './tours-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursMenu {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);

  @Input() layout: 'desktop' | 'mobile' = 'desktop';
  @Input() nileCruisesOnly = false;
  @Output() navigated = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  menuOpen = false;
  isLoading = false;
  loaded = false;
  tours: any[] = [];
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  tourName(tour: any): string {
    return this.isArabic
      ? tour?.titleAr ?? tour?.titleEng ?? ''
      : tour?.titleEng ?? tour?.titleAr ?? '';
  }

  get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
  get isMobile(): boolean { return this.layout === 'mobile'; }
  get menuLabelKey(): string { return this.nileCruisesOnly ? 'nileCruises' : 'tours'; }
  get emptyLabelKey(): string { return this.nileCruisesOnly ? 'noNileCruisesFound' : 'noToursFound'; }
  get viewAllLabelKey(): string { return this.nileCruisesOnly ? 'viewAllNileCruises' : 'viewAllTours'; }
  get listRoute(): string { return this.nileCruisesOnly ? '/nile-cruises' : '/tours'; }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.opened.emit();
      if (!this.loaded && !this.isLoading) this.loadTours();
    }
  }

  openMenu(): void {
    if (this.isMobile) return;
    this.cancelClose();
    this.menuOpen = true;
    this.opened.emit();
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
    this.cdr.markForCheck();
  }

  onNavigate(): void {
    this.closeMenu();
    this.navigated.emit();
  }

  private loadTours(): void {
    this.isLoading = true;
    const nileCruiseFilter = this.nileCruisesOnly ? '&isNileCruise=true' : '';
    this.apiService.getUnauthntecated(`Tours?page=1&pageSize=8${nileCruiseFilter}`).pipe(
      catchError(() => of(null)),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.tours ?? pageData;
      this.tours = Array.isArray(rows) ? rows.slice(0, 8) : [];
      this.loaded = true;
    });
  }

  @HostListener('document:keydown.escape') closeOnEscape(): void { this.closeMenu(); }
  @HostListener('document:click', ['$event']) closeOnOutsideClick(event: MouseEvent): void {
    if (this.isMobile) return;
    if (!this.elementRef.nativeElement.contains(event.target as Node)) this.closeMenu();
  }
}
