import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { environment } from '../environments/environment';
import { API_BASE_URL, PUBLIC_BASE_URL, normalizeApiBaseUrl, normalizeBaseUrl } from './core/tokens/app-urls';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: API_BASE_URL,
      useFactory: () => normalizeApiBaseUrl(process.env['API_BASE_URL'] || environment.baseUrl),
    },
    {
      provide: PUBLIC_BASE_URL,
      useFactory: () => normalizeBaseUrl(process.env['PUBLIC_BASE_URL'] || environment.publicBaseUrl),
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
