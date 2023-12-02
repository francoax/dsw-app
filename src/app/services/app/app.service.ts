import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private showSearchBarSubject = new BehaviorSubject<boolean>(false)
  showSearchBar$ = this.showSearchBarSubject.asObservable()

  get apiUrl() : string {
    return environment.apiUrl
  }

  setDisplaySearchBar(value : boolean) : void {
    this.showSearchBarSubject.next(value)
  }
}
