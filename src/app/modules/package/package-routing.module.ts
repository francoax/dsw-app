import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservePackageComponent } from './reserve-package/reserve-package.component';
import { CustomReserveComponent } from './custom-reserve/custom-reserve.component';
import { packageResolver } from 'src/app/resolvers/package.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ReservePackageComponent,
    resolve: { pack: packageResolver },
  },
  {
    path: 'reserve/:id',
    component: CustomReserveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
