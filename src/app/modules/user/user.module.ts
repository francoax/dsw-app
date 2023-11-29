import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    UpdateDataComponent,
    LayoutComponent,
    NotificationsComponent,
    ForgotPasswordComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, UserRoutingModule],
  exports: [SignUpComponent, LogInComponent, UpdateDataComponent],
})
export class UserModule {}
