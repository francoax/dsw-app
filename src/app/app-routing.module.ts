import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertyResolverService } from './resolvers/property.resolver.service';
import { PackageResolverService } from './resolvers/package.resolver.service';
import { CarResolverService } from './resolvers/car.resolver.service';
import { MedicalAssistanceResolverService } from './resolvers/MedicalAssist.resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', 
    component: HomeComponent,
    resolve:{propertyList:PropertyResolverService,  packages:PackageResolverService,
      cars: CarResolverService,
      medAssists: MedicalAssistanceResolverService
           }
  },
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
