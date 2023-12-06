import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservePackageComponent } from './reserve-package/reserve-package.component';
import { CustomReserveComponent } from './custom-reserve/custom-reserve.component';
import { customReserveResolver } from 'src/app/resolvers/custom-reserve.resolver';
import { packageResolver } from 'src/app/services/package/package.service';

const routes: Routes = [
  {
    path: ':id',
    component: ReservePackageComponent,
    resolve: { pack: packageResolver },
  },
  {
    path: 'reserve/:id',
    component: CustomReserveComponent,
    resolve: { data: customReserveResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
