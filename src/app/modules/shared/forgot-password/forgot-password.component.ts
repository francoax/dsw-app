/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

export const checkPasswords: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('newPassword');
  const passwordConfirm = control.get('repeatPassword');
  return password?.value === passwordConfirm?.value
    ? null
    : { passwordsNotMatching: true };
};

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  mail = new FormControl('', [Validators.required, Validators.email]);
  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  repeatPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  responseError = '';

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit() {
    this.resetPasswordForm = new FormGroup(
      {
        mail: this.mail,
        newPassword: this.newPassword,
        repeatPassword: this.repeatPassword,
      },
      { validators: checkPasswords }
    );
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const user: any = {
        email: this.resetPasswordForm.value.mail,
        password: this.resetPasswordForm.value.newPassword,
      };
      this.userService.getAll().subscribe((res) => {
        const users: User[] = res.data;
        const userFound = users.find((u) => u.email === user.email);
        if (userFound != undefined) {
          const id = userFound._id ? userFound._id : '';
          this.userService.updateUserById(id, user).subscribe({
            next: () => this.route.navigate(['/login']),
            error: () =>
              (this.responseError =
                'Ha ocurrido un error al procesar la información'),
          });
        } else {
          this.responseError = 'El email ingresado no está registrado';
        }
      });
    } else {
      alert('Verifique que los datos ingresados sean válidos');
    }
  }
}
