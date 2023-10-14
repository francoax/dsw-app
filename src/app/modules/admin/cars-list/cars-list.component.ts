/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarsServiceService } from 'src/app/services/cars-service.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit{
 constructor(private service:CarsServiceService){}

 idCarDelete!:string;
 @ViewChild('confirmationModal') confirmationModal!: ModalComponent;
 @Input() cars:Car[]=[];
 @Output() UpdateEvent = new EventEmitter<Car>();
 @Output() DeleteEvent = new EventEmitter<string>();
 
 ngOnInit(): void {
 }

 onUpdate(car : Car):void{
  this.UpdateEvent.emit(car);

 }
 onDeleteConfirm():void{
  this.DeleteEvent.emit(this.idCarDelete);
 }

 onDelete(id:string):void{
  this.idCarDelete = id;
  this.confirmationModal.open();
  

 }



}
