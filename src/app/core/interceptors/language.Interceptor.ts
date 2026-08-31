import { HttpInterceptorFn } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { REQUEST, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const languageInterceptor: HttpInterceptorFn = (request, next) => {
  const serverRequest = inject(REQUEST, { optional: true });
  const pathname = serverRequest
    ? new URL(serverRequest.url).pathname
    : inject(DOCUMENT).defaultView?.location.pathname ?? '';
  const routeLanguage = pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  const storedLanguage = inject(CookieService).get('lang');
  const language = routeLanguage === 'ar' || routeLanguage === 'en'
    ? routeLanguage
    : storedLanguage.toLowerCase().startsWith('ar') ? 'ar' : 'en';

  return next(request.clone({
    setHeaders: {
      'Accept-Language': language,
    },
  }));
};
