import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Ensures populated localized fields start with an Arabic character. */
export function arabicTextValidator(required = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .trim();
    if (!value) return required ? { required: true } : null;
    return /^[\u0600-\u06FF]/.test(value) ? null : { arabicText: true };
  };
}
