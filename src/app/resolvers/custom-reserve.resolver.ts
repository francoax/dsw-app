/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, finalize, mergeMap, of, zip } from 'rxjs';
import { PropertyServiceService } from '../services/property/property-service.service';
import { CarService } from '../services/car/car.service';
import { MedicalAssistanceService } from '../services/medical-assitance/medical-assistance.service';
import { SkeletonsService } from '../services/skeletons/skeletons.service';

export const customReserveResolver: ResolveFn<any> = (route, state) : Observable<any> => {
  const propertiesService = inject(PropertyServiceService);
  const carsService = inject(CarService);
  const medicalAssistanceService = inject(MedicalAssistanceService)
  const skeletonService = inject(SkeletonsService)

  skeletonService.showReserveLoading()
  return propertiesService.getProperty(route.paramMap.get('id')!).pipe(
    mergeMap(({ data }) =>
      zip(
        of(data),
        carsService.getCarsFromLocation(data.location.id),
        medicalAssistanceService.getAll()
      )
    ),
    finalize(() => skeletonService.hideReserveLoading())
  );
};
