import { Component, Input } from '@angular/core';
import { PropertyV2 } from 'src/app/models/property';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() propertyInfo!: PropertyV2;

  constructor(private toast: ToastService, private router: Router) {}

  reserve(id: string) {
    if (!localStorage.getItem('loggedUser')) {
      this.toast.setup({
        message: 'Debe iniciar sesion para poder reservar.',
        status: false,
      });
      this.toast.show();
    } else {
      this.router.navigate([`/packages/reserve/${id}`]);
    }
  }
}
