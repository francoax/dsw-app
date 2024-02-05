import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDataComponent } from './update-data/update-data.component';
import { LayoutComponent } from './layout/layout.component';
import { ReservesListComponent } from './reserves-list/reserves-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'update',
        component: UpdateDataComponent,
      },
      {
        path: 'reserves',
        component: ReservesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
