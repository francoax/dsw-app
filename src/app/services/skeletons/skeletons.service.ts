import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkeletonsService {

  homeLoading$ = new Subject<boolean>()
  reserveLoading$ = new Subject<boolean>()

  showHomeLoading() : void {
    this.homeLoading$.next(true)
  }

  hideHomeLoading() : void {
    this.homeLoading$.next(false)
  }

  showReserveLoading() : void {
    this.reserveLoading$.next(true)
  }

  hideReserveLoading() : void {
    this.reserveLoading$.next(false)
  }
}
