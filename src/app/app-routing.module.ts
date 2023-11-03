import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'superadmin',
    loadChildren: () =>
      import('./modules/super-admin/super-admin.module').then(
        (m) => m.SuperAdminModule
      ),
  },
  {
    path: 'packages',
    loadChildren: () =>
      import('./modules/package/package.module').then(
        (mod) => mod.PackageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
