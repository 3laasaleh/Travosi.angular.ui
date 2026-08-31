import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

import { provideTranslateService } from '@ngx-translate/core';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { authSessionInterceptor } from './core/interceptors/auth-session.interceptor';
import { languageInterceptor } from './core/interceptors/language.Interceptor';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { API_BASE_URL, PUBLIC_BASE_URL, normalizeApiBaseUrl, normalizeBaseUrl } from './core/tokens/app-urls';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([languageInterceptor, authSessionInterceptor])),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/lang/',
        suffix: '.json',
        enforceLoading: true,
        failOnError: true,
      }),
    }),
    { provide: API_BASE_URL, useValue: normalizeApiBaseUrl(environment.baseUrl) },
    { provide: PUBLIC_BASE_URL, useValue: normalizeBaseUrl(environment.publicBaseUrl) },
    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: (request) => request.method === 'GET' && !request.headers.has('Authorization'),
      }),
    ),
  ],
};
