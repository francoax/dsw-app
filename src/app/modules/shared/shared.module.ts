import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { InputComponent } from './input/input.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [NavbarComponent, InputComponent, FooterComponent, ButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [NavbarComponent, InputComponent, FooterComponent, ButtonComponent], //Acá van todos los componentes para compartirlos a los demás modulos
})
export class SharedModule {}


