import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  readonly baseUrl = "http://localhost:4000/api/property/";
  constructor(private http:HttpClient) { }
  
  createProperty(prop: Property):Observable<Property> {
    const url = this.baseUrl;
    return this.http.post<Property>(url,prop);
  }
  getProperties():Observable<Property[]>{
    const url = this.baseUrl;
    return this.http.get<Property[]>(url);
  }

  deleteProperty(){
    const url = this.baseUrl + ':id';
    return this.http.delete<Property>(url);
    }
  UpdateProperty(prop: Property){
    const url = this.baseUrl + ':id';
    return this.http.put<Property>(url,prop);
    }


}
