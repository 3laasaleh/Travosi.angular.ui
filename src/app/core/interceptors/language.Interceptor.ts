import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable() 
export class LanguageInterceptor implements HttpInterceptor {
  constructor( private coockie: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lang = this.coockie.get("lang")??"ar";
    const cloned = req.clone({
      setHeaders: {
        'Accept-Language':lang
      }
    });

    return next.handle(cloned);
  }
}
