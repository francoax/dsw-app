import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [SignInComponent, LogInComponent, UpdateDataComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, UserRoutingModule],
  exports: [SignInComponent, LogInComponent, UpdateDataComponent],
})
export class UserModule {}
