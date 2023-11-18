import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, map, of } from "rxjs";
import { MedicalAssistance } from "../models/medical-assistance";
import { MedicalAssistanceService } from "../services/medical-assitance/medical-assistance.service";

@Injectable({ providedIn: 'root'})
export class MedicalAssistanceResolverService implements Resolve<MedicalAssistance[]> {
  
  medAssistList: MedicalAssistance[] = [];
    
  constructor(private medAssistService: MedicalAssistanceService) { }
  
  resolve(): Observable<any> {
    return this.medAssistService.getAll().pipe(
      map((res) => res.data)
    );
  }
}