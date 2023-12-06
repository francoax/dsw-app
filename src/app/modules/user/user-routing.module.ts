import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDataComponent } from './update-data/update-data.component';
import { LayoutComponent } from './layout/layout.component';
import { ReservesListComponent } from './reserves-list/reserves-list.component';
import { PropertyResolverService } from 'src/app/resolvers/property.resolver.service';
import { PackageResolverService } from 'src/app/resolvers/package.resolver.service';
import { CarResolverService } from 'src/app/resolvers/car.resolver.service';
import { MedicalAssistanceResolverService } from 'src/app/resolvers/MedicalAssist.resolver.service';
import { LocationResolverService } from 'src/app/resolvers/location.resolver.service';

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
        resolve: {
          propertyList: PropertyResolverService,
          packages: PackageResolverService,
          cars: CarResolverService,
          medAssists: MedicalAssistanceResolverService,
          locations: LocationResolverService,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
