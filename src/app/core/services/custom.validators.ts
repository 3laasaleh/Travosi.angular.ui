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

