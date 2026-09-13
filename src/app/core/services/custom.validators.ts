import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function notZeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        let res=( value == 0|| value == null) ? { notZero: true } : null;
        
        return  res;
    }
}
export function isEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const email = /^\S+@\S+\.\S+$/;
        let Regex = new RegExp(email).test(value);
        return !Regex ? { isEmail: true } : null;
    }
}

/** Validates the exact date value emitted by app-date-picker, including manual input. */
export function validDate(includeTime = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value == null || value === '') return null;
        if (value instanceof Date) return Number.isNaN(value.getTime()) ? { invalidDate: true } : null;

        const pattern = includeTime
            ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/
            : /^(\d{4})-(\d{2})-(\d{2})$/;
        const match = String(value).match(pattern);
        if (!match) return { invalidDate: true };

        const year = Number(match[1]);
        const month = Number(match[2]) - 1;
        const day = Number(match[3]);
        const hours = includeTime ? Number(match[4]) : 0;
        const minutes = includeTime ? Number(match[5]) : 0;
        const date = new Date(year, month, day, hours, minutes, 0, 0);

        return date.getFullYear() === year
            && date.getMonth() === month
            && date.getDate() === day
            && date.getHours() === hours
            && date.getMinutes() === minutes
            ? null
            : { invalidDate: true };
    };
}


export function hasNumricChar(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value)
            return { hasNumricChar: true };
        var res = new RegExp('(?=.*[0-9])').test(value);
        return !res ? { hasNumricChar: true } : null;
    }
}
export function hasOnesSecialCharacter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value)
            return { hasOnesSecialCharacter: true };

        var res = new RegExp('(?=.*[$&+,:;=?@#|<>.^*()%!-])').test(value);
        return !res ? { hasOnesSecialCharacter: true } : null;

    }
}
export function hasOneUpperChar(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value)
            return { hasOneUpperChar: true };

        var res = new RegExp('(?=.*[A-Z])').test(value);
        return !res ? { hasOneUpperChar: true } : null;
    }
}
export function hasMinLength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value)
            return { hasMinLength: true };

        var res = new RegExp('^.{8,32}$').test(value);
        return !res ? { hasMinLength: true } : null;

    }
}

