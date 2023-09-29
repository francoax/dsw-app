/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
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
  propertiesTypes:PropertyType[] =[];  /* crear modelo y pasar a :PropertyType */

  constructor(private service:PropertyServiceService){}

  ngOnInit():void {
    this.service.getPropertiesTypes().subscribe((Response)=>{this.propertiesTypes=Response.data})
  }

  
  capacity = new FormControl('',[Validators.required,Validators.maxLength(30)]);
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
    
    onSubmit(){
      /* const objeto:Property = this.propertyForm.value;*/
      if(this.propertyForm.valid){
      const prop: Property = {
        capacity: parseInt(this.propertyForm.value.capacity ||''),
        address: this.propertyForm.value.address ||'',
        pricePerNight:{
          price: parseInt(this.propertyForm.value.pricePerNight?.price ||''),
          date:this.propertyForm.value.pricePerNight?.date ||'',
        },
        propertyType: this.propertyForm.value.propertyType ||'',
      };
      /*console.log(this.propertyForm.valid)*/
      this.service?.createProperty(prop).subscribe(res=> console.log(res));
      } else {
        alert('Verifique que los datos ingresados sean validos')
      }
    }
    onDelete(id:string){
      console.log('delet =>', id);
    }
    onUpdate(prop: Property){
      console.log(prop);
    }

}

  
