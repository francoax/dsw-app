import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common';
import { AppConfigService } from '../app/app.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    private appService: AppConfigService,
    private _http: HttpClient
  ) {}

  private readonly url: string = this.appService.apiUrl;

  getAll(): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(this.url + '/api/locations');
  }

  getLocation(id: string): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(this.url + '/api/locations/' + id);
  }
}
