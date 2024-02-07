import { Component, Input, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


type userToken = {
  userId: string,
  name: string,
  email: string,
  role: string,
}
type ButtonsForSideBar = {
  name: string;
  path: string;
}[];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() buttonsList!: ButtonsForSideBar;
  buttonsToShow: ButtonsForSideBar = [];


  userRole = '';

  ngOnInit(): void {
    const token = window.localStorage.getItem('loggedUser');
    const decodedToken: userToken = jwtDecode(token!);
    this.userRole = decodedToken.role;
    this.buttonsToShow = [...this.buttonsList];
  }
}
