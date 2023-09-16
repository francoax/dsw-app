import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[SidebarComponent] //Acá van todos los componentes para compartirlos a los demás modulos
})
export class SharedModule { }
