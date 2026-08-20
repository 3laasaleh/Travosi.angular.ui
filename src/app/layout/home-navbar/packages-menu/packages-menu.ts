import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

@Component({
  selector: 'app-packages-menu',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './packages-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesMenu {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);

  @Input() layout: 'desktop' | 'mobile' = 'desktop';
  @Output() navigated = new EventEmitter<void>();

  menuOpen = false;
  isLoading = false;
  loaded = false;
  packages: any[] = [];
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  get isMobile(): boolean { return this.layout === 'mobile'; }

  packageName(item: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (item?.nameAr ?? item?.titleAr ?? item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? '')
      : (item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? item?.nameAr ?? item?.titleAr ?? '');
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen && !this.loaded && !this.isLoading) this.loadPackages();
  }

  openMenu(): void {
    if (this.isMobile) return;
    this.cancelClose();
    this.menuOpen = true;
    if (!this.loaded && !this.isLoading) this.loadPackages();
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

  loadPackages(): void {
    this.isLoading = true;
    this.apiService.getUnauthntecated('Packages?page=1&pageSize=8').pipe(
      catchError(() => of(null)),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.packages ?? pageData;
      this.packages = Array.isArray(rows) ? rows.slice(0, 8) : [];
      this.loaded = true;
    });
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!this.isMobile && !this.elementRef.nativeElement.contains(event.target as Node)) this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void { this.closeMenu(); }
}
