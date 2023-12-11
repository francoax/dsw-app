/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/toast/toast.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import Reserve from 'src/app/models/reserve';

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
  loggedUser = false;

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private userService: UserService,
    private reserveService: ReserveService,
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
    this.updateDataForm.disable();

    if (window.localStorage.getItem('loggedUser')) {
      this.userService.getUser().subscribe({
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
          this.loggedUser = true;
        },
        error: () => {
          this.toastService.setup({
            message: 'Error al obtener los datos del usuario',
            status: false,
          });
          this.toastService.show();
        },
      });
    }
  }

  toggleForm() {
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
        this.editUserData(user);
      } else {
        const user: User = {
          name: this.updateDataForm.value.name,
          lastname: this.updateDataForm.value.lastname,
          address: this.updateDataForm.value.address,
          tel: parseInt(this.updateDataForm.value.tel),
          email: this.updateDataForm.value.email,
        };
        this.editUserData(user);
      }
    } else {
      this.toastService.setup({
        message: 'Verifique que los datos ingresados sean válidos',
        status: false,
      });
      this.toastService.show();
    }
  }

  editUserData(userData: User): void {
    this.userService.updateUser(userData).subscribe({
      next: () => {
        this.toastService.setup({
          message: 'Datos modificados exitosamente',
          status: false,
        });
        this.toastService.show();
      },
    });
    this.toggleForm();
  }

  checkUserReserves(): void {
    this.reserveService.getReservesByUser().subscribe({
      next: (reserves) => {
        const hasCurrentReserves = (): boolean => {
          const result = reserves.data.filter((reserve: Reserve) => {
            new Date(reserve.date_end).getTime() < new Date().getTime();
          });

          return result.length > 0 ? true : false;
        };
        if (reserves.data.length > 0 && hasCurrentReserves()) {
          this.toastService.setup({
            message: 'No puede darse de baja, tiene reservas vigentes',
            status: false,
          });
          this.toastService.show();
        } else {
          this.deleteUser();
        }
      },
      error: () => {
        this.toastService.setup({
          message: 'Error al verificar reservas',
          status: false,
        });
        this.toastService.show();
      },
    });
  }

  deleteUser(): void {
    this.userService.deleteUser().subscribe({
      next: () => {
        window.localStorage.removeItem('loggedUser');
        this.router.navigate(['/confirmation'], {
          queryParams: { action: 'delete' },
        });
      },
      error: () => {
        this.toastService.setup({
          message: 'Error al eliminar usuario',
          status: false,
        });
        this.toastService.show();
      },
    });
  }

  showModal(): void {
    this.modalComponent.open();
  }
}
