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
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

interface TourNavigationDTO {
  id: number;
  routeName?: string | null;
  title: string;
}

interface NavigationResponse {
  data?: TourNavigationDTO[];
}

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

  @Input() layout: 'desktop' | 'mobile' = 'desktop';
  @Input() nileCruisesOnly = false;
  @Output() navigated = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  menuOpen = false;
  isLoading = false;
  loaded = false;
  tours: TourNavigationDTO[] = [];
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  tourName(tour: TourNavigationDTO): string {
    return tour.title;
  }

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
    this.apiService.getUnauthntecated<NavigationResponse | TourNavigationDTO[]>(
      `Tours/Navigation?take=8${nileCruiseFilter}`,
    ).pipe(
      catchError(() => of(null)),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response) => {
      if (response === null) return;
      const rows = Array.isArray(response) ? response : response.data;
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
