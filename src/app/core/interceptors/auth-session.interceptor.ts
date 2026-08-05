import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/user/_services/auth.service';

export const authSessionInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const currentUser = authService.getCurentUser();
  const hasAuthentication =
    !!token || !!currentUser || request.headers.has('Authorization');

  // A user cookie without its token is an invalid logged-in session.
  if (currentUser && !token) {
    authService.logout();
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Authentication session is missing',
          url: request.url,
        }),
    );
  }

  if (token) {
    let expired = true;
    try {
      expired = authService.isTokenExpired();
    } catch {
      expired = true;
    }

    if (expired) {
      authService.logout();
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            statusText: 'Authentication token has expired',
            url: request.url,
          }),
      );
    }
  }

  return next(request).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        hasAuthentication
      ) {
        authService.logout();
      }
      return throwError(() => error);
    }),
  );
};
