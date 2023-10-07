/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {}

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
            password: data.password,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onSubmit() {
    if (this.updateDataForm.valid) {
      const user: User = {
        name: this.updateDataForm.value.name,
        lastname: this.updateDataForm.value.lastname,
        address: this.updateDataForm.value.address,
        tel: parseInt(this.updateDataForm.value.tel),
        email: this.updateDataForm.value.email,
        password: this.updateDataForm.value.password,
      };

      this.userService
        .updateUser(user, this.loggedUser.token)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      alert('Verifique que los datos ingresados sean válidos');
    }
  }

  deleteUser() {
    this.userService.deleteUser(this.loggedUser.token).subscribe({
      next: (res) => {
        console.log(res);
        window.localStorage.removeItem('loggedUser');
        this.router.navigate(['/user']);
      },
    });
  }

  showModal(): void {
    this.modalComponent.open();
  }
}
