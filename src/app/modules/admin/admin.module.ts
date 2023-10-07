import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { MedicalAssistanceComponent } from './medical-assistance/medical-assistance.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastInterceptor } from '../shared/toast/toast.interceptor';

@NgModule({
  declarations: [
    AdminComponent,
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
  exports:[AdminComponent]
})
export class AdminModule {}
