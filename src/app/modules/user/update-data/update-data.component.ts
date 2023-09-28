/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userService: UserService) {}

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
    //modal de confirmacion
    this.userService.deleteUser(this.loggedUser.token).subscribe({
      next: (res) => {
        console.log(res);
        window.localStorage.removeItem('loggedUser');
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
