import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { LanguageService } from '../../../core/services/language.service';
import { DatePicker } from '../date-picker/date-picker';

export interface CatalogTravelers {
  adults: number;
  children: number;
  infants: number;
}

export interface CatalogBookingSelection extends CatalogTravelers {
  dateFrom: string;
  dateTo: string;
}

/**
 * Hotel-style search controls shared by the public catalogues.
 * Hotels can project their destination and guest selectors into the same form.
 */
@Component({
  selector: 'app-catalog-search-form',
  standalone: true,
  imports: [FormsModule, TranslatePipe, DatePicker],
  templateUrl: './catalog-search-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSearchForm implements OnInit {
  private readonly api = inject(ApiService);
  private readonly language = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly destinationControl = viewChild<ElementRef<HTMLElement>>('destinationControl');
  private readonly guestControl = viewChild<ElementRef<HTMLElement>>('guestControl');
  private readonly destinations = signal<any[]>([]);
  readonly destinationMenuOpen = signal(false);
  readonly guestMenuOpen = signal(false);
  readonly guestTypes = [
    { key: 'adults', ageLabel: 'adultsAgeLabel', minimum: 1 },
    { key: 'children', ageLabel: 'childrenAgeLabel', minimum: 0 },
    { key: 'infants', ageLabel: 'infantsAgeLabel', minimum: 0 },
  ] as const;
  @Input() formClass = 'relative grid w-full min-w-0 gap-1 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto]';
  @Input() showSearchControls = false;
  @Input() inputId = 'catalog-search';
  @Input() query = '';
  @Input() dateFrom = '';
  @Input() dateTo = '';
  @Input() suggestions: string[] = [];
  @Input() loading = false;
  @Input() dateRangeError = false;
  @Input() travelers: CatalogTravelers = { adults: 1, children: 0, infants: 0 };
  @Input() searchPlaceholder = 'search';
  @Output() travelersChange = new EventEmitter<CatalogTravelers>();
  @Output() queryChange = new EventEmitter<string>();
  @Output() dateFromChange = new EventEmitter<string>();
  @Output() dateToChange = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();

  ngOnInit(): void {
    if (!this.showSearchControls) return;
    this.api.getUnauthntecated('destinations?page=1&pageSize=500')
      .pipe(catchError(() => of(null)), takeUntilDestroyed(this.destroyRef))
      .subscribe((response: any) => {
        const data = response?.data ?? response;
        const rows = data?.data ?? data?.items ?? data?.destinations ?? data;
        this.destinations.set(Array.isArray(rows) ? rows.filter(item => item?.isActive !== false) : []);
      });
  }

  get filteredSuggestions(): string[] {
    const arabic = this.language.currentLanguage() === 'ar';
    const names = this.destinations().map(item => arabic
      ? item.nameAr || item.title || item.nameAr || item.name || item.nameEng || item.nameEng || ''
      : item.nameEng || item.title || item.nameEng || item.name || item.nameAr || item.nameAr || '');
    const query = this.query.trim().toLocaleLowerCase();
    return [...new Set([...names, ...this.suggestions].map(value => String(value).trim()).filter(Boolean))]
      .filter(value => value.toLocaleLowerCase().includes(query)).slice(0, 8);
  }

  @HostListener('document:click', ['$event'])
  closeMenusOnOutsideClick(event: MouseEvent): void {
    if (!this.destinationControl()?.nativeElement.contains(event.target as Node)) this.destinationMenuOpen.set(false);
    if (!this.guestControl()?.nativeElement.contains(event.target as Node)) this.guestMenuOpen.set(false);
  }

  closeOnFocusOut(event: FocusEvent, menu: 'destination' | 'guest'): void {
    const control = menu === 'destination' ? this.destinationControl() : this.guestControl();
    if (!control?.nativeElement.contains(event.relatedTarget as Node | null)) {
      (menu === 'destination' ? this.destinationMenuOpen : this.guestMenuOpen).set(false);
    }
  }

  selectSuggestion(value: string): void {
    this.query = value;
    this.queryChange.emit(value);
    this.destinationMenuOpen.set(false);
  }

  updateGuestCount(key: keyof CatalogTravelers, change: number): void {
    this.travelers = { ...this.travelers, [key]: Math.max(key === 'adults' ? 1 : 0, this.travelers[key] + change) };
    this.travelersChange.emit(this.travelers);
  }

  submit(event: Event): void {
    event.preventDefault();
    this.destinationMenuOpen.set(false);
    this.guestMenuOpen.set(false);
    if (!this.loading) this.submitted.emit();
  }
}
