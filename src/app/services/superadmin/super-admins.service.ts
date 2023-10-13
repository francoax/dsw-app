import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/common';
import { Admin } from '../../models/superAdmin';
import { AppConfigService } from '../app/app.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminsService {

  private readonly api = this.appService.apiUrl;

  constructor(
    private readonly http : HttpClient,
    private readonly appService : AppConfigService) { }

  getAdmins() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.api}/api/users`);
  }

  createAdmin(admin : Admin) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/api/users`, admin)
  }

  updateAdmin(admin : Admin, id : string) : Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.api}/api/users/${id}`, admin)
  }

  deleteAdmin(id : string) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.api}/api/users/${id}`)
  }
}
