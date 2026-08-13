import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { authSessionInterceptor } from './core/interceptors/auth-session.interceptor';
import { languageInterceptor } from './core/interceptors/language.Interceptor';
export const appConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideAnimationsAsync(),
        provideHttpClient(withXhr(), withInterceptors([languageInterceptor, authSessionInterceptor])),
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
                failOnError: true
            })
        }),
    ],
};
