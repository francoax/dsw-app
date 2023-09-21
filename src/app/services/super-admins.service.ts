import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminList } from '../models/superAdmin';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminsService {

  constructor(private readonly http : HttpClient) { }

  getAdmins() : Observable<AdminList[]> {
    return this.http.get<AdminList[]>('');
  }
}
