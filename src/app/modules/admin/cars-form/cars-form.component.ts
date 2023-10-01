/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { CarsServiceService } from 'src/app/services/cars-service.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent implements OnInit{
  formTitle = 'Register New Car';
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
  
}

onSubmit(){

if(this.carsForm.valid) {
  const car:Car={
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


}
