export class FormValdiatorService {
    hasError = (form, controlName, errorName) => {
        return form.controls[controlName].hasError(errorName);
    };
}
