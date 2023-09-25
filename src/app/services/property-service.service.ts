import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  readonly baseUrl = "http://localhost:4200/api/Property/";
  constructor(private http:HttpClient) { }
  
  createProperty(prop: Partial<{ capacity: string | null; address: string | null; pricePerNight: Partial<{ price: string | null; date: string | null; }>; propertyType: string | null; }>) {
    const url = this.baseUrl;
    this.http.post(url,prop).subscribe((Res) => console.log(Res));
  }
  getProperties(){
    const url = this.baseUrl;
    return this.http.get<Property>(url);
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
