import { Component, Input, OnInit } from '@angular/core';

type ButtonsForSideBar = {
  name : string,
  path : string
}[]
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  @Input() buttonsList! : ButtonsForSideBar;
  buttonsToShow : ButtonsForSideBar = [];

  ngOnInit(): void {
    this.buttonsToShow = [...this.buttonsList];
  }
}