import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent {
constructor(){}
brand = new FormControl('',[Validators.maxLength(30),Validators.required]);
model = new FormControl('',[Validators.maxLength(30),Validators.required]);
year = new FormControl('',[Validators.minLength(4),Validators.maxLength(4),Validators.required]);
plate= new FormControl('',[Validators.maxLength(30),Validators.required]);
date = new FormControl('',[Validators.maxLength(30),Validators.required]);
value = new FormControl('',[Validators.maxLength(10),Validators.required]);
locality = new FormControl('',[Validators.maxLength(30),Validators.required]);

carsForm = new FormGroup({
  brand : this.brand,
  model: this.model,
  year: this.year,
  plate: this.plate,
  price: new FormGroup({
    date: this.date,
    value: this.value}),
  locality: this.locality,
});

onSubmit(){
  console.log(this.carsForm.value);
}
}
