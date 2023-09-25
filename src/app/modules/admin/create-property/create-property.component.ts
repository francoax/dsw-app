import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyServiceService } from 'src/app/services/property-service.service';
import { Property } from 'src/app/models/property';
@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent {
  constructor(private service:PropertyServiceService){}
  capacity = new FormControl('',[Validators.required,Validators.maxLength(30),this.ValidMayus]);
  address = new FormControl('',[Validators.maxLength(50),Validators.required,this.ValidMayus]);
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
  ValidMayus(control: AbstractControl) {
    const patron = /^[A Z]/;
    if(patron.test(control.value)==false){
      return {ValidMayus:true};
    }
    return null;
  }
  

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
      console.log(this.propertyForm.value);
      console.log(this.propertyForm.valid)
      /*this.service.createProperty(this.propertyForm.value);*/
    }
}

  
