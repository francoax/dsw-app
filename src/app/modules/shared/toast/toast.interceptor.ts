import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastService } from './toast.service';
import { ApiResponse } from 'src/app/models/common';

@Injectable()
export class ToastInterceptor implements HttpInterceptor {

  constructor(private readonly toastSvs : ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap((event) => {
      if(event.type === HttpEventType.Response) {
        const response = event.body as ApiResponse
        if(response.error) {
          this.toastSvs.setup({ message : response.message, status: false})
        }

        if(!response.error) {
          this.toastSvs.setup({ message : response.message, status: true})
        }

        this.toastSvs.show()
      }
    }));
  }
}
