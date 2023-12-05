import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SkeletonsService } from '../skeletons.service';

@Injectable()
export class HomeInterceptor implements HttpInterceptor {

  constructor(private readonly skeletonService : SkeletonsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.skeletonService.showHomeLoading()
    return next.handle(request).pipe(
      finalize(() => this.skeletonService.hideHomeLoading())
    );
  }
}
