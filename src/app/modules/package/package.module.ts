import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { ReservePackageComponent } from './reserve-package/reserve-package.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservesListComponent } from './reserves-list/reserves-list.component';
import { CustomReserveComponent } from './custom-reserve/custom-reserve.component';
import { ReserveFinishedComponent } from './reserve-finished/reserve-finished.component';

@NgModule({
  declarations: [ReservePackageComponent, ReservesListComponent, CustomReserveComponent, ReserveFinishedComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PackageModule {}
