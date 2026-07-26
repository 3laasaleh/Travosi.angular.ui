import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
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

  menuOpen = false;
  isLoading = false;
  loaded = false;
  tours: any[] = [];

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen && !this.loaded) this.loadTours();
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  loadTours(): void {
    this.isLoading = true;
    this.apiService.getUnauthntecated('Tours?page=1&pageSize=100').pipe(
      catchError(() => of(null)),
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

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }
}
