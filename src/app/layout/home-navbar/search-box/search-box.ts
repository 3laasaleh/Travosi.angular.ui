import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, debounceTime, distinctUntilChanged, forkJoin, map, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

interface SearchResultGroup {
  labelKey: string;
  icon: string;
  route: string;
  items: any[];
}

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './search-box.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBox implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);

  searchControl = new FormControl('', { nonNullable: true });
  resultsOpen = false;
  isLoading = false;
  private loaded = false;

  private destinations: any[] = [];
  private tours: any[] = [];
  private packages: any[] = [];

  groups: SearchResultGroup[] = [];

  get hasResults(): boolean {
    return this.groups.some((group) => group.items.length > 0);
  }

  displayName(item: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (item?.nameAr ?? item?.titleAr ?? item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? '')
      : (item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? item?.nameAr ?? item?.titleAr ?? '');
  }

  displayDescription(item: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic
      ? (item?.subDescriptionAr ?? item?.descriptionAr ?? item?.subDescription ?? item?.description ?? '')
      : (item?.subDescriptionEng ?? item?.descriptionEng ?? item?.subDescription ?? item?.description ?? '');
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => this.search(term));
  }

  onFocus(): void {
    this.ensureDataLoaded();
    if (this.searchControl.value.trim().length >= 2) this.resultsOpen = true;
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.resultsOpen = false;
  }

  closeResults(): void {
    this.resultsOpen = false;
  }

  private search(term: string): void {
    const query = term.trim().toLowerCase();
    if (query.length < 2) {
      this.resultsOpen = false;
      this.groups = [];
      this.cdr.markForCheck();
      return;
    }
    this.ensureDataLoaded();
    const matches = (items: any[]) =>
      items
        .filter((item) => {
          const name = `${item.nameEng ?? item.name ?? ''} ${item.nameAr ?? ''}`.toLowerCase();
          return name.includes(query);
        })
        .slice(0, 5);

    this.groups = [
      { labelKey: 'destinations', icon: 'mdi-map-marker-outline', route: '/destinations', items: matches(this.destinations) },
      { labelKey: 'tours', icon: 'mdi-compass-outline', route: '/tours', items: matches(this.tours) },
      { labelKey: 'packages', icon: 'mdi-package-variant-closed', route: '/packages', items: matches(this.packages) },
    ];
    this.resultsOpen = true;
    this.cdr.markForCheck();
  }

  private ensureDataLoaded(): void {
    if (this.loaded || this.isLoading) return;
    this.isLoading = true;

    const load = (url: string, key: string) =>
      this.apiService.getUnauthntecated(url).pipe(
        map((response: any) => {
          const pageData = response?.data ?? response;
          const rows = pageData?.data ?? pageData?.items ?? pageData?.[key] ?? pageData;
          return Array.isArray(rows) ? rows : [];
        }),
        catchError(() => of([])),
      );

    forkJoin({
      destinations: load('destinations?page=1&pageSize=100', 'destinations'),
      tours: load('Tours?page=1&pageSize=100', 'tours'),
      packages: load('Packages?page=1&pageSize=100', 'packages'),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ destinations, tours, packages }) => {
        this.destinations = destinations;
        this.tours = tours;
        this.packages = packages;
        this.loaded = true;
        this.isLoading = false;
        this.search(this.searchControl.value);
      });
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.resultsOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.resultsOpen = false;
  }
}
