import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { AdminComponent } from './admin.component';
import { PropertyListComponent } from './property-list/property-list.component';
const routes: Routes = [
  { path: '', component: AdminComponent ,
children: [{path:'PropertyList',component:PropertyListComponent,
 children:[{path:'CreateProperty',component:CreatePropertyComponent}]}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
