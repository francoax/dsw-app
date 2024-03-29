import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ToastService } from '../toast/toast.service';

export const checkPasswords: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  return password?.value === passwordConfirm?.value
    ? null
    : { passwordsNotMatching: true };
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signInForm!: FormGroup;
  name = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  tel = new FormControl('', [
    Validators.pattern('[0-9]*'),
    Validators.required,
  ]);
  email = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);
  passwordConfirm = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);
  togglePassword = false;
  togglePasswordConf = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup(
      {
        name: this.name,
        lastname: this.lastname,
        address: this.address,
        tel: this.tel,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      },
      { validators: checkPasswords }
    );
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const user: User = {
        name: this.signInForm.value.name,
        lastname: this.signInForm.value.lastname,
        address: this.signInForm.value.address,
        tel: parseInt(this.signInForm.value.tel),
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
        role: 'user',
      };

      this.userService.saveUser(user).subscribe({
        next: () => {
          this.router.navigate(['/confirmation'], {
            queryParams: { action: 'signin' },
          });
        },
        error: ({ error: { message } }) => {
          this.toastService.setup({
            message,
            status: false,
          });
          this.toastService.show();
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
      this.toastService.setup({
        message: 'Verifique que los datos ingresados sean válidos',
        status: false,
      });
      this.toastService.show();
    }
  }
}
