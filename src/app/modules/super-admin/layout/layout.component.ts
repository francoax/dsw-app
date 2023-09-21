import { Component } from '@angular/core';

@Component({
  selector: 'app-superadmin-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  buttonsForSideBar : { name : string, path : string}[] = [
  { name : 'Administradores', path : ''},
  { name : 'Lista de Administradores', path : ''}
]

}
