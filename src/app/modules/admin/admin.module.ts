import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CarsFormComponent } from './cars-form/cars-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { MedicalAssistanceComponent } from './medical-assistance/medical-assistance.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastInterceptor } from '../shared/toast/toast.interceptor';



@NgModule({
  declarations: [
    AdminComponent,
    CarsFormComponent,
    CarsListComponent,
    MedicalAssistanceComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide:HTTP_INTERCEPTORS, useClass: ToastInterceptor, multi:true }],
  exports:[CarsFormComponent,AdminComponent,CarsListComponent]
})
export class AdminModule {}
