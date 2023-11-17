import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { PropertyServiceService } from "../services/property-service.service";
import { Property } from "../models/property";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class PropertyResolverService implements Resolve<Property[]> {
  
  propertyList: Property[] = [];
    
  constructor(private propertyService: PropertyServiceService,) { }
  
  resolve(): Observable<Property[]> {
    return this.propertyService.getProperties().pipe(
      map((res) => res.data)
    );
  }
}