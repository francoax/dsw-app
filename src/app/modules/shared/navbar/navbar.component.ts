/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app/app.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showSearch = false;
  showBackBtn = false;
  loggedUser = window.localStorage.getItem('loggedUser');
  userName = '';

  constructor(
    private router: Router,
    private readonly appService : AppConfigService) {
  }
  ngOnInit(): void {
    if (this.loggedUser) {
      const user = JSON.parse(this.loggedUser);
      this.userName = user.name;
    }
    this.appService.showSearchBar$.subscribe((show) => {
      this.showSearch = show
    })
    
  }

  logout() {
    window.localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }

  buttonClicked() {
    this.router.navigate(['/login']);
  }

  goHomePage(){
    this.router.navigate(['/home']);
  }
  getInputValue(){
    const inputElement = <HTMLInputElement>document.getElementById('input');
    this.appService.setInputValue(inputElement.value);
    this.showBackBtn = true;
 }
 SetInputValue(){
  const inputElement ="";
  this.appService.setInputValue(inputElement);
  this.showBackBtn = false;
}

}
