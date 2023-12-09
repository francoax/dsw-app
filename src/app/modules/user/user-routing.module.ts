import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDataComponent } from './update-data/update-data.component';
import { LayoutComponent } from './layout/layout.component';
import { ReservesListComponent } from './reserves-list/reserves-list.component';
import { propertyResolver } from 'src/app/resolvers/property.resolver';
import { packagesResolver } from 'src/app/resolvers/package.resolver';
import { carResolver } from 'src/app/resolvers/car.resolver';
import { medicalAssistanceResolver } from 'src/app/resolvers/MedicalAssist.resolver';
import { locationResolver } from 'src/app/resolvers/location.resolver';

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
          propertyList: propertyResolver,
          packages: packagesResolver,
          cars: carResolver,
          medAssists: medicalAssistanceResolver,
          locations: locationResolver,
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
