import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
  inject,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BsDatepickerConfig,
  BsDatepickerDirective,
  BsDatepickerModule,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { arLocale, defineLocale } from 'ngx-bootstrap/chronos';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

defineLocale('ar', arLocale);

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [BsDatepickerModule, NgClass],
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
export class DatePicker implements ControlValueAccessor, OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private readonly localeService = inject(BsLocaleService);

  @Input() min: string | null = null;
  @Input() max: string | null = null;
  @Input() id = '';
  @Input() placeholder = '';
  @Input() ariaLabel = '';
  @Input() inputClass = '';
  @Input() icon = 'mdi-calendar-month-outline';
  @Input() includeTime = false;

  selectedDate: Date | undefined;
  isDisabled = false;
  pickerConfig: Partial<BsDatepickerConfig> = {};

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.updateLanguage(this.translate.currentLang());
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ lang }) => this.updateLanguage(lang));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['includeTime']) this.updateLanguage(this.translate.currentLang());
  }

  get minDate(): Date | undefined {
    return this.parseDate(this.min);
  }

  get maxDate(): Date | undefined {
    return this.parseDate(this.max);
  }

  writeValue(value: string | Date | null | undefined): void {
    this.selectedDate = this.parseDate(value);
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
    this.cdr.markForCheck();
  }

  selectDate(value: Date | undefined): void {
    this.selectedDate = value;
    this.onChange(this.toModelValue(value));
    this.onTouched();
  }

  markTouched(): void {
    this.onTouched();
  }

  openCalendar(event: MouseEvent, picker: BsDatepickerDirective): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isDisabled) picker.show();
  }

  private updateLanguage(language: string | null | undefined): void {
    const isArabic = language?.toLowerCase().startsWith('ar') ?? false;
    this.localeService.use(isArabic ? 'ar' : 'en');
    this.pickerConfig = {
      adaptivePosition: true,
      containerClass: 'seaworld-datepicker',
      dateInputFormat: this.includeTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD',
      showWeekNumbers: false,
      showTodayButton: !this.includeTime,
      showClearButton: true,
      todayButtonLabel: isArabic ? 'اليوم' : 'Today',
      clearButtonLabel: isArabic ? 'مسح' : 'Clear',
      todayPosition: 'left',
      clearPosition: 'right',
      withTimepicker: this.includeTime,
      keepDatepickerOpened: this.includeTime,
      returnFocusToInput: true,
    };
    this.cdr.markForCheck();
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

  private toModelValue(value: Date | undefined): string {
    if (!value || Number.isNaN(value.getTime())) return '';

    const date = [
      value.getFullYear().toString().padStart(4, '0'),
      (value.getMonth() + 1).toString().padStart(2, '0'),
      value.getDate().toString().padStart(2, '0'),
    ].join('-');

    if (!this.includeTime) return date;

    return `${date}T${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`;
  }
}
