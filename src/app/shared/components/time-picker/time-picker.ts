import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePicker implements ControlValueAccessor {
  private readonly instanceId = `flowbite-time-picker-${++nextTimePickerId}`;

  @Input() id = '';
  @Input() placeholder = '';
  @Input() ariaLabel = '';
  @Input() inputClass = '';

  value = '';
  isDisabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  get inputId(): string {
    return this.id || this.instanceId;
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

  private normalizeTime(value: string | null | undefined): string {
    const match = String(value ?? '').match(/^(\d{2}):(\d{2})(?::\d{2}(?:\.\d{1,7})?)?$/);
    if (!match) return '';

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    return hours <= 23 && minutes <= 59 ? `${match[1]}:${match[2]}` : '';
  }
}
