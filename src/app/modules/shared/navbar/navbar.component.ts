/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app/app.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showSearch = false;
  @ViewChild('removeFilterBtn') resetFilterBtn!: ElementRef;
  @ViewChild('filterInputMobile') filterInputMobile! : ElementRef
  cancelSearchMobile = false;
  loggedUser = window.localStorage.getItem('loggedUser');
  userName = '';
  userRole = '';

  constructor(
    private router: Router,
    private readonly appService: AppConfigService
  ) {}
  ngOnInit(): void {
    if (this.loggedUser) {
      const user = JSON.parse(this.loggedUser);
      this.userName = user.name;
      this.userRole = this.getRoleOfLoggedUser();
    }
    this.appService.showSearchBar$.subscribe((show) => {
      this.showSearch = show;
    });
  }

  logout() {
    window.localStorage.removeItem('loggedUser');
  }

  getRoleOfLoggedUser(): string {
    return JSON.parse(window.localStorage.getItem('loggedUser')!).role;
  }

  buttonClicked() {
    this.router.navigate(['/login']);
  }

  goHomePage() {
    this.router.navigate(['/home']);
  }
  getInputValue(mobile : boolean) {
    let inputElement! : HTMLInputElement
    if(mobile) {
      inputElement = <HTMLInputElement>document.getElementById('mobileInput');
    } else {
      inputElement = <HTMLInputElement>document.getElementById('input');
    }
    this.appService.setInputValue(inputElement.value);
    this.resetFilterBtn.nativeElement.classList.remove('invisible');
  }
  SetInputValue() {
    const inputElement = '';
    this.appService.setInputValue(inputElement);
    this.resetFilterBtn.nativeElement.classList.add('invisible');
    this.limpiarInput();
  }
  limpiarInput() {
    (document.getElementById('input') as HTMLInputElement).value = '';
    (document.getElementById('mobileInput') as HTMLInputElement).value = '';
  }

  showSearchInputMobile() {
    this.filterInputMobile.nativeElement.classList.remove('hidden')
    this.cancelSearchMobile = true
  }

  hideSearchInputMobile() {
    this.filterInputMobile.nativeElement.classList.add('hidden');
    this.cancelSearchMobile = false;
    this.SetInputValue()
  }
}
