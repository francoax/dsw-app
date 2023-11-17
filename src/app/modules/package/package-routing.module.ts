import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservePackageComponent } from './reserve-package/reserve-package.component';
import { ReservesListComponent } from './reserves-list/reserves-list.component';

const routes: Routes = [
  { path: '', component: ReservePackageComponent },
  { path: 'reserves', component: ReservesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
