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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // armo el form group con todos los form controls
    this.updateDataForm = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      address: this.address,
      tel: this.tel,
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.updateDataForm.valid) {
      const user: User = {
        id: 'id', //obtener el id desde el token jwt
        name: this.updateDataForm.value.name,
        lastname: this.updateDataForm.value.lastname,
        address: this.updateDataForm.value.address,
        tel: parseInt(this.updateDataForm.value.tel),
        email: this.updateDataForm.value.email,
        password: this.updateDataForm.value.password,
      };

      this.userService.updateUser(user).subscribe((res) => {
        console.log(res);
      });
    } else {
      alert('Verifique que los datos ingresados sean válidos');
    }
  }
}
