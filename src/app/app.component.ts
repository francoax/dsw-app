import { Component } from '@angular/core';
import { ToastService } from './modules/shared/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dsw-app-frontend';

  constructor(private readonly svc : ToastService) {}

  showToast() : void {
    this.svc.show()
    this.svc.setup({ message: 'User created.', status : true})
  }
}
