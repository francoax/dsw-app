import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';

function validateDates(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const checkIn = formGroup.get('checkIn')?.value;
    const checkOut = formGroup.get('checkOut')?.value;

    if (checkIn && checkOut && new Date(checkOut) < new Date(checkIn)) {
      return { invalidDate: true };
    }

    return null;
  };
}

export { validateDates };
