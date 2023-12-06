/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable, inject } from '@angular/core';
import { AppConfigService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { PackageAgent } from 'src/app/models/package';

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

  createPackage(newPackage: PackageAgent): Observable<ApiResponse> {
    return this._http.post<ApiResponse>(`${this.url}/api/packages`, newPackage);
  }
}

export const packageResolver: ResolveFn<ApiResponse> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PackageService).getPackage(route.paramMap.get('id')!);
};
