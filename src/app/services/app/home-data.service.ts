/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { PackageService } from '../package/package.service';
import { PropertyServiceService } from '../property/property-service.service';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {

  constructor(
    private readonly packagesService : PackageService,
    private readonly propertiesService : PropertyServiceService
  ) {}

  initHomeData() : Observable<any[]> {
    const packages = this.packagesService.getCompletePackages()
    const properties = this.propertiesService.getProperties()

    return forkJoin([packages, properties]).pipe(
      map(([packages, properties]) => {
        return [packages.data, properties.data]
      })
    )
  }
}
