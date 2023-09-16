import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  superAdminRoutes = [
    {
      name : 'Agregar Administrador',
      path : ''
    },
    {
      name : 'Lista de Administradores',
      path : ''
    }
  ]

  adminRoutes = [
    {
      name : 'Autos',
      path : ''
    },
    {
      name : 'Propiedades',
      path : ''
    },
    {
      name : 'Tipo de propiedades',
      path : ''
    },
    {
      name : 'Localidades',
      path : ''
    },
    {
      name : 'Asistencia Medica',
      path : ''
    },
    {
      name : 'Paquetes',
      path : ''
    }
  ]

  buttonsToShow = [{ name : '', path : ''}];

  userRole! : string;

  ngOnInit(): void {
    if(this.userRole === 'SUPER_ADMIN') {
      this.buttonsToShow = [...this.superAdminRoutes]
    }

    if(this.userRole === 'ADMIN') {
      this.buttonsToShow = [...this.adminRoutes]
    }

    this.buttonsToShow = [...this.adminRoutes]
  }
}
