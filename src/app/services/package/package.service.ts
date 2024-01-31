/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common';
import Package, { PackageAgent } from 'src/app/models/package';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(
    private appService: AppConfigService,
    private _http: HttpClient
  ) {}

  private readonly url: string = this.appService.apiUrl;

  getAll(): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(this.url + '/api/packages');
  }

  getPackage(packageId: string): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(this.url + '/api/packages/' + packageId);
  }

  getCompletePackages(): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(
      `${this.url}/api/packages?type=completo`
    );
  }

  createPackage(newPackage: PackageAgent): Observable<ApiResponse> {
    return this._http.post<ApiResponse>(`${this.url}/api/packages`, newPackage);
  }
  deletePackage(packageId: string): Observable<ApiResponse> {
    return this._http.delete<ApiResponse>(
      this.url + '/api/packages/' + packageId
    );
  }

  updatePackage(pack: Package, id: string): Observable<ApiResponse> {
    return this._http.put<ApiResponse>(`${this.url}/api/packages/${id}`, pack);
  }
}
