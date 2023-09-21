import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*import { Property } from '../models/property';*/

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
 
  readonly baseUrl = "http://localhost:4000/api/cars/";
  constructor(private http:HttpClient) { }
  
  /*createProperty(prop:Property) {
    const url = this.baseUrl;
    this.http.post<Property>(url,prop).subscribe(Response => console.log(prop));
    
  }*/
}
