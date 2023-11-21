import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { ReservePackageComponent } from './reserve-package/reserve-package.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservesListComponent } from './reserves-list/reserves-list.component';

@NgModule({
  declarations: [ReservePackageComponent, ReservesListComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PackageModule {}
