import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        {
          path: 'management',
          component: AdminManagementComponent,
          // outlet: 'sa-outlet'
        },
        {
          path: 'list',
          component: AdminsListComponent,
          // outlet: 'sa-outlet'
        }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
