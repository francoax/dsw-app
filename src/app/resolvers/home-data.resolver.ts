import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PackageService } from '../services/package/package.service';
import { finalize, mergeMap, of, zip } from 'rxjs';
import { PropertyServiceService } from '../services/property/property-service.service';
import { SkeletonsService } from '../services/skeletons/skeletons.service';

export const homeDataResolver: ResolveFn<any> = (route, state) => {
  const packagesService = inject(PackageService)
  const propertiesService = inject(PropertyServiceService)
  const skeletonsService = inject(SkeletonsService)

  skeletonsService.showHomeLoading()
  return packagesService.getCompletePackages()
    .pipe(
      mergeMap(({ data }) => zip(
        of(data),
        propertiesService.getProperties()
      )),
      finalize(() => {
        skeletonsService.hideHomeLoading()
      })
    )
};
