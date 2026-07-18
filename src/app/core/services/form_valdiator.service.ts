import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValdiatorService {

    public hasError = ( form :FormGroup,controlName: string, errorName: string) => {
        return form.controls[controlName].hasError(errorName);
      };

}