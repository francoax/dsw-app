import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
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
