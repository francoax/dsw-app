import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private showSearchBarSubject = new BehaviorSubject<boolean>(false)
  showSearchBar$ = this.showSearchBarSubject.asObservable()

  private provideInputValueSubject = new Subject<string>();
  provideInputValue$= this.provideInputValueSubject.asObservable();

  private showBackBtnSubject = new BehaviorSubject<boolean>(false)
  showshowBackBtn$ = this.showSearchBarSubject.asObservable()

  get apiUrl() : string {
    return environment.apiUrl
  }

  setDisplaySearchBar(value : boolean) : void {
    this.showSearchBarSubject.next(value)
  }
  setInputValue(value : string) :void{
    this.provideInputValueSubject.next(value);
  }
  seDisplayBackBtn(value : boolean) : void {
    this.showSearchBarSubject.next(value)
  }
  
}
