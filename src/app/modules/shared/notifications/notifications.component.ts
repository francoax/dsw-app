import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: [''],
})
export class NotificationsComponent implements OnInit {
  title = '';
  message = '';
  routerLink = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.route.queryParams.subscribe((params) => {
      const action = params['action'];
      const status = params['status'];

      if (action === 'signin') {
        this.title = 'Te has registrado con éxito';
        this.message =
          'Tu cuenta se ha registrado correctamente. Ahora puedes acceder al inicio de sesión y utilizar tu cuenta.';
        this.routerLink = '/login';
      }

      if (action === 'delete') {
        this.title = 'Tu cuenta se ha eliminado con éxito';
        this.message =
          'Tu cuenta se ha dado de baja correctamente. Esperamos verte de nuevo pronto';
        this.routerLink = '/';
      }

      if (action === 'cancel') {
        this.title = 'La reserva se ha cancelado con éxito';
        this.message =
          'En breve se procesará la cancelación y recibira el reembolso correspondiente';
        this.routerLink = '/user/reserves';
      }

      if (status === 'success') {
        this.title = 'Tu reserva ha sido confirmada.';
        this.message =
          'Tu reserva se ha realizado correctamente. Gracias por reservar a través de Poncho H&S.';
        this.routerLink = '/';
      }
    });
  }
}
