import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {
  action = '';
  title = '';
  message = '';
  routerLink = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.action = params['status'];

      if (this.action === 'success') {
        this.title = 'Tu reserva ha sido confirmada.';
        this.message =
          'Tu reserva se ha realizado correctamente. Gracias por reservar a través de Poncho H&S.';
        this.routerLink = '/';
      }
    });
  }
}
