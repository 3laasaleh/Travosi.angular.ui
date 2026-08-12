import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

@Component({
  selector: 'app-destinations-menu', standalone: true, imports: [RouterLink, TranslatePipe, DecimalPipe],
  templateUrl: './destinations-menu.html', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsMenu {
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);
  menuOpen = false; isLoading = false; loaded = false;
  destinations: any[] = []; selectedDestination: any = null; selectedCity: any = null;
  destinationName(item: any): string { return this.isArabic ? item?.nameAr ?? item?.nameEng ?? '' : item?.nameEng ?? item?.nameAr ?? ''; }
  cityName(item: any): string { return this.destinationName(item); }
  tourName(item: any): string { return this.isArabic ? item?.titleAr ?? item?.titleEng ?? '' : item?.titleEng ?? item?.titleAr ?? ''; }
  get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
  get cities(): any[] { return this.selectedDestination?.cities ?? []; }
  get tours(): any[] { return this.selectedCity?.tours ?? []; }
  toggleMenu(event: MouseEvent): void { event.stopPropagation(); this.menuOpen = !this.menuOpen; if (this.menuOpen && !this.loaded) this.loadHierarchy(); }
  closeMenu(): void { this.menuOpen = false; }
  selectDestination(destination: any): void { this.selectedDestination = destination; this.selectedCity = destination?.cities?.[0] ?? null; }
  selectCity(city: any): void { this.selectedCity = city; }
  private loadHierarchy(): void {
    this.isLoading = true;
    this.api.getUnauthntecated('Destinations/Navigation?takeDestinations=10&takeCities=10&takeTours=8').pipe(
      catchError(() => of(null)), finalize(() => { this.isLoading = false; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      const data = response?.data ?? response;
      const rows = data?.data ?? data?.destinations ?? data;
      this.destinations = Array.isArray(rows) ? rows : [];
      this.selectDestination(this.destinations[0]); this.loaded = true;
    });
  }
  @HostListener('document:click', ['$event']) closeOnOutsideClick(event: MouseEvent): void { if (!this.elementRef.nativeElement.contains(event.target as Node)) this.closeMenu(); }
}
