import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminList } from 'src/app/models/superAdmin';
import { SuperAdminsService } from 'src/app/services/super-admins.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {

  @ViewChild('formCollapse') formCollapse! : ElementRef
  formTitle = 'Registar nuevo administrador'
  buttonContent = 'Aceptar'
  apiMessage! : string;

  form!: FormGroup
  name = new FormControl('', [Validators.required])
  lastname = new FormControl('', [Validators.required])
  address = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])
  repeatedPassword = new FormControl('', [Validators.required])
  tel = new FormControl('', [Validators.required])

  constructor(
    private readonly fb : FormBuilder,
    private readonly dataSvc : SuperAdminsService) {}

  ngOnInit(): void {
    this.form = this.initForm()
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

  onSubmit(form : FormGroup) : void {
    this.dataSvc.createAdmin(form.value).subscribe((res) => {
      this.apiMessage = res.message
    })
  }

  onDelete(id : string) : void {
    console.log('delet =>', id)
  }

  onUpdate(admin : AdminList) : void {
    this.formCollapse.nativeElement.checked = true;
    this.formTitle = `Editar administrador: ${admin.name.toUpperCase()}`
    this.form.setValue({
      name : admin.name,
      lastname : admin.lastname,
      address : admin.address,
      email : admin.email,
      password : admin.password,
      tel: admin.tel
    })
    this.buttonContent = 'Actualizar'
  }

  cancelForm() : void {
    this.formCollapse.nativeElement.checked = false;
    this.formTitle = 'Registar nuevo administrador'
    this.buttonContent = 'Aceptar'
    this.form.reset()
  }

}
