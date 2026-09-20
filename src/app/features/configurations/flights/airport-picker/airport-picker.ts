import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, OnDestroy, Output, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AirportSearchResult, AirportSearchService } from '../airport-search.service';

@Component({
  selector: 'app-airport-picker',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './airport-picker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AirportPicker), multi: true }],
})
export class AirportPicker implements ControlValueAccessor, OnDestroy {
  @Input({ required: true }) inputId = '';
  @Input({ required: true }) labelKey = '';
  @Input() requiredErrorKey = '';
  @Input() showValidation = false;
  @Input() compact = false;
  @Output() airportSelected = new EventEmitter<void>();

  displayValue = '';
  results: AirportSearchResult[] = [];
  loading = false;
  searchFailed = false;
  open = false;
  activeIndex = -1;
  disabled = false;

  private selectedCode = '';
  private searchSequence = 0;
  private searchTimer?: ReturnType<typeof setTimeout>;
  private blurTimer?: ReturnType<typeof setTimeout>;
  private readonly destroyRef = inject(DestroyRef);
  private readonly airportSearch = inject(AirportSearchService);
  private readonly cdr = inject(ChangeDetectorRef);
  private onChange: (code: string) => void = () => {};
  private onTouched: () => void = () => {};

  get resultsId(): string { return `${this.inputId}-results`; }
  get activeDescendant(): string | null { return this.open && this.activeIndex >= 0 ? `${this.inputId}-option-${this.activeIndex}` : null; }

  writeValue(value: string | null): void {
    const code = String(value ?? '').trim().toUpperCase();
    if (code === this.selectedCode && this.displayValue) return;
    this.selectedCode = code;
    this.cancelSearch();
    this.results = [];
    this.open = false;
    this.displayValue = code;
    if (code) {
      const sequence = this.searchSequence;
      this.airportSearch.search({ query: code, limit: 20 }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (results) => {
          if (sequence !== this.searchSequence || this.selectedCode !== code) return;
          const airport = results.find((result) => result.code === code);
          if (airport) this.displayValue = airport.value;
          this.cdr.markForCheck();
        },
        error: () => this.cdr.markForCheck(),
      });
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (code: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.disabled = disabled; this.cdr.markForCheck(); }

  onInput(value: string): void {
    this.displayValue = value;
    this.selectedCode = '';
    this.onChange('');
    this.cancelSearch();
    this.results = [];
    this.activeIndex = -1;
    this.searchFailed = false;
    const query = value.trim();
    this.open = query.length >= 2;
    this.loading = this.open;
    if (!this.open) return;

    const sequence = this.searchSequence;
    this.searchTimer = setTimeout(() => {
      this.airportSearch.search({ query, limit: 20 }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (results) => {
          if (sequence !== this.searchSequence) return;
          this.results = results;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          if (sequence !== this.searchSequence) return;
          this.loading = false;
          this.searchFailed = true;
          this.cdr.markForCheck();
        },
      });
    }, 200);
  }

  onFocus(): void {
    if (this.blurTimer) clearTimeout(this.blurTimer);
    if (this.displayValue.trim().length >= 2 && (this.results.length || this.loading || this.searchFailed)) this.open = true;
  }

  onBlur(): void {
    this.onTouched();
    this.blurTimer = setTimeout(() => { this.open = false; this.activeIndex = -1; this.cdr.markForCheck(); }, 160);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') { this.open = false; this.activeIndex = -1; return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.results.length) return;
      this.open = true;
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      this.activeIndex = this.activeIndex < 0 ? (offset > 0 ? 0 : this.results.length - 1) : (this.activeIndex + offset + this.results.length) % this.results.length;
    }
    if (event.key === 'Enter' && this.open && this.activeIndex >= 0) {
      event.preventDefault();
      this.select(this.results[this.activeIndex]);
    }
  }

  select(airport: AirportSearchResult): void {
    if (!airport) return;
    this.cancelSearch();
    this.selectedCode = airport.code;
    this.displayValue = airport.value;
    this.results = [];
    this.open = false;
    this.activeIndex = -1;
    this.onChange(airport.code);
    this.onTouched();
    this.airportSelected.emit();
    this.cdr.markForCheck();
  }

  location(airport: AirportSearchResult): string { return [airport.city, airport.country].filter(Boolean).join(', '); }

  ngOnDestroy(): void {
    this.cancelSearch();
    if (this.blurTimer) clearTimeout(this.blurTimer);
  }

  private cancelSearch(): void {
    this.searchSequence++;
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.loading = false;
  }
}
