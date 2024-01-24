import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { MedicalAssistanceComponent } from './medical-assistance/medical-assistance.component';
import { CarsFormComponent } from './cars-form/cars-form.component';
import { PropertyTypeManagementComponent } from './property-type-management/property-type-management.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'medicalAssistance',
        component: MedicalAssistanceComponent,
      },
      {
        path: 'cars',
        component: CarsFormComponent,
      },
      {
        path: 'properties',
        component: CreatePropertyComponent,
      },
      {
        path: 'property-types',
        component: PropertyTypeManagementComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
