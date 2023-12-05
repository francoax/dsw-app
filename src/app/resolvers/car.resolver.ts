/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Car } from '../models/car';
import { CarService } from '../services/car/car.service';

export const carResolver: ResolveFn<Car[]> = (): Observable<Car[]> => {
  const carsService = inject(CarService);

  return carsService.getCars().pipe(
    map((res) => {
      return res.data;
    })
  );
};
