import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appNumbersOnly]',
  standalone: true,
  host: {
    inputmode: 'decimal',
  },
})
export class NumbersOnlyDirective {
  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  @HostListener('input')
  onInput(): void {
    const input = this.element.nativeElement;
    const originalValue = input.value;
    const originalCursor = input.selectionStart ?? originalValue.length;
    const sanitizedValue = this.sanitize(originalValue);
    if (sanitizedValue === originalValue) return;

    input.value = sanitizedValue;
    this.ngControl?.control?.setValue(sanitizedValue, { emitEvent: false });
    this.ngControl?.viewToModelUpdate(sanitizedValue);
    const removedBeforeCursor =
      originalValue.slice(0, originalCursor).length -
      this.sanitize(originalValue.slice(0, originalCursor)).length;
    const cursor = Math.max(0, originalCursor - removedBeforeCursor);
    input.setSelectionRange(cursor, cursor);
  }

  private sanitize(value: string): string {
    const cleaned = value.replace(/[^\d.]/g, '');
    const [integerPart = '', ...decimalParts] = cleaned.split('.');
    return decimalParts.length ? `${integerPart}.${decimalParts.join('')}` : integerPart;
  }
}
