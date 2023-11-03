/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyServiceService } from 'src/app/services/property-service.service';
import { Property } from 'src/app/models/property';
import { OnInit } from '@angular/core';
import { PropertyType } from 'src/app/models/property-type';
import { ToastService } from '../../shared/toast/toast.service';
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
  idPropToEdit!:string;
  formScope = "create";
  properties:Property[] =[];
  @ViewChild('formCollapse') formCollapse! : ElementRef

  @Output() eventoListado = new EventEmitter<Property[]>;


  constructor(
    private service:PropertyServiceService,
    private readonly toastService: ToastService){}

  ngOnInit():void {
    this.service.getPropertiesTypes().subscribe((Response)=>{this.propertiesTypes=Response.data})
    this.service.getProperties().subscribe((response) => {this.properties = response.data
    });
  }

  capacity = new FormControl<number>(0,[Validators.required,Validators.maxLength(30)]);
  address = new FormControl('',[Validators.maxLength(50),Validators.required]);
  price= new FormControl('',[]);
  date= new FormControl('',[Validators.required]);
  propertyType = new FormControl('',[Validators.maxLength(30),Validators.required]);
  image = new FormControl('');
  

  propertyForm = new FormGroup ({
    capacity : this.capacity,
    address : this.address,
    pricePerNight: new FormGroup({
      price: this.price,
      date: this.date}),
    propertyType: this.propertyType,
    image: this.image
  });

  /*
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
  */
  onSubmit(form : FormGroup){
    if(this.propertyForm.valid){
      if(this.formScope==='create'){
        this.service.createProperty(form.value).subscribe((res)=>{
          this.toastService.setup({message:'Propiedad Creada',status:true})
          this.toastService.show();
          this.properties.push(res.data);
          this.closeForm();
        })
      } else if(this.formScope==='editar'){
        this.service.UpdateProperty(form.value,this.idPropToEdit).subscribe((res)=>{
        this.toastService.setup({message:'Propiedad Actualizada',status:true})
        this.toastService.show();
        const index = this.properties.map(a => a._id).indexOf(res.data._id)
        this.properties[index] = res.data;
        this.closeForm();
      })
      
      }
    } else {
      this.toastService.setup({message:'Verifique que los datos ingresados sean validos',status:false})
      this.toastService.show();
    }
  }

  onDelete(id:string):void{
    this.service.deleteProperty(id).subscribe((res)=> {
      this.toastService.setup({message:'Propiedad eliminada',status:true});
      this.toastService.show();
        this.properties = this.properties.filter(a => a._id !== id)
    })
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
    this.formScope="editar";
    this.idPropToEdit = prop._id;
  }
  closeForm() : void {
    this.formCollapse.nativeElement.checked = false;
    this.formTitle = 'Registar nueva Propiedad'
    this.buttonContent = 'Aceptar'
    this.propertyForm.reset()
  }
}
