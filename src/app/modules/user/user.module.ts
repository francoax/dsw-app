import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ReservesListComponent } from './reserves-list/reserves-list.component';

@NgModule({
  declarations: [
    UpdateDataComponent,
    LayoutComponent,
    ReservesListComponent
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, UserRoutingModule],
  exports: [UpdateDataComponent],
})
export class UserModule {}
