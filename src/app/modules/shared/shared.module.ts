import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, ButtonComponent], //Acá van todos los componentes para compartirlos a los demás modulos
})
export class SharedModule {}


