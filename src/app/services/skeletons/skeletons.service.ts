import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkeletonsService {
  private homeLoadingSubject = new BehaviorSubject(false);
  private reserveLoadingSubject = new BehaviorSubject(false);
  private userReservesLoadingSubject = new BehaviorSubject(false);

  homeLoading$ = this.homeLoadingSubject.asObservable();
  reserveLoading$ = this.reserveLoadingSubject.asObservable();
  userReservesLoading$ = this.userReservesLoadingSubject.asObservable();

  showHomeLoading(): void {
    this.homeLoadingSubject.next(true);
  }

  hideHomeLoading(): void {
    this.homeLoadingSubject.next(false);
  }

  showReserveLoading(): void {
    this.reserveLoadingSubject.next(true);
  }

  hideReserveLoading(): void {
    this.reserveLoadingSubject.next(false);
  }

  showUserReservesLoading(): void {
    this.userReservesLoadingSubject.next(true);
  }

  hideUserReservesLoading(): void {
    this.userReservesLoadingSubject.next(false);
  }
}
