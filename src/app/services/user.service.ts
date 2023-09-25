/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = 'http://localhost:4000/api/users/';
  constructor(private http: HttpClient) {}

  getUserByCredentials(email: string, password: string): Observable<JSON> {
    const body = { email: email, password: password };
    return this.http.post<JSON>(this.API + 'login', body);
  }

  saveUser(user: User): Observable<JSON> {
    return this.http.post<JSON>(this.API, user);
  }

  updateUser(user: User): Observable<JSON> {
    return this.http.put<JSON>(this.API, user);
  }
}
