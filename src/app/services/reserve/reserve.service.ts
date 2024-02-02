import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app/app.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common';
import Reserve from 'src/app/models/reserve';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  private API = this.appService.apiUrl + '/api/reserves/';
  constructor(
    private http: HttpClient,
    private readonly appService: AppConfigService
  ) {}

  createReserve(reserve: Reserve): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.API, reserve);
  }

  getReservesByUser(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API + 'user');
  }

  deleteReserve(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.API + id);
  }

  getReservesBetween(
    start: Date,
    end: Date,
    idCar: string
  ): Observable<ApiResponse> {
    start = new Date(start);
    end = new Date(end);
    return this.http.get<ApiResponse>(
      `${this.API}validate-dates?start=${start}&end=${end}&idCar=${idCar}`
    );
  }

  getReservesFromProperty(propertyId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.API}property-reserves/${propertyId}`
    );
  }
}
