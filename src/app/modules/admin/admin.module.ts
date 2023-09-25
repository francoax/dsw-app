import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { SharedModule } from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Property } from 'src/app/models/property';
import { PropertyListComponent } from './property-list/property-list.component';
@NgModule({
  declarations: [
    CreatePropertyComponent,
    PropertyListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[CreatePropertyComponent]
})
export class AdminModule { }
