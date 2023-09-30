import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule)},
  {
    path : 'superadmin',
    loadChildren: () => import('./modules/super-admin/super-admin.module').then(m => m.SuperAdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
