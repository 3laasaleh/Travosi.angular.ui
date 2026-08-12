import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const languageInterceptor: HttpInterceptorFn = (request, next) => {
  const storedLanguage = inject(CookieService).get('lang');
  const language = storedLanguage.toLowerCase().startsWith('ar') ? 'ar' : 'en';

  return next(request.clone({
    setHeaders: {
      'Accept-Language': language,
    },
  }));
};
