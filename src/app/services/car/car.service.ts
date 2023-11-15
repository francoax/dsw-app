import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app/app.service';
import { ApiResponse } from 'src/app/models/common';
import { Observable } from 'rxjs';

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
}
