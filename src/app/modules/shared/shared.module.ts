import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InputComponent } from './input/input.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    NavbarComponent,
    InputComponent,
    FooterComponent,
    ButtonComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ //Acá van todos los componentes para compartirlos a los demás modulos
    NavbarComponent,
    InputComponent,
    FooterComponent,
    ButtonComponent,
    SidebarComponent
  ],
})
export class SharedModule {}


