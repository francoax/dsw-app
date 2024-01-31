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

  private readonly countriesUrl: string =
    'https://restcountries.com/v3.1/subregion/South%20America?fields=name,cca2';

  private readonly statesUrl: string =
    'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/{ccode}/regions?limit=10&languageCode=es';

  private readonly citiesUrl: string =
    'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/{countryId}/regions/{regionCode}/places?types=CITY&languageCode=es&minPopulation=30000&limit=10';
  
  private readonly locationsUrl: string = 
  'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/AR/places?limit=10&offset=0&types=CITY&minPopulation=500000'
  
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
    return this._http.get<ApiResponse>(this.API + '/api/locations/' + id);
  }

}
