import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Ensures populated localized fields contain at least one Arabic letter. */
export function arabicTextValidator(required = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = normalizedText(control.value);
    if (!value) return required ? { required: true } : null;
    return containsArabic(value) ? null : { arabicText: true };
  };
}

/** Returns true when the value contains at least one Arabic letter. */
export function containsArabic(value: unknown): boolean {
  return /[\u0621-\u063A\u0641-\u064A\u0671-\u06D3\u06FA-\u06FC\u06FF]/.test(normalizedText(value));
}

/** Returns true only when the first meaningful character is an Arabic letter. */
export function startsWithArabic(value: unknown): boolean {
  return /^[\u0621-\u063A\u0641-\u064A\u0671-\u06D3\u06FA-\u06FC\u06FF]/.test(normalizedText(value));
}

function normalizedText(value: unknown): string {
  return String(value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim();
}
