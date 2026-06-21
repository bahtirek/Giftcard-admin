import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth-interceptor';
import { globalHttpErrorInterceptor } from './core/http/global-http-error-interceptor';
import { API_URL } from './app.config.tokens';
import { environment } from '../environments/environment';
import { loaderInterceptor } from './core/loader/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        globalHttpErrorInterceptor,
        loaderInterceptor
      ])
    ),
    { provide: API_URL, useValue: environment.apiUrl }
  ]
};
