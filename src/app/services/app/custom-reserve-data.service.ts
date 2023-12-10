/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { PropertyServiceService } from '../property/property-service.service';
import { CarService } from '../car/car.service';
import { MedicalAssistanceService } from '../medical-assitance/medical-assistance.service';
import { Observable, mergeMap, of, zip } from 'rxjs';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';

@Injectable({
  providedIn: 'root'
})
export class CustomReserveDataService {

  private cars : Car[] = []
  private medicalAssitances : MedicalAssistance[] = []

  constructor(
    private readonly propertiesService : PropertyServiceService,
    private readonly carsService : CarService,
    private readonly medicalService : MedicalAssistanceService
  ) {}

  initReserveData(propertyId : string) : Observable<any[]> {
    return this.propertiesService.getProperty(propertyId).pipe(
      mergeMap(({ data }) => {
        this.carsService.getCarsFromLocation(data.location.id)
          .subscribe(({ data }) => {this.cars = data})
        this.medicalService.getAll()
          .subscribe(({ data }) => {this.medicalAssitances = data})
        return zip(
          of(data),
          this.cars,
          this.medicalAssitances
        );
      }
      )
    )
  }
}
