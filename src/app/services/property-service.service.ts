/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/api-response';
@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  readonly baseUrl = environment.apiUrl +"/api/property/";
  constructor(private http:HttpClient) { }
  
  createProperty(prop: Property):Observable<ApiResponse> {
    const url = this.baseUrl;
    return this.http.post<ApiResponse>(url,prop);
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

}

