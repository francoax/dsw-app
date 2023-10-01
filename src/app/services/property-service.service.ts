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
  
  createProperty(prop: Property):Observable<Property> {
    const url = this.baseUrl;
    return this.http.post<Property>(url,prop);
  }

  getProperties():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  deleteProperty(){
    const url = this.baseUrl + ':id';
    return this.http.delete<Property>(url);
    }
  UpdateProperty(prop: Property){
    const url = this.baseUrl + ':id';
    return this.http.put<Property>(url,prop);
    }
    getPropertiesTypes():Observable<ApiResponse>{
      return this.http.get<ApiResponse>(environment.apiUrl+"/api/propertie-types");
    }

}
