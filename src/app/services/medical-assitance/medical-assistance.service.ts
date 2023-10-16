import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MedicalAssistanceRequest } from '../../models/medical-assistance-request';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { MedicalAssistance } from '../../models/medical-assistance';
import { AppConfigService } from '../app/app.service';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MedicalAssistanceService {

  private readonly url : string = this.appService.apiUrl;

  constructor(
    private http: HttpClient,
    private readonly appService : AppConfigService) { }

  add(medicalAsist: MedicalAssistanceRequest):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.url + '/api/medicalAssistance', medicalAsist, httpOption);
  }

  getAll(){
    return this.http.get<ApiResponse>(this.url + '/api/medicalAssistance');
  }

  edit(medAsist : MedicalAssistance){
    return this.http.put<ApiResponse>(this.url + '/api/medicalAssistance/' + medAsist._id, medAsist, httpOption)
  }

  delete(medAsist : MedicalAssistance){
    return this.http.delete<ApiResponse>(this.url + '/api/medicalAssistance/' + medAsist._id)
  }
}
