import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, map, of } from "rxjs";
import { Car } from "../models/car";
import { CarService } from "../services/car/car.service";

@Injectable({ providedIn: 'root'})
export class CarResolverService implements Resolve<Car[]> {
  
  carList: Car[] = [];
    
  constructor(private carService: CarService) { }
  
  resolve(): Observable<any> {
    return this.carService.getCars().pipe(
      map((res) => res.data)
    );
  }
}