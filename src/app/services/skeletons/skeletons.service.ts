import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkeletonsService {

  private homeLoadingSubject = new BehaviorSubject(false)
  private reserveLoadingSubject = new BehaviorSubject(false)

  homeLoading$ = this.homeLoadingSubject.asObservable()
  reserveLoading$ = this.reserveLoadingSubject.asObservable()

  showHomeLoading() : void {
    this.homeLoadingSubject.next(true)
  }

  hideHomeLoading() : void {
    this.homeLoadingSubject.next(false)
  }

  showReserveLoading() : void {
    this.reserveLoadingSubject.next(true)
  }

  hideReserveLoading() : void {
    this.reserveLoadingSubject.next(false)
  }
}
