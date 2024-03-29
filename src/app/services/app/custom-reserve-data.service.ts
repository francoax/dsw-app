/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { PropertyServiceService } from '../property/property-service.service';
import { CarService } from '../car/car.service';
import { MedicalAssistanceService } from '../medical-assitance/medical-assistance.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { PropertyV2 } from 'src/app/models/property';
import { ReserveService } from '../reserve/reserve.service';

@Injectable({
  providedIn: 'root',
})
export class CustomReserveDataService {
  private property!: PropertyV2;

  constructor(
    private readonly propertiesService: PropertyServiceService,
    private readonly carsService: CarService,
    private readonly medicalService: MedicalAssistanceService,
    private readonly reserveService: ReserveService
  ) {}

  initReserveData(propertyId: string): Observable<any[]> {
    return this.propertiesService.getProperty(propertyId).pipe(
      switchMap(({ data }) => {
        this.property = data;
        const cars$ = this.carsService.getCarsFromLocation(
          this.property.location
        );
        const medicalAssistances$ = this.medicalService.getAll();
        const reserve$ = this.reserveService.getReservesFromProperty(
          this.property._id
        );
        return forkJoin([cars$, medicalAssistances$, reserve$]);
      }),
      map(([cars, medicalAssistances, reserves]) => [
        this.property,
        cars.data,
        medicalAssistances.data,
        reserves.data,
      ])
    );
  }
}
