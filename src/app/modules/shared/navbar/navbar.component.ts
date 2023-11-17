/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    if (this.loggedUser) {
      const user = JSON.parse(this.loggedUser);
      this.userName = user.name;
    }
  }

  logout() {
    window.localStorage.removeItem('loggedUser');
    this.router.navigate(['user/login']);
  }

  buttonClicked() {
    this.router.navigate(['user/login']);
  }

  goHomePage(){    
    this.router.navigate(['/home']);
  }
}
