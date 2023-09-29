import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/models/superAdmin';
import { SuperAdminsService } from 'src/app/services/super-admins.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {

  @ViewChild('formCollapse') formCollapse! : ElementRef
  formTitle = 'Registar nuevo administrador'
  buttonContent = 'Aceptar'
  formScope = 'create'
  idToUpdate! : string

  adminList : Admin[] = []

  form!: FormGroup

  name = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
  ])
  lastname = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
  ])
  address = new FormControl<string>('', [Validators.required])
  email = new FormControl<string>('', [
    Validators.required,
    Validators.email
  ])
  password = new FormControl<string>('', [Validators.required])
  tel = new FormControl<string>('', [Validators.required])

  constructor(
    private readonly fb : FormBuilder,
    private readonly dataService : SuperAdminsService,
    private readonly toastService : ToastService) {}

  ngOnInit(): void {
    this.form = this.initForm()
    this.loadList()
  }

  initForm() : FormGroup {
    return this.fb.group({
      name : this.name,
      lastname : this.lastname,
      address : this.address,
      email : this.email,
      password : this.password,
      tel : this.tel,
    })
  }

  loadList() : void {
    this.dataService.getAdmins().subscribe((res) => {
      this.adminList = res.data
    })
  }

  onSubmit(form : FormGroup) : void {
    if(!this.form.valid) {
      this.toastService.setup({ message : 'Error, revise los campos del formulario.', status : false})
      this.toastService.show()
    }
    this.formScope === 'create'
    ? this.dataService.createAdmin(form.value).subscribe((res) => {
      if(!res.error) {
        this.closeForm()
        this.adminList.push(res.data)
      }
    })
    : this.dataService.updateAdmin(form.value, this.idToUpdate).subscribe((res) => {
      if(!res.error) {
        this.closeForm()
        const index = this.adminList.map(a => a._id).indexOf(res.data._id)
        this.adminList[index] = res.data
      }
    })
  }

  onDelete(id : string) : void {
    this.dataService.deleteAdmin(id).subscribe(res => {
      if(!res.error) {
        this.adminList = this.adminList.filter(a => a._id !== id)
      }
    })
  }

  onUpdate(admin : Admin) : void {
    this.formCollapse.nativeElement.checked = true;
    this.formTitle = `Editar administrador: ${admin.name.toUpperCase()}`
    this.form.patchValue({
      name : admin.name,
      lastname : admin.lastname,
      address : admin.address,
      email : admin.email,
      password : admin.password,
      tel: admin.tel
    })
    this.buttonContent = 'Actualizar'
    this.formScope = 'update'
    this.idToUpdate = admin._id
  }

  cancelForm() : void {
    this.closeForm()
    this.formTitle = 'Registar nuevo administrador'
    this.buttonContent = 'Aceptar'
    this.form.reset()
  }

  closeForm() : void {
    this.formCollapse.nativeElement.checked = false;
  }

}
