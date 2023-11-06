/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../../models/property';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '../../models/common';
import { AppConfigService } from '../app/app.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyServiceService {
  private readonly baseUrl = this.appService.apiUrl + '/api/property/';
  private propertyListSubject = new Subject<Property[]>();
  properties: Property[] = [];

  constructor(private appService: AppConfigService, private http: HttpClient) {}

  get propertyList() {
    return this.propertyListSubject.asObservable();
  }
  actualizarLista() {
    this.getProperties().subscribe((response) => {
      this.properties = response.data;
    });
    this.propertyListSubject.next(this.properties);
  }

  createProperty(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, formData);
  }

  getProperties(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getProperty(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.baseUrl}/api/property/${id}`
    );
  }

  deleteProperty(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.baseUrl}/api/property/${id}`
    );
  }
  UpdateProperty(prop: Property, id: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.baseUrl}/api/property/${id}`,
      prop
    );
  }
  getPropertiesTypes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      this.baseUrl + '/api/propertie-types'
    );
  }
}
