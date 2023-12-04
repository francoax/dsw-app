/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss'],
})
export class UpdateDataComponent implements OnInit {
  updateDataForm!: FormGroup;
  name = new FormControl('');
  lastname = new FormControl('');
  address = new FormControl('');
  tel = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.minLength(8)]);
  loggedUser!: any;

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.updateDataForm = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      address: this.address,
      tel: this.tel,
      email: this.email,
      password: this.password,
    });

    if (!window.localStorage.getItem('loggedUser')) {
      this.loggedUser = null;
      this.updateDataForm.disable();
    } else {
      this.loggedUser = window.localStorage.getItem('loggedUser');
      this.loggedUser = JSON.parse(this.loggedUser);
      this.userService.getUser(this.loggedUser.token).subscribe({
        next: (res) => {
          const { data } = res;
          this.updateDataForm.setValue({
            name: data.name,
            lastname: data.lastname,
            address: data.address,
            tel: data.tel,
            email: data.email,
            password: '',
          });
        },
        error: () => {
          this.toastService.setup({
            message: 'Error al obtener los datos del usuario',
            status: false,
          });
          this.toastService.show();
        },
      });
      this.updateDataForm.disable();
    }
  }

  enableForm() {
    this.updateDataForm.disabled
      ? this.updateDataForm.enable()
      : this.updateDataForm.disable();
  }

  onSubmit() {
    if (this.updateDataForm.valid) {
      if (this.password.dirty) {
        const user: User = {
          name: this.updateDataForm.value.name,
          lastname: this.updateDataForm.value.lastname,
          address: this.updateDataForm.value.address,
          tel: parseInt(this.updateDataForm.value.tel),
          email: this.updateDataForm.value.email,
          password: this.updateDataForm.value.password,
        };
        this.userService.updateUser(user, this.loggedUser.token).subscribe();
      } else {
        const user: User = {
          name: this.updateDataForm.value.name,
          lastname: this.updateDataForm.value.lastname,
          address: this.updateDataForm.value.address,
          tel: parseInt(this.updateDataForm.value.tel),
          email: this.updateDataForm.value.email,
        };
        this.userService.updateUser(user, this.loggedUser.token).subscribe();
      }
    } else {
      this.toastService.setup({
        message: 'Verifique que los datos ingresados sean válidos',
        status: false,
      });
      this.toastService.show();
    }
  }

  deleteUser() {
    this.userService.deleteUser(this.loggedUser.token).subscribe({
      next: () => {
        window.localStorage.removeItem('loggedUser');
        this.router.navigate(['/confirmation'], {
          queryParams: { action: 'delete' },
        });
      },
    });
  }

  showModal(): void {
    this.modalComponent.open();
  }
}
