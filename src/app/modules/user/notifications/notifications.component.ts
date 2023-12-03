import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: [''],
})
export class NotificationsComponent implements OnInit {
  action = '';
  title = '';
  message = '';
  routerLink = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];

      if (this.action === 'signin') {
        this.title = 'Te has registrado con éxito';
        this.message =
          'Tu cuenta se ha registrado correctamente. Ahora puedes acceder al inicio de sesión y utilizar tu cuenta.';
        this.routerLink = '/login';
      }

      if (this.action === 'delete') {
        this.title = 'Tu cuenta se ha eliminado con éxito';
        this.message =
          'Tu cuenta se ha dado de baja correctamente. Esperamos verte de nuevo pronto';
        this.routerLink = '/';
      }
    });
  }
}
