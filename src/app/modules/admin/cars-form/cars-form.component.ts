
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { ToastService } from '../../shared/toast/toast.service';
import { LocalityServiceService } from 'src/app/services/locality-service.service';
import { Locality } from 'src/app/models/locality';
import { CarService } from 'src/app/services/car/car.service';

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
localities:Locality[]=[];
formScope= 'create';

@ViewChild('formCollapse') formCollase! : ElementRef


constructor(private service: CarService, private readonly toastService: ToastService, private locaService:LocalityServiceService){}
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

  this.service.getCars().subscribe((res)=>{this.cars = res.data});
  this.locaService.getLocalities().subscribe((res)=>{this.localities = res.data;
  console.log(res.data)});



  
}

onSubmit(form : FormGroup){

if(this.carsForm.valid) {
  if(this.formScope==='create'){
  this.service.createCar(form.value).subscribe((res)=>{
    this.cars.push(res.data);
    this.toastService.setup({message:'Auto Creado',status:true})
    this.toastService.show();
    this.closeForm();
  })
  } else if(this.formScope ==='editar'){
    this.service.updateCar(this.idCarToEdit, form.value).subscribe((res)=>{
      this.toastService.setup({message:'Auto Actualizado',status:true})
      this.toastService.show();
      const index = this.cars.map(a => a.id).indexOf(this.idCarToEdit);
      this.cars[index]= res.data;
      this.closeForm();
    })
  }

  } else{
    this.toastService.setup({
      message: 'Verifique que los datos ingresados sean validos',
      status: false,
    });
    this.toastService.show();
  }

}
onDelete(id:string):void{
  this.service.deleteCar(id).subscribe((res)=>{
    this.cars = this.cars.filter(a => a.id !== id);
    this.toastService.setup({message:'Auto Eliminado',status:true})
      this.toastService.show();
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
  this.idCarToEdit = car.id;

}

closeForm():void{
  this.formCollase.nativeElement.checked = false;
  this.formTitle = 'Registrar un Nuevo Auto';
  this.buttonContent = 'Aceptar';
  this.carsForm.reset();

}



}