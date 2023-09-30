import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
const routes: Routes = [
  { 
    path: '',
    component: AdminComponent,
    children: [
      {
        path:'properties',
        component: CreatePropertyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
