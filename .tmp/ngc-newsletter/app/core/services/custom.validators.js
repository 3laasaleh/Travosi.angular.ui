export function notZeroValidator() {
    return (control) => {
        const value = control.value;
        let res = (value == 0 || value == null) ? { notZero: true } : null;
        return res;
    };
}
export function isEmail() {
    return (control) => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const email = /^\S+@\S+\.\S+$/;
        let Regex = new RegExp(email).test(value);
        return !Regex ? { isEmail: true } : null;
    };
}
export function hasNumricChar() {
    return (control) => {
        const value = control.value;
        if (!value)
            return { hasNumricChar: true };
        var res = new RegExp('(?=.*[0-9])').test(value);
        return !res ? { hasNumricChar: true } : null;
    };
}
export function hasOnesSecialCharacter() {
    return (control) => {
        const value = control.value;
        if (!value)
            return { hasOnesSecialCharacter: true };
        var res = new RegExp('(?=.*[$&+,:;=?@#|<>.^*()%!-])').test(value);
        return !res ? { hasOnesSecialCharacter: true } : null;
    };
}
export function hasOneUpperChar() {
    return (control) => {
        const value = control.value;
        if (!value)
            return { hasOneUpperChar: true };
        var res = new RegExp('(?=.*[A-Z])').test(value);
        return !res ? { hasOneUpperChar: true } : null;
    };
}
export function hasMinLength() {
    return (control) => {
        const value = control.value;
        if (!value)
            return { hasMinLength: true };
        var res = new RegExp('^.{8,32}$').test(value);
        return !res ? { hasMinLength: true } : null;
    };
}
