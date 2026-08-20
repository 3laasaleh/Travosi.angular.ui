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
import { catchError, debounceTime, distinctUntilChanged, finalize, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

interface SearchResultGroup {
  labelKey: string;
  icon: string;
  items: any[];
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
  groups: SearchResultGroup[] = [];

  get hasResults(): boolean {
    return this.groups.some((group) => group.items.length > 0);
  }

  displayName(item: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    return arabic ? (item?.titleAr ?? item?.titleEn ?? item?.title ?? '') : (item?.titleEn ?? item?.title ?? '');
  }

  displayDescription(item: any): string {
    const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
    const text = item?.description ?? '';
    if (!text) return '';
    return arabic ? text : text;
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        map((term) => term?.trim() ?? ''),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term) => this.search(term)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((items) => {
        this.groups = this.buildGroups(items);
        this.resultsOpen = this.groups.some((group) => group.items.length > 0);
        this.cdr.markForCheck();
      });
  }

  onFocus(): void {
    if (this.searchControl.value.trim().length >= 2) this.resultsOpen = true;
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.groups = [];
    this.resultsOpen = false;
  }

  closeResults(): void {
    this.resultsOpen = false;
  }

  navigateTo(item: any): void {
    if (!item?.route) return;
    this.closeResults();
    void this.router.navigateByUrl(item.route);
  }

  private search(term: string) {
    const query = term.trim();
    if (query.length < 2) {
      this.groups = [];
      this.resultsOpen = false;
      this.cdr.markForCheck();
      return of([]);
    }

    this.isLoading = true;
    this.cdr.markForCheck();

    return this.apiService.getUnauthntecated<any>(`Search?q=${encodeURIComponent(query)}&take=10`).pipe(
      map((response: any) => {
        const data = response?.data ?? response ?? [];
        return Array.isArray(data) ? data : [];
      }),
      catchError(() => of([])),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    );
  }

  private buildGroups(items: any[]): SearchResultGroup[] {
    const destinationItems = items.filter((item) => item?.type === 'destination').slice(0, 10);
    const tourItems = items.filter((item) => item?.type === 'tour').slice(0, 10);
    const packageItems = items.filter((item) => item?.type === 'package').slice(0, 10);

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
