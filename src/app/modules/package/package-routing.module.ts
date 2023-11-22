import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservePackageComponent } from './reserve-package/reserve-package.component';
import { ReservesListComponent } from './reserves-list/reserves-list.component';
import { CustomReserveComponent } from './custom-reserve/custom-reserve.component';
import { customReserveResolver } from 'src/app/resolvers/custom-reserve.resolver';
import { ReserveFinishedComponent } from './reserve-finished/reserve-finished.component';

const routes: Routes = [
  { path: '', component: ReservePackageComponent },
  { path: 'reserves', component: ReservesListComponent },
  {
    path: 'reserve/:id',
    component: CustomReserveComponent,
    resolve: { data : customReserveResolver },
    children: [
      {
        path: 'completed',
        component: ReserveFinishedComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
