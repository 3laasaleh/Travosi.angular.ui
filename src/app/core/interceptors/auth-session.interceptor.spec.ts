import {
  HttpContext,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { AuthService } from '../../features/user/_services/auth.service';
import { API_BASE_URL } from '../tokens/app-urls';
import { authSessionInterceptor } from './auth-session.interceptor';
import { IS_PUBLIC_API_REQUEST } from './public-api-context';

describe('authSessionInterceptor public requests', () => {
  it('allows a public request through even when a stale user session exists', () => {
    const authService = {
      getToken: vi.fn().mockReturnValue(''),
      getCurentUser: vi.fn().mockReturnValue({ id: 1 }),
      logout: vi.fn(),
    };
    const next = vi.fn().mockReturnValue(of(new HttpResponse({ status: 200 })));
    const request = new HttpRequest('POST', '/public', {}, {
      context: new HttpContext().set(IS_PUBLIC_API_REQUEST, true),
    });
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authService }],
    });

    TestBed.runInInjectionContext(() => {
      authSessionInterceptor(request, next).subscribe();
    });

    expect(next).toHaveBeenCalledWith(request);
    expect(authService.logout).not.toHaveBeenCalled();
  });
});

describe('authSessionInterceptor authenticated requests', () => {
  const apiBaseUrl = 'https://api.seaworldholidays.com/api/';

  afterEach(() => TestBed.resetTestingModule());

  it('attaches the access token only to the configured API origin', async () => {
    const authService = createAuthServiceMock();
    const requests: HttpRequest<unknown>[] = [];
    const next = (request: HttpRequest<unknown>) => {
      requests.push(request);
      return of(new HttpResponse({ status: 200 }));
    };
    configure(authService);

    await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        authSessionInterceptor(
          new HttpRequest('GET', `${apiBaseUrl}Users`),
          next,
        ),
      ),
    );
    await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        authSessionInterceptor(
          new HttpRequest('GET', 'https://untrusted.example/api/data'),
          next,
        ),
      ),
    );

    expect(requests[0].headers.get('Authorization')).toBe('Bearer old-token');
    expect(requests[1].headers.has('Authorization')).toBe(false);
  });

  it('refreshes after a 401 and retries the original request once', async () => {
    const authService = createAuthServiceMock();
    const next = vi.fn((request: HttpRequest<unknown>) =>
      request.headers.get('Authorization') === 'Bearer new-token'
        ? of(new HttpResponse({ status: 200 }))
        : throwError(() => new HttpErrorResponse({ status: 401 })),
    );
    configure(authService);

    const response = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        authSessionInterceptor(
          new HttpRequest('GET', `${apiBaseUrl}Users`),
          next,
        ),
      ),
    );

    expect(response).toBeInstanceOf(HttpResponse);
    expect(authService.refreshSession).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(2);
    expect(authService.handleRefreshFailure).not.toHaveBeenCalled();
  });

  it('does not refresh login or refresh endpoint failures', async () => {
    const authService = createAuthServiceMock();
    const next = vi.fn(() =>
      throwError(() => new HttpErrorResponse({ status: 401 })),
    );
    configure(authService);

    await expect(
      TestBed.runInInjectionContext(() =>
        firstValueFrom(
          authSessionInterceptor(
            new HttpRequest('POST', `${apiBaseUrl}auth/refresh`, {}),
            next,
          ),
        ),
      ),
    ).rejects.toBeInstanceOf(HttpErrorResponse);

    expect(authService.refreshSession).not.toHaveBeenCalled();
  });

  it('clears and redirects when refresh fails', async () => {
    const authService = createAuthServiceMock();
    authService.refreshSession.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 401 })),
    );
    configure(authService);

    await expect(
      TestBed.runInInjectionContext(() =>
        firstValueFrom(
          authSessionInterceptor(
            new HttpRequest('GET', `${apiBaseUrl}Users`),
            () => throwError(() => new HttpErrorResponse({ status: 401 })),
          ),
        ),
      ),
    ).rejects.toBeInstanceOf(HttpErrorResponse);

    expect(authService.handleRefreshFailure).toHaveBeenCalledTimes(1);
  });

  function configure(authService: ReturnType<typeof createAuthServiceMock>): void {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: API_BASE_URL, useValue: apiBaseUrl },
      ],
    });
  }

  function createAuthServiceMock() {
    return {
      getToken: vi.fn().mockReturnValue('old-token'),
      refreshSession: vi.fn().mockReturnValue(of('new-token')),
      handleRefreshFailure: vi.fn(),
    };
  }
});
