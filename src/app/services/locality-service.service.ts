import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app/app.service';
import { ApiResponse } from 'src/app/models/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalityServiceService {

  private readonly baseUrl : string = this.appService.apiUrl + '/api/locations/';

  constructor(private http:HttpClient,
    private readonly appService: AppConfigService) { }

  getLocalities():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl);
  }
  getLocality(id: string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}${id}`);
  }













}
