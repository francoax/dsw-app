import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PackageService } from '../services/package/package.service';

export const homeDataResolver: ResolveFn<boolean> = (route, state) => {
  const packagesService = inject(PackageService)
  const propertiesService = inject(PackageService)
};
