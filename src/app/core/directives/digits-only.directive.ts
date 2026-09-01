import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appDigitsOnly]',
  standalone: true,
  host: {
    inputmode: 'numeric',
  },
})
export class DigitsOnlyDirective {
  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  @HostListener('input')
  onInput(): void {
    const input = this.element.nativeElement;
    const originalValue = input.value;
    const originalCursor = input.selectionStart ?? originalValue.length;
    const sanitizedValue = originalValue.replace(/\D/g, '');

    if (sanitizedValue === originalValue) return;

    input.value = sanitizedValue;
    this.ngControl?.control?.setValue(sanitizedValue, { emitEvent: false });
    this.ngControl?.viewToModelUpdate(sanitizedValue);

    const removedBeforeCursor = originalValue.slice(0, originalCursor).length
      - originalValue.slice(0, originalCursor).replace(/\D/g, '').length;
    input.setSelectionRange(Math.max(0, originalCursor - removedBeforeCursor),
      Math.max(0, originalCursor - removedBeforeCursor));
  }
}
