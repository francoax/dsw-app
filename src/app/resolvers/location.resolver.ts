/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LocationService } from '../services/location/location.service';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/common';

interface RestCountryResponse {
  name: {
    common: string;
  };
  cca2: string;
}

export const locationResolver: ResolveFn<
  ApiResponse
> = (): Observable<ApiResponse> => {
  const locationService = inject(LocationService);
  return locationService.getCountries().pipe(
    map((res) => {
      return res;
    })
  );
};
