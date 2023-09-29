import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type toastBody = {
  message? : string,
  status : boolean,
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private showToastSubject = new Subject<boolean>()
  private toastConfigSubject = new Subject<toastBody>()

  showToast$ = this.showToastSubject.asObservable()
  toastConfig$ = this.toastConfigSubject.asObservable()

  show() : void {
    this.showToastSubject.next(true)
    setTimeout(() => {
      this.hide()
    }, 3000);
  }

  hide() : void {
    this.showToastSubject.next(false)
  }

  setup(c : toastBody) : void {
    this.toastConfigSubject.next(c)
  }
}
