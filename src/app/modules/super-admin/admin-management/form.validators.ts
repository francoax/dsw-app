import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const checkPasswords: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
  const password = control.get('password ' ) ;
  const repeatedPassword = control.get('repeatedPassword');
  return password?.value === repeatedPassword?.value
    ? null
    :{ passwordsNotMatching: true };
}