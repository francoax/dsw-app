/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyServiceService } from 'src/app/services/property-service.service';
import { Property } from 'src/app/models/property';
import { OnInit } from '@angular/core';
import { PropertyType } from 'src/app/models/property-type';
@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  [x: string]: any;
  propertiesTypes:PropertyType[] =[];  /* crear modelo y pasar a :PropertyType */
  formTitle= 'Registrar nueva Propiedad';
  buttonContent = 'Aceptar';
  @ViewChild('formCollapse') formCollapse! : ElementRef


  constructor(private service:PropertyServiceService){}

  ngOnInit():void {
    this.service.getPropertiesTypes().subscribe((Response)=>{this.propertiesTypes=Response.data})
  }


  capacity = new FormControl<number>(0,[Validators.required,Validators.maxLength(30)]);
  address = new FormControl('',[Validators.maxLength(50),Validators.required]);
  price= new FormControl('',[this.tiene_numeros]);
  date= new FormControl('',[Validators.required]);
  propertyType = new FormControl('',[Validators.maxLength(30),Validators.required]);

  propertyForm = new FormGroup ({
    capacity : this.capacity,
    address : this.address,
    pricePerNight: new FormGroup({
      price: this.price,
      date: this.date}),
    propertyType: this.propertyType,
  });


  tiene_numeros(control: AbstractControl){
    const numeros="0123456789";
    const texto:string = control.value;
    let i=0;
    let count=0;
    for(i=0; i<texto.length; i++){
      if (numeros.indexOf(texto.charAt(i),0)!=-1){
         count= count +1;
      }
    }
    if(texto.length != count){
      return {ValidMayus:true}
    }
   return null;
  }

  onSubmit(form : FormGroup){
    if(this.propertyForm.valid){
      this.service.createProperty(form.value).subscribe(res=> console.log(res));
    } else {
      alert('Verifique que los datos ingresados sean validos')
    }
  }

  onDelete(id:string){
    this.service.deleteProperty(id).subscribe((res)=> alert(res.message))
  }

  onUpdate(prop: Property) {
    this.formCollapse.nativeElement.checked = true;
    this.formTitle = `Editar Propiedad`;
    this.propertyForm.patchValue({
      capacity: prop.capacity,
      address: prop.address,
      pricePerNight: {
        price: prop.pricePerNight.price.toString(),
        date: prop.pricePerNight.date
      },
      propertyType: prop.propertyType
    })
  }
  closeForm() : void {
    this.formCollapse.nativeElement.checked = false;
    this.formTitle = 'Registar nueva Propiedad'
    this.buttonContent = 'Aceptar'
    this.propertyForm.reset()
  }
}
