import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../features/user/_services/auth.service';
import { API_BASE_URL } from '../tokens/app-urls';
import { IS_PUBLIC_API_REQUEST } from './public-api-context';

const AUTH_RETRY = new HttpContextToken<boolean>(() => false);

export const authSessionInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.context.get(IS_PUBLIC_API_REQUEST)) return next(request);

  const auth = inject(AuthService);
  const apiBaseUrl = inject(API_BASE_URL);
  const isTrustedApi = isTrustedApiRequest(request.url, apiBaseUrl);
  const authEndpoint = isAuthenticationEndpoint(request.url, apiBaseUrl);
  let outgoingRequest = request;

  if (isTrustedApi && authEndpoint) {
    outgoingRequest = outgoingRequest.clone({ withCredentials: true });
  }

  const token = auth.getToken();
  if (isTrustedApi && token && !outgoingRequest.headers.has('Authorization')) {
    outgoingRequest = outgoingRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(outgoingRequest).pipe(
    catchError((error: unknown) => {
      if (
        !(error instanceof HttpErrorResponse) ||
        error.status !== 401 ||
        !isTrustedApi ||
        authEndpoint ||
        request.context.get(AUTH_RETRY)
      ) {
        return throwError(() => error);
      }

      return auth.refreshSession().pipe(
        catchError((refreshError: unknown) => {
          auth.handleRefreshFailure();
          return throwError(() => refreshError);
        }),
        switchMap((newToken) =>
          next(
            request.clone({
              context: request.context.set(AUTH_RETRY, true),
              setHeaders: { Authorization: `Bearer ${newToken}` },
            }),
          ).pipe(
            catchError((retryError: unknown) => {
              if (
                retryError instanceof HttpErrorResponse &&
                retryError.status === 401
              ) {
                auth.handleRefreshFailure();
              }
              return throwError(() => retryError);
            }),
          ),
        ),
      );
    }),
  );
};

function isTrustedApiRequest(requestUrl: string, apiBaseUrl: string): boolean {
  try {
    const request = new URL(requestUrl, apiBaseUrl);
    const api = new URL(apiBaseUrl);
    return request.origin === api.origin && request.pathname.startsWith(api.pathname);
  } catch {
    return false;
  }
}

function isAuthenticationEndpoint(requestUrl: string, apiBaseUrl: string): boolean {
  try {
    const path = new URL(requestUrl, apiBaseUrl).pathname.toLowerCase();
    return (
      path.endsWith('/api/account/login') ||
      path.endsWith('/api/auth/refresh') ||
      path.endsWith('/api/auth/logout')
    );
  } catch {
    return false;
  }
}
