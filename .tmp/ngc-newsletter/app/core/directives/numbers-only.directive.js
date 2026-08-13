import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
export class NumbersOnlyDirective {
    element = inject(ElementRef);
    ngControl = inject(NgControl, { optional: true, self: true });
    onInput() {
        const input = this.element.nativeElement;
        const originalValue = input.value;
        const originalCursor = input.selectionStart ?? originalValue.length;
        const sanitizedValue = this.sanitize(originalValue);
        if (sanitizedValue === originalValue)
            return;
        input.value = sanitizedValue;
        this.ngControl?.control?.setValue(sanitizedValue, { emitEvent: false });
        this.ngControl?.viewToModelUpdate(sanitizedValue);
        const removedBeforeCursor = originalValue.slice(0, originalCursor).length -
            this.sanitize(originalValue.slice(0, originalCursor)).length;
        const cursor = Math.max(0, originalCursor - removedBeforeCursor);
        input.setSelectionRange(cursor, cursor);
    }
    sanitize(value) {
        const cleaned = value.replace(/[^\d.]/g, '');
        const [integerPart = '', ...decimalParts] = cleaned.split('.');
        return decimalParts.length ? `${integerPart}.${decimalParts.join('')}` : integerPart;
    }
    static ɵfac = function NumbersOnlyDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NumbersOnlyDirective)(); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: NumbersOnlyDirective, selectors: [["input", "appNumbersOnly", ""]], hostAttrs: ["inputmode", "decimal"], hostBindings: function NumbersOnlyDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("input", function NumbersOnlyDirective_input_HostBindingHandler() { return ctx.onInput(); });
        } } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumbersOnlyDirective, [{
        type: Directive,
        args: [{
                selector: 'input[appNumbersOnly]',
                standalone: true,
                host: {
                    inputmode: 'decimal',
                },
            }]
    }], null, { onInput: [{
            type: HostListener,
            args: ['input']
        }] }); })();
