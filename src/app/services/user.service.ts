/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = environment.apiUrl + '/api/users/';
  constructor(private http: HttpClient) {}

  getUserByCredentials(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post<any>(this.API + 'login', body);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post<JSON>(this.API, user);
  }

  updateUser(user: User, token: string): Observable<any> {
    return this.http.put<any>(this.API, user, {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  deleteUser(token: string): Observable<any> {
    return this.http.delete<any>(this.API, {
      headers: { Authorization: 'Bearer ' + token },
    });
  }
}
