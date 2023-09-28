import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/common';
import { AdminList } from '../models/superAdmin';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminsService {

  constructor(private readonly http : HttpClient) { }

  getAdmins() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/api/users`);
  }

  createAdmin(admin : AdminList) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}/api/users`, admin)
  }

  deleteAdmin(id : string) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}/api/users/${id}`)
  }
}
