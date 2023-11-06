import { Injectable } from '@angular/core';
import { AppConfigService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common';

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
}
