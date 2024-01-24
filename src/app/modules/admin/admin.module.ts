import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CarsFormComponent } from './cars-form/cars-form.component';
import { SharedModule } from '../shared/shared.module';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PropertyListComponent } from './property-list/property-list.component';
import { AdminComponent } from './admin.component';
import { MedicalAssistanceComponent } from './medical-assistance/medical-assistance.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastInterceptor } from '../shared/toast/toast.interceptor';
import { PropertyTypeManagementComponent } from './property-type-management/property-type-management.component';
import { PropTypesListComponent } from './prop-types-list/prop-types-list.component';




@NgModule({
  declarations: [
    AdminComponent,
    CarsFormComponent,
    CarsListComponent,
    CreatePropertyComponent,
    PropertyListComponent,
    MedicalAssistanceComponent,
    PropertyTypeManagementComponent,
    PropTypesListComponent
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide:HTTP_INTERCEPTORS, useClass: ToastInterceptor, multi:true }],
  exports:[CreatePropertyComponent,AdminComponent,PropertyListComponent,CarsFormComponent,CarsListComponent]
})
export class AdminModule {}
