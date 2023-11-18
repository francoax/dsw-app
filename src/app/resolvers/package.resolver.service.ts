import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, map, of } from "rxjs";
import Package from "../models/package";
import { PackageService } from "../services/package/package.service";

@Injectable({ providedIn: 'root'})
export class PackageResolverService implements Resolve<Package[]> {
  
  packageList: Package[] = [];
    
  constructor(private packageService: PackageService) { }
  
  resolve(): Observable<any> {
    return this.packageService.getAll().pipe(
      map((res) => res.data)
    );
    
  }
}