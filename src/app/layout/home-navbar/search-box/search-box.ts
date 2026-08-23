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
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, map, of, switchMap, timer } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

type SearchResultType = 'destination' | 'tour' | 'package';

interface SearchResultItem {
  id: number;
  type: SearchResultType;
  titleEn: string;
  titleAr?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  route?: string | null;
}

interface SearchResultGroup {
  labelKey: string;
  icon: string;
  items: SearchResultItem[];
}

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './search-box.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBox implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  searchControl = new FormControl('', { nonNullable: true });
  resultsOpen = false;
  isLoading = false;
  searchFailed = false;
  groups: SearchResultGroup[] = [];

  get hasResults(): boolean {
    return this.groups.some((group) => group.items.length > 0);
  }

  displayName(item: SearchResultItem): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    const preferredTitle = arabic ? item.titleAr : item.titleEn;
    const fallbackTitle = arabic ? item.titleEn : item.titleAr;
    return preferredTitle?.trim() || fallbackTitle?.trim() || '';
  }

  displayDescription(item: SearchResultItem): string {
    return (item.description ?? '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        map((term) => term?.trim() ?? ''),
        distinctUntilChanged(),
        switchMap((term) =>
          term.length < 2 ? this.search(term) : timer(350).pipe(switchMap(() => this.search(term))),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((items) => {
        this.groups = this.buildGroups(items);
        this.cdr.markForCheck();
      });
  }

  onFocus(): void {
    if (this.searchControl.value.trim().length >= 2) this.resultsOpen = true;
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.groups = [];
    this.isLoading = false;
    this.searchFailed = false;
    this.resultsOpen = false;
  }

  closeResults(): void {
    this.resultsOpen = false;
  }

  navigateTo(item: SearchResultItem): void {
    const routeByType: Record<SearchResultType, string> = {
      destination: '/destinations',
      tour: '/tours',
      package: '/packages',
    };

    this.closeResults();
    void this.router.navigate([routeByType[item.type], item.id]);
  }

  private search(term: string) {
    const query = term.trim();
    if (query.length < 2) {
      this.groups = [];
      this.isLoading = false;
      this.searchFailed = false;
      this.resultsOpen = false;
      this.cdr.markForCheck();
      return of<SearchResultItem[]>([]);
    }

    this.isLoading = true;
    this.searchFailed = false;
    this.resultsOpen = true;
    this.cdr.markForCheck();

    return this.apiService
      .getUnauthntecated<{ data?: SearchResultItem[] } | SearchResultItem[]>(
        `Search?q=${encodeURIComponent(query)}&take=10`,
      )
      .pipe(
        map((response) => {
          const data = Array.isArray(response) ? response : (response?.data ?? []);
          return this.validItems(data);
        }),
        catchError(() => {
          this.searchFailed = true;
          return of<SearchResultItem[]>([]);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      );
  }

  private validItems(items: SearchResultItem[]): SearchResultItem[] {
    const validTypes: SearchResultType[] = ['destination', 'tour', 'package'];
    return items.filter(
      (item) =>
        Number.isInteger(item.id) &&
        item.id > 0 &&
        validTypes.includes(item.type) &&
        Boolean(item.titleEn || item.titleAr),
    );
  }

  private buildGroups(items: SearchResultItem[]): SearchResultGroup[] {
    const destinationItems = items.filter((item) => item.type === 'destination').slice(0, 10);
    const tourItems = items.filter((item) => item.type === 'tour').slice(0, 10);
    const packageItems = items.filter((item) => item.type === 'package').slice(0, 10);

    return [
      { labelKey: 'destinations', icon: 'mdi-map-marker-outline', items: destinationItems },
      { labelKey: 'tours', icon: 'mdi-compass-outline', items: tourItems },
      { labelKey: 'packages', icon: 'mdi-package-variant-closed', items: packageItems },
    ].filter((group) => group.items.length > 0);
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
