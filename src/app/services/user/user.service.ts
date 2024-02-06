/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { ApiResponse } from '../../models/common';
import { AppConfigService } from '../app/app.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = this.appService.apiUrl + '/api/users/';
  constructor(
    private http: HttpClient,
    private readonly appService: AppConfigService
  ) {}

  getUser(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API + 'me');
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API);
  }

  getUserByCredentials(
    email: string,
    password: string
  ): Observable<ApiResponse> {
    const body = { email: email, password: password };
    return this.http.post<ApiResponse>(this.API + 'login', body);
  }

  sendPasswordResetEmail(email: string): Observable<ApiResponse> {
    const body = { email: email };
    return this.http.post<ApiResponse>(this.API + 'password-reset', body);
  }

  resetPassword(id: string, user: any): Observable<ApiResponse> {
    const body = { password: user.password };
    return this.http.put<ApiResponse>(this.API + 'password-reset/' + id, body);
  }

  saveUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.API, user);
  }

  updateUserById(id: string, user: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.API + id, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.API, user);
  }

  deleteUser(): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.API);
  }
}
