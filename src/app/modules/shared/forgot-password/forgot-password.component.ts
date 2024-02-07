/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ToastService } from '../toast/toast.service';

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
  setMailForm!: FormGroup;
  setPasswordForm!: FormGroup;
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
  authEmail = false;

  constructor(
    private userService: UserService,
    private route: Router,
    private routeData: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.authEmail = this.routeData.snapshot.data['mailAuth'];
    if (this.routeData.snapshot.paramMap.get('token')) {
      try {
        jwtDecode(this.routeData.snapshot.paramMap.get('token')!);
      } catch (error) {
        this.route.navigate(['/login']);
        this.toastService.setup({ message: 'Token inválido', status: false });
        this.toastService.show();
      }
    }

    this.setMailForm = new FormGroup({
      mail: this.mail,
    });
    this.setPasswordForm = new FormGroup(
      {
        newPassword: this.newPassword,
        repeatPassword: this.repeatPassword,
      },
      { validators: checkPasswords }
    );
  }

  onSubmitMail() {
    if (this.setMailForm.valid) {
      const user: any = {
        email: this.setMailForm.value.mail,
      };
      this.userService.getAll().subscribe((res) => {
        const users: User[] = res.data;
        const userFound = users.find((u) => u.email === user.email);
        if (userFound != undefined) {
          this.userService.sendPasswordResetEmail(user.email).subscribe({
            next: (res) => {
              this.toastService.setup({ message: res.message, status: true });
              this.toastService.show();
            },
            error: (err) => {
              this.toastService.setup({ message: err.message, status: false });
              this.toastService.show();
            },
          });
        } else {
          this.responseError = 'El email ingresado no está registrado';
          setTimeout(() => (this.responseError = ''), 2500);
        }
      });
    } else {
      alert('Verifique que los datos ingresados sean válidos');
    }
  }

  onSubmitPassword() {
    if (this.setPasswordForm.valid) {
      const token = this.routeData.snapshot.paramMap.get('token');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const decoded = JSON.parse(JSON.stringify(jwtDecode(token!)));
      const user: any = {
        id: decoded.userId,
        password: this.setPasswordForm.value.newPassword,
      };
      this.userService.resetPassword(user.id, user).subscribe((res) => {
        this.toastService.setup({ message: res.message, status: true });
        this.toastService.show();
        this.route.navigate(['/login']);
      });
    } else {
      alert('Verifique que los datos ingresados sean válidos');
    }
  }
}
