import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app/app.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private API = this.appService.apiUrl + '/api/packages/';
  constructor(
    private http: HttpClient,
    private readonly appService: AppConfigService
  ) {}

  getPackage(packageId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API + packageId);
  }
}
