import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/common';


@Injectable({
  providedIn: 'root'
})
export class CarsServiceService {

  constructor(private http:HttpClient) { }

  createCar(car:Car):Observable<Car>{
    const url = environment.apiUrl+"/api/cars";
    return this.http.post<Car>(url,car);
  }
  getCars():Observable<ApiResponse>{
    const url = environment.apiUrl+"/api/cars/";
    return this.http.get<ApiResponse>(url);
  }

  deleteCar(id:string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${environment.apiUrl}/api/cars/${id}`)
    }
  UpdateCar(car:Car, id:string):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${environment.apiUrl}/api/cars/${id}`,car);
    }






}
