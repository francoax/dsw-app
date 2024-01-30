/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property, PropertyCreation } from '../../models/property';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../../models/common';
import { AppConfigService } from '../app/app.service';
import { PropertyType } from 'src/app/models/property-type';

@Injectable({
  providedIn: 'root',
})
export class PropertyServiceService {
  private propertyListSubject = new Subject<Property[]>();
  properties: Property[] = [];
  private readonly baseUrl: string =
    this.appService.apiUrl + '/api/properties/';
  private readonly baseUrl2: string =
    this.appService.apiUrl + '/api/property-types/';

  constructor(
    private http: HttpClient,
    private readonly appService: AppConfigService
  ) {}

  get propertyList() {
    return this.propertyListSubject.asObservable();
  }
  actualizarLista() {
    this.getProperties().subscribe((response) => {
      this.properties = response.data;
    });
    this.propertyListSubject.next(this.properties);
  }

  createProperty(newProperty: PropertyCreation): Observable<ApiResponse> {
    console.log(newProperty)
    return this.http.post<ApiResponse>(this.baseUrl, newProperty);
  }

  getProperties(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getProperty(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}${id}`);
  }

  deleteProperty(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
  UpdateProperty(prop: Property, id: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}${id}`, prop);
  }

  getPropertiesTypes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl2);
  }

  createPropertyType(newType: PropertyType): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl2, newType);
  }

  updatePropertyType(
    id: string,
    typeUpdated: PropertyType
  ): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl2 + id, typeUpdated);
  }

  deletePropertyType(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl2 + id);
  }
}
