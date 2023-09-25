import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarsServiceService {
  readonly baseUrl = "http://localhost:4200/api/Property/";
  constructor(private http:HttpClient) { }

  createCar(prop:Car) {
    const url = this.baseUrl;
    this.http.post(url,prop).subscribe((Res) => console.log(Res));
  }
  getCars(){
    const url = this.baseUrl;
    return this.http.get(url);
  }

  deleteCar(){
    const url = this.baseUrl + ':id';
    return this.http.delete(url);
    }
  UpdateCar(prop:Car){
    const url = this.baseUrl + ':id';
    return this.http.put(url,prop);
    }






}
