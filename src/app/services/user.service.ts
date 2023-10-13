/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = environment.apiUrl + '/api/users/';
  constructor(private http: HttpClient) {}

  getUser(token: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API + 'me', {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  getUserByCredentials(
    email: string,
    password: string
  ): Observable<ApiResponse> {
    const body = { email: email, password: password };
    return this.http.post<ApiResponse>(this.API + 'login', body);
  }

  saveUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.API, user);
  }

  updateUser(user: User, token: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.API, user, {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  deleteUser(token: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.API, {
      headers: { Authorization: 'Bearer ' + token },
    });
  }
}
