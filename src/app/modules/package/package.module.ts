import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { ReservePackageComponent } from './reserve-package/reserve-package.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ReservePackageComponent],
  imports: [CommonModule, PackageRoutingModule, SharedModule],
})
export class PackageModule {}
