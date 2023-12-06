import { Component, Input, OnInit } from '@angular/core';
import { PropertyV2 } from 'src/app/models/property';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() propertyInfo! : PropertyV2
  imageSrc! : string;

  constructor(
    private toast: ToastService,
    private router: Router,
    private appService: AppConfigService
  ) {}

  ngOnInit(): void {
    this.imageSrc = `${this.appService.apiUrl}/api/images/${this.propertyInfo.image}`;
  }

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
