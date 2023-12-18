import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/models/superAdmin';
import { SuperAdminsService } from 'src/app/services/superadmin/super-admins.service';
import { ToastService } from '../../shared/toast/toast.service';
import { checkPasswords } from './form.validators';
import { ApiResponse } from 'src/app/models/common';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss'],
})
export class AdminManagementComponent implements OnInit {
  @ViewChild('formCollapse') formCollapse!: ElementRef;
  formTitle = 'Registar nuevo administrador';
  buttonContent = 'Aceptar';
  formScope = 'create';
  idToUpdate!: string;

  adminList: Admin[] = [];

  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dataService: SuperAdminsService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
    this.form.addValidators(checkPasswords);
    this.loadList();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      repeatedPassword: ['', [Validators.required]],
      tel: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  loadList(): void {
    this.dataService.getAdmins().subscribe({
      next: (res) => {
        this.adminList = res.data;
      },
      error: (e) => {
        this.toastService.setup({
          message: e.message,
          status: false
        })
      }
    });
  }

  onSubmit(form: FormGroup): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.toastService.setup({
        message: 'Error, revise los campos del formulario.',
        status: false,
      });
      this.toastService.show();
    } else {
      this.formScope === 'create'
        ? this.dataService
            .createAdmin({ ...form.value, role: 'admin' })
            .subscribe({
              next: (res) => {
                if (!res.error) {
                  this.closeForm();
                  this.adminList.push(res.data);

                  this.initToast(res);
                }
              },
            })
        : this.dataService.updateAdmin(form.value, this.idToUpdate).subscribe({
            next: (res) => {
              if (!res.error) {
                this.closeForm();
                const index = this.adminList
                  .map((a) => a._id)
                  .indexOf(res.data._id);
                this.adminList[index] = res.data;

                this.initToast(res)
              }
            },
            error: (e) => {
              this.toastService.setup({
                message: e.message,
                status: false
              })

              this.toastService.show()
            }
          });
    }
  }

  onDelete(id: string): void {
    this.dataService.deleteAdmin(id).subscribe({
      next: (res) => {
        if(res.error) {
          throw new Error(res.message)
        }

        this.adminList = this.adminList.filter(a => a._id !== id)

        this.initToast(res)
      },
      error: (e) => {
        this.toastService.setup({
          message: e.message,
          status: false
        })
        this.toastService.show()
      }
    });
  }

  onUpdate(admin: Admin): void {
    this.formCollapse.nativeElement.checked = true;
    this.formTitle = `Editar administrador: ${admin.name.toUpperCase()}`;
    this.form.get('password')?.clearValidators()
    this.form.get('password')?.setValidators([Validators.minLength(5)])
    this.form.get('password')?.updateValueAndValidity()
    this.form.get('repeatedPassword')?.clearValidators();
    this.form.get('repeatedPassword')?.updateValueAndValidity();
    this.form.patchValue({
      name: admin.name,
      lastname: admin.lastname,
      address: admin.address,
      email: admin.email,
      tel: admin.tel,
    });
    this.buttonContent = 'Actualizar';
    this.formScope = 'update';
    this.idToUpdate = admin._id
  }

  closeForm(): void {
    this.formCollapse.nativeElement.checked = false;
    this.formTitle = 'Registar nuevo administrador';
    this.buttonContent = 'Aceptar';
    this.form.reset();
    this.form.get('password')?.setValidators([Validators.required, Validators.minLength(5)]);
    this.form.get('password')?.updateValueAndValidity();
    this.form.get('repeatedPassword')?.setValidators([Validators.required]);
    this.form.get('repeatedPassword')?.updateValueAndValidity();
    this.idToUpdate = '';
    this.formScope = 'create'
  }

  initToast(res : ApiResponse) : void {
    this.toastService.setup({
      message: res.message,
      status: !res.error
    })

    this.toastService.show()
  }
}
