import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  get apiUrl() : string {
    return environment.apiUrl
  }
}
