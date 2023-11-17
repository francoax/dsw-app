/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  readonly baseUrl = environment.apiUrl +"/api/property/";
  private propertyListSubject = new Subject<Property[]>();
  properties:Property[] =[];
  
  
  constructor(private http:HttpClient) { }

  get propertyList(){
    return this.propertyListSubject.asObservable();
  }
  actualizarLista(){
    this.getProperties().subscribe((response) => {this.properties = response.data;
    });
    this.propertyListSubject.next(this.properties);

  }
  
  createProperty(formData : FormData):Observable<ApiResponse> {
    const url = this.baseUrl;
    return this.http.post<ApiResponse>(url,formData);
  }

  getProperties():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  deleteProperty(id:string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${environment.apiUrl}/api/property/${id}`)
    }
  UpdateProperty(prop: Property,id:string):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${environment.apiUrl}/api/property/${id}`,prop);
    }
    getPropertiesTypes():Observable<ApiResponse>{
      return this.http.get<ApiResponse>(environment.apiUrl+"/api/propertie-types");
    }

    getOne(id: string):Observable<ApiResponse>{
      return this.http.get<ApiResponse>(`${environment.apiUrl}/api/property/${id}`);
    }
}

