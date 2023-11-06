import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app/app.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common';
import Reserve from 'src/app/models/reserve';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  private API = this.appService.apiUrl + '/api/reserves/';
  constructor(
    private http: HttpClient,
    private readonly appService: AppConfigService
  ) {}

  createReserve(reserve: Reserve, token: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.API, reserve, {
      headers: { Authorization: 'Bearer ' + token },
    });
  }
}
