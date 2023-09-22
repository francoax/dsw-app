/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = 'http://localhost:4000/api/users/';
  constructor(private http: HttpClient) {}

  saveUser(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.API, user);
  }
}
