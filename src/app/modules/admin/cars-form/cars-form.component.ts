/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { CarsServiceService } from 'src/app/services/cars-service.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent implements OnInit{
  
formTitle = 'Registrar un Nuevo Auto';
buttonContent = 'Aceptar';
idCarToEdit!:string;
cars:Car[]=[];
formScope= 'create';

@ViewChild('formCollapse') formCollase! : ElementRef


constructor(private service:CarsServiceService){}
carsForm!:FormGroup;
brand = new FormControl('',[Validators.maxLength(30),Validators.required]);
model = new FormControl('',[Validators.maxLength(30),Validators.required]);
year = new FormControl('',[Validators.minLength(4),Validators.maxLength(4),Validators.required]);
plate= new FormControl('',[Validators.maxLength(30),Validators.required]);
date = new FormControl('',[Validators.maxLength(30),Validators.required]);
value = new FormControl('',[Validators.maxLength(10),Validators.required]);
locality = new FormControl('',[Validators.maxLength(30),Validators.required]);


ngOnInit(): void {
  this.carsForm = new FormGroup({
    brand : this.brand,
    model: this.model,
    year: this.year,
    plate: this.plate,
    price: new FormGroup({
      date: this.date,
      value: this.value}),
    locality: this.locality,
  });

  this.service.getCars().subscribe((res)=> console.log(this.cars= res.data));
  
}

onSubmit(){

if(this.carsForm.valid) {
  const car:Car={
    _id: '',
    brand: this.carsForm.value.brand,
    model: this.carsForm.value.model,
    year: this.carsForm.value.year,
    plate: this.carsForm.value.plate,
    price:{
      date: this.carsForm.value.price.date,
      value: parseInt(this.carsForm.value.price.value|| ''),
    },
    locality:this.carsForm.value.locality,
  }
  this.service.createCar(car).subscribe(res => console.log(res))

  } else{
    alert('Verifique que los datos ingresados sean validos');
  }

}
onDelete(id:string):void{
  this.service.deleteCar(id).subscribe((res)=>{
    this.cars = this.cars.filter(a => a._id !== id);
  })
}

onUpdate(car: Car){
  this.formCollase.nativeElement.checked = true;
  this.formTitle = 'Editar Auto';
  this.carsForm.patchValue({
    brand : car.brand,
    model : car.model,
    year : car.year,
    plate : car.plate,
    price: {
      date: car.price.date,
      value: car.price.value
    },
    locality : car.locality
  })
  this.formScope = 'editar';
  this.idCarToEdit = car._id;

}

closeForm():void{
  this.formCollase.nativeElement.checked = false;
  this.formTitle = 'Registrar un Nuevo Auto';
  this.buttonContent = 'Aceptar';
  this.carsForm.reset();

}



}
