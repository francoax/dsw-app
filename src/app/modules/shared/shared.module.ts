import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InputComponent } from './input/input.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { ToastComponent } from './toast/toast.component';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CardsListComponent } from './card/cards-list/cards-list.component';
import { UnauthorizedComponent } from './feedbacks/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    NavbarComponent,
    InputComponent,
    FooterComponent,
    ButtonComponent,
    SidebarComponent,
    ModalComponent,
    ToastComponent,
    CardComponent,
    CarouselComponent,
    CardsListComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [ //Acá van todos los componentes para compartirlos a los demás modulos
    NavbarComponent,
    InputComponent,
    FooterComponent,
    ButtonComponent,
    SidebarComponent,
    ModalComponent,
    ToastComponent,
    CardComponent,
    CarouselComponent,
    CardsListComponent
  ],
})
export class SharedModule {}


