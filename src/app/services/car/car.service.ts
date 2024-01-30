import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app/app.service';
import { ApiResponse } from 'src/app/models/common';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private API = this.appService.apiUrl + '/api/cars/';
  constructor(
    private http: HttpClient,
    private readonly appService: AppConfigService
  ) {}

  getCar(carId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API + carId);
  }

  getCars(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API);
  }

  getCarsFromLocation(location : string) {
    console.log('hola manolo');
    console.log(location);
    return this.http.get<ApiResponse>(`${this.API}?location=${location}`)
  }
  deleteCar(id : string) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.API}${id}`)
  }
  createCar(newCar : Car) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.API, newCar)
  }

  updateCar(id : string, carUpdated : Car) : Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.API}${id}`, carUpdated)
  }
}
