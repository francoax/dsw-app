/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MedicalAssistance } from '../models/medical-assistance';
import { MedicalAssistanceService } from '../services/medical-assitance/medical-assistance.service';

export const medicalAssistanceResolver: ResolveFn<
  MedicalAssistance[]
> = (): Observable<MedicalAssistance[]> => {
  const medicalAssistService = inject(MedicalAssistanceService);

  return medicalAssistService.getAll().pipe(
    map((res) => {
      return res.data;
    })
  );
};
