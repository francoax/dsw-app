/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() showSearch!: boolean;
  @Input() user!: string;
  loggedUser = window.localStorage.getItem('loggedUser');
  userName = '';

  constructor() {
    if (this.loggedUser) {
      const user = JSON.parse(this.loggedUser);
      this.userName = user.name;
    }
  }

  buttonClicked() {
    if (this.loggedUser) {
      window.localStorage.removeItem('loggedUser');
      window.location.reload();
    } else {
      //redirigir a pagina de login
    }
  }
}
