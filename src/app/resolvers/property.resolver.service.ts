import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { PropertyServiceService } from "../services/property-service.service";
import { Property, PropertyV2 } from "../models/property";
import { Observable, filter } from "rxjs";
import { map } from 'rxjs/operators';
import Package from "../models/package";

@Injectable({ providedIn: 'root'})
export class PropertyResolverService implements Resolve<PropertyV2[]> {
  
  propertyList: Property[] = [];
    
  constructor(private propertyService: PropertyServiceService,) { }
  
  resolve(): Observable<PropertyV2[]> {
    return this.propertyService.getProperties().pipe(
      map((res) => res.data),
    );
  }
}