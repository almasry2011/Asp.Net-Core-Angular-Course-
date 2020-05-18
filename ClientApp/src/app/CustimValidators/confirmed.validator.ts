import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}







// Custom Validator

export function MustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (cpasswordControl: AbstractControl): { [key: string]: boolean } | null => {
        // return null if controls haven't initialised yet
        if (!passwordControl && !cpasswordControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (cpasswordControl.hasError && !passwordControl.hasError) {
            return null;
        }
        // set error on matchingControl if validation fails
        if (passwordControl.value !== cpasswordControl.value) {
            return { 'mustMatch': true };
        }
        else {
            return null;
        }

    }


}