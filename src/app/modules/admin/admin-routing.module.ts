import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { AdminComponent } from './admin.component';
const routes: Routes = [
  {path:'CreateProperty',component:CreatePropertyComponent},
  { path: '', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
