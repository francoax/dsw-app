import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';
import { ApiResponse } from 'src/app/models/common';
import { AppConfigService } from '../app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject! : BehaviorSubject<User | null>
  public currentUser$! : Observable<User | null>

  private readonly baseUrl = this.appService.apiUrl

  constructor(
    private http : HttpClient,
    private readonly router : Router,
    private readonly appService : AppConfigService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable()
  }

  login(email : string, password: string) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/login`, {
      email,
      password
    }).pipe(map(user => {
      localStorage.setItem('loggedUser', JSON.stringify(user.data))
      this.currentUserSubject.next(user.data)
    }))
  }

  logOut() : void {
    localStorage.removeItem('loggedUser')
    this.currentUserSubject.next(null)
    this.router.navigate(['/'])
  }


}
