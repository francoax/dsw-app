import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserRoutingModule } from './user-routing.module';
import { ToastInterceptor } from '../shared/toast/toast.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    SignInComponent,
    LogInComponent,
    UpdateDataComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, UserRoutingModule],
  exports: [SignInComponent, LogInComponent, UpdateDataComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ToastInterceptor, multi: true },
  ],
})
export class UserModule {}
