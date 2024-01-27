import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app/app.service';
import { ApiResponse } from 'src/app/models/common';

interface RestCountryResponse {
  name: {
    common: string;
  };
  cca2: string;
}

interface StateResponse {
  data: [
    {
      name: string;
      isoCode: string;
    }
  ];
}

interface LocationResponse {
  data: [
    {
      name: string;
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
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

  getCountries(): Observable<RestCountryResponse[]> {
    return this._http.get<RestCountryResponse[]>(this.countriesUrl);
  }

  getStates(cca2: string): Observable<StateResponse> {
    return this._http.get<StateResponse>(
      this.statesUrl.replace('{ccode}', cca2),
      {
        headers: {
          'x-rapidapi-key': 'aca-va-la-api-key',
          'X-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );
  }

  getLocations(
    countryId: string,
    regionCode: string
  ): Observable<LocationResponse> {
    return this._http.get<LocationResponse>(
      this.citiesUrl
        .replace('{countryId}', countryId)
        .replace('{regionCode}', regionCode),
      {
        headers: {
          'x-rapidapi-key': 'aca-va-la-api-key',
          'X-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );
  }

  getLocation(id: string): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(
      this.countriesUrl + '/api/locations/' + id
    );
  }
}
