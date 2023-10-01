/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() showSearch!: boolean;
  @Input() user!: any; //como recibo el usuario que está logeado??

  constructor() {
    this.user = 'Pepito';
  }
}
