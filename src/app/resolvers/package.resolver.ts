/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, map } from 'rxjs';
import Package from '../models/package';
import { PackageService } from '../services/package/package.service';
import { ApiResponse } from '../models/common';

export const packagesResolver: ResolveFn<Package[]> = (): Observable<
  Package[]
> => {
  const packageService = inject(PackageService);

  return packageService.getAll().pipe(
    map((res) => {
      return res.data;
    })
  );
};

export const packageResolver: ResolveFn<ApiResponse> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(PackageService).getPackage(route.paramMap.get('id')!);
};
