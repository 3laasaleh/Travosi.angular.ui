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

  menuOpen = false;
  isLoading = false;
  loaded = false;
  packages: any[] = [];

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen && !this.loaded) this.loadPackages();
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  loadPackages(): void {
    this.isLoading = true;
    this.apiService.getUnauthntecated('Packages/GetAllPackages?page=1&pageSize=100').pipe(
      catchError(() => of(null)),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.packages ?? pageData;
      this.packages = Array.isArray(rows) ? rows : [];
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
