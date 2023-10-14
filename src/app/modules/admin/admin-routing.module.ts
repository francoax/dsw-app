import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { MedicalAssistanceComponent } from './medical-assistance/medical-assistance.component';

const routes: Routes = [
  { path: '', component: AdminComponent, 
    children: [ {path:'medicalAssistance', component:MedicalAssistanceComponent},
                {path:'cars',component:CarsListComponent} ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
