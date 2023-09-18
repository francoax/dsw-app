import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImputComponent } from './imput/imput.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImputComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], 
  exports:[ImputComponent,FooterComponent] //Acá van todos los componentes para compartirlos a los demás modulos
})
export class SharedModule { }
