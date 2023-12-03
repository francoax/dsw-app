/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnChanges,Output, SimpleChanges, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnChanges{

 idCarDelete!:string;
 @ViewChild('confirmationModal') confirmationModal!: ModalComponent;
 @Input() cars:Car[]=[];
 @Output() UpdateEvent = new EventEmitter<Car>();
 @Output() DeleteEvent = new EventEmitter<string>();
 
 ngOnChanges(changes: SimpleChanges) {
  if (changes['cars'] && !changes['cars'].firstChange) {
    // Angular se encargará automáticamente de actualizar el ngFor
    console.log('Lista actualizada en tiempo real:', this.cars);
  }
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