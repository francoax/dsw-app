/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '../models/common';
import { AppConfigService } from './app/app.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  private readonly baseUrl : string = this.appService.apiUrl + '/api/property/';
  private readonly baseUrl2 : string = this.appService.apiUrl + '/api/propertie-types/';

  private propertyListSubject = new Subject<Property[]>();
  properties:Property[] =[];
  
  
  constructor(private http:HttpClient,
    private readonly appService: AppConfigService) { }

  get propertyList(){
    return this.propertyListSubject.asObservable();
  }
  actualizarLista(){
    this.getProperties().subscribe((response) => {this.properties = response.data;
    });
    this.propertyListSubject.next(this.properties);

  }
  
  createProperty(formData : FormData):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, formData);
  }

  getProperties():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  deleteProperty(id:string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
    }
  UpdateProperty(prop: Property,id:string):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.baseUrl}${id}`, prop);
    }
    getPropertiesTypes():Observable<ApiResponse>{
      return this.http.get<ApiResponse>(this.baseUrl2);
    }

    getOne(id: string):Observable<ApiResponse>{
      return this.http.get<ApiResponse>(`${this.baseUrl}${id}`);
    }
}

