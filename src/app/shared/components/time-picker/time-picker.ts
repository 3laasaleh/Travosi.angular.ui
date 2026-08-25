import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextTimePickerId = 0;

@Component({
  selector: 'app-time-picker',
  standalone: true,
  host: { class: 'block w-full' },
  imports: [NgClass],
  templateUrl: './time-picker.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePicker),
      multi: true,
    },
  ],
  styles: [`
    :host input[type='time']::-webkit-calendar-picker-indicator {
      opacity: 0;
      pointer-events: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePicker implements ControlValueAccessor {
  private readonly instanceId = `flowbite-time-picker-${++nextTimePickerId}`;
  @ViewChild('timeInput', { static: true }) private timeInput?: ElementRef<HTMLInputElement>;

  @Input() id = '';
  @Input() placeholder = '';
  @Input() ariaLabel = '';
  @Input() inputClass = '';
  @Input() min: string | null = null;
  @Input() minExclusive = false;
  @Input() max: string | null = null;
  @Input() step = 60;

  value = '';
  isDisabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  get inputId(): string {
    return this.id || this.instanceId;
  }

  get effectiveMin(): string | null {
    if (!this.min || !this.minExclusive) return this.min;
    const match = this.min.match(/^(\d{2}):(\d{2})$/);
    if (!match) return this.min;
    const minutes = Number(match[1]) * 60 + Number(match[2]);
    const next = Math.min(23 * 60 + 59, minutes + Math.max(1, Math.ceil(this.step / 60)));
    return `${Math.floor(next / 60).toString().padStart(2, '0')}:${(next % 60).toString().padStart(2, '0')}`;
  }

  writeValue(value: string | null | undefined): void {
    this.value = this.normalizeTime(value);
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

  handleInput(event: Event): void {
    this.value = this.normalizeTime((event.target as HTMLInputElement).value);
    this.onChange(this.value);
    this.onTouched();
  }

  handleBlur(): void {
    this.onTouched();
  }

  openPicker(): void {
    if (this.isDisabled) return;
    const input = this.timeInput?.nativeElement;
    if (!input) return;
    input.focus();
    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
      } catch {
        // The focused native time input remains usable when showPicker is unavailable or blocked.
      }
    }
  }

  private normalizeTime(value: string | null | undefined): string {
    const match = String(value ?? '').match(/^(\d{2}):(\d{2})(?::\d{2}(?:\.\d{1,7})?)?$/);
    if (!match) return '';

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    return hours <= 23 && minutes <= 59 ? `${match[1]}:${match[2]}` : '';
  }
}
