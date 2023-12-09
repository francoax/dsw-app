/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LocationService } from '../services/location/location.service';
import { Observable, map } from 'rxjs';
import { Location } from '../models/location';

export const locationResolver: ResolveFn<Location[]> = (): Observable<
  Location[]
> => {
  const locationService = inject(LocationService);
  return locationService.getAll().pipe(
    map((res) => {
      return res.data;
    })
  );
};
