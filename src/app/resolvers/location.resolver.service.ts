/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LocationService } from '../services/location/location.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LocationResolverService implements Resolve<any[]> {
  locationsList = [];

  constructor(private locationService: LocationService) {}

  resolve(): Observable<any[]> {
    return this.locationService.getAll().pipe(map((res) => res.data));
  }
}
