import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { environment } from '../environments/environment';
import { API_BASE_URL, PUBLIC_BASE_URL, INDEXING_ENABLED, normalizeApiBaseUrl, normalizeBaseUrl } from './core/tokens/app-urls';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: INDEXING_ENABLED,
      useValue: environment.indexingEnabled,
    },
    {
      provide: API_BASE_URL,
      useFactory: () => normalizeApiBaseUrl(process.env['API_BASE_URL'] || environment.baseUrl),
    },
    {
      provide: PUBLIC_BASE_URL,
      useValue: normalizeBaseUrl(environment.publicBaseUrl),
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
