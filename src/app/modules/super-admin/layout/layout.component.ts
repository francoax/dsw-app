import { Component } from '@angular/core';

type Path = {
  name : string,
  path : string
}
@Component({
  selector: 'app-superadmin-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  buttonsForSideBar : Path[] = [
    { name : 'Administradores', path : 'management'}
  ]
}
