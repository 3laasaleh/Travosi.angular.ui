import { isPlatformBrowser, NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Datepicker as FlowbiteDatepicker } from 'flowbite';
import type { DatepickerOptions } from 'flowbite';

const ARABIC_LOCALE = {
  days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  daysShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  daysMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  months: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  monthsShort: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  today: 'اليوم',
  clear: 'مسح',
  titleFormat: 'MM y',
  format: 'yyyy-mm-dd',
  weekStart: 6,
};

let nextDatePickerId = 0;
let arabicLocaleRegistered = false;

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [NgClass],
  templateUrl: './date-picker.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker implements ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly instanceId = `flowbite-datepicker-${++nextDatePickerId}`;

  @ViewChild('dateInput') private dateInput?: ElementRef<HTMLInputElement>;

  @Input() min: string | null = null;
  @Input() max: string | null = null;
  @Input() id = '';
  @Input() placeholder = '';
  @Input() ariaLabel = '';
  @Input() inputClass = '';
  @Input() icon = 'mdi-calendar-month-outline';
  @Input() includeTime = false;

  selectedDate: Date | undefined;
  timeValue = '00:00';
  isDisabled = false;
  isArabic = false;

  private picker: FlowbiteDatepicker | null = null;
  private viewInitialized = false;
  private syncingPicker = false;
  private removeDateChangeListener: (() => void) | null = null;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.isArabic = this.translate.currentLang()?.toLowerCase().startsWith('ar') ?? false;
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ lang }) => {
        const nextIsArabic = lang.toLowerCase().startsWith('ar');
        if (nextIsArabic === this.isArabic) return;
        this.isArabic = nextIsArabic;
        this.cdr.markForCheck();
        this.schedulePickerRebuild();
      });
  }

  get inputId(): string {
    return this.id || this.instanceId;
  }

  get timeInputId(): string {
    return `${this.inputId}-time`;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.viewInitialized = true;
    const input = this.dateInput?.nativeElement;
    if (!input) return;

    const listener = () => this.handleDateSelection();
    input.addEventListener('changeDate', listener);
    this.removeDateChangeListener = () => input.removeEventListener('changeDate', listener);
    this.initializePicker();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['min'] || changes['max']) this.schedulePickerRebuild();
  }

  ngOnDestroy(): void {
    this.removeDateChangeListener?.();
    this.destroyPicker();
  }

  writeValue(value: string | Date | null | undefined): void {
    this.selectedDate = this.parseDate(value);
    this.timeValue = this.parseTime(value);
    this.syncPickerValue();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) this.picker?.hide();
    this.cdr.markForCheck();
  }

  handleDateInputBlur(): void {
    this.onTouched();
  }

  handleTimeChange(event: Event): void {
    this.timeValue = (event.target as HTMLInputElement).value || '00:00';
    this.emitModelValue();
  }

  handleTimeBlur(): void {
    this.onTouched();
  }

  private initializePicker(): void {
    const input = this.dateInput?.nativeElement;
    if (!input) return;

    this.registerArabicLocale(input);

    const options: DatepickerOptions = {
      autohide: true,
      format: 'yyyy-mm-dd',
      minDate: this.normalizeBoundary(this.min),
      maxDate: this.normalizeBoundary(this.max),
      orientation: 'bottom',
      buttons: true,
      autoSelectToday: 1,
      language: this.isArabic ? 'ar' : 'en',
      rangePicker: false,
    };

    this.picker = new FlowbiteDatepicker(input, options, {
      id: this.instanceId,
      override: true,
    });
    this.syncPickerValue();
  }

  private registerArabicLocale(input: HTMLInputElement): void {
    if (arabicLocaleRegistered) return;

    const bootstrapPicker = new FlowbiteDatepicker(
      input,
      { format: 'yyyy-mm-dd', language: 'en' },
      { id: `${this.instanceId}-locale-bootstrap`, override: true },
    );
    const innerPicker = bootstrapPicker.getDatepickerInstance() as any;
    innerPicker.constructor.locales.ar = ARABIC_LOCALE;
    bootstrapPicker.destroyAndRemoveInstance();
    arabicLocaleRegistered = true;
  }

  private handleDateSelection(): void {
    if (this.syncingPicker || !this.picker) return;

    const innerPicker = this.picker.getDatepickerInstance() as any;
    const value = innerPicker.getDate() as Date | undefined;
    this.selectedDate = value && !Number.isNaN(value.getTime())
      ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
      : undefined;
    this.emitModelValue();
    this.cdr.markForCheck();
  }

  private emitModelValue(): void {
    this.onChange(this.toModelValue(this.selectedDate));
    this.onTouched();
  }

  private syncPickerValue(): void {
    if (!this.picker) return;

    const innerPicker = this.picker.getDatepickerInstance() as any;
    this.syncingPicker = true;
    try {
      if (this.selectedDate) {
        innerPicker.setDate(this.selectedDate, { autohide: false });
      } else {
        innerPicker.setDate({ clear: true, autohide: false });
      }
    } finally {
      this.syncingPicker = false;
    }
  }

  private schedulePickerRebuild(): void {
    if (!isPlatformBrowser(this.platformId) || !this.viewInitialized) return;
    queueMicrotask(() => {
      if (!this.viewInitialized) return;
      this.destroyPicker();
      this.initializePicker();
    });
  }

  private destroyPicker(): void {
    this.picker?.destroyAndRemoveInstance();
    this.picker = null;
  }

  private normalizeBoundary(value: string | null): string | null {
    const date = this.parseDate(value);
    return date ? this.formatDate(date) : null;
  }

  private parseDate(value: string | Date | null | undefined): Date | undefined {
    if (!value) return undefined;
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? undefined : new Date(value.getTime());
    }

    const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/);
    if (!match) return undefined;

    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const hours = this.includeTime ? Number(match[4] ?? 0) : 0;
    const minutes = this.includeTime ? Number(match[5] ?? 0) : 0;
    const date = new Date(year, month, day, hours, minutes, 0, 0);

    return date.getFullYear() === year
      && date.getMonth() === month
      && date.getDate() === day
      && date.getHours() === hours
      && date.getMinutes() === minutes
      ? date
      : undefined;
  }

  private parseTime(value: string | Date | null | undefined): string {
    if (!this.includeTime || !value) return '00:00';
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`;
    }

    const match = String(value).match(/[T\s](\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : '00:00';
  }

  private formatDate(value: Date): string {
    return [
      value.getFullYear().toString().padStart(4, '0'),
      (value.getMonth() + 1).toString().padStart(2, '0'),
      value.getDate().toString().padStart(2, '0'),
    ].join('-');
  }

  private toModelValue(value: Date | undefined): string {
    if (!value || Number.isNaN(value.getTime())) return '';
    const date = this.formatDate(value);
    return this.includeTime ? `${date}T${this.timeValue || '00:00'}` : date;
  }
}
