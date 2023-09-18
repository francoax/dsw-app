import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    ButtonComponent,
  ],
  imports: [
    CommonModule
  ], 
  exports:[ ButtonComponent ] //Acá van todos los componentes para compartirlos a los demás modulos
})
export class SharedModule { }
