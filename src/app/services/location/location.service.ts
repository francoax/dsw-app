import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app/app.service';
import { ApiResponse } from 'src/app/models/common';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private API = this.appService.apiUrl + '/api/locations';

  constructor(
    private appService: AppConfigService,
    private _http: HttpClient
  ) {}

  getCountries(): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(this.API + '/countries');
  }

  getStates(cca2: string): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(this.API + '/states/' + cca2);
  }

  getLocations(countryId: string, regionCode: string): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(
      `${this.API}/cities/${countryId}&${regionCode}`
    );
  }

  getLocation(id: string): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(`${this.API}/${id}`);
  }
}
