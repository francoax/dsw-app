import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarsServiceService } from 'src/app/services/cars-service.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit{
 constructor(private service:CarsServiceService){}
 cars:Car[]=[];

 @Output() UpdateEvent = new EventEmitter<Car>();
 @Output() DeleteEvent = new EventEmitter<string>();
 
 ngOnInit(): void {
   this.service.getCars().subscribe((res)=> console.log(this.cars= res.data));
   console.log(this.cars)
 }

}
