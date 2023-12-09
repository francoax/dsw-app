/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PropertyServiceService } from '../services/property-service.service';
import { Property } from '../models/property';
import { Observable, map } from 'rxjs';

export const propertyResolver: ResolveFn<Property[]> = (): Observable<
  Property[]
> => {
  const propertyService = inject(PropertyServiceService);

  return propertyService.getProperties().pipe(map((res) => res.data));
};
