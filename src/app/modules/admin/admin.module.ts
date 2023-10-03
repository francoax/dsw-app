import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CarsFormComponent } from './cars-form/cars-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { CarsListComponent } from './cars-list/cars-list.component';



@NgModule({
  declarations: [
    CarsFormComponent,
    AdminComponent,
    CarsListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[CarsFormComponent,AdminComponent,CarsListComponent]
})
export class AdminModule { }
