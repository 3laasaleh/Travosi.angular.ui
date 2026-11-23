import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RoleEnum } from '../../../core/enums/role.enum';
import { AuthService } from './auth.service';

describe('AuthService refresh sessions', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let isTokenExpired: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    isTokenExpired = vi.fn().mockReturnValue(false);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: Router,
          useValue: {
            url: '/en/configurations',
            navigate: vi.fn(),
            navigateByUrl: vi.fn(),
            parseUrl: vi.fn().mockReturnValue({
              root: {
                children: {
                  primary: { segments: [{ path: 'en' }, { path: 'configurations' }] },
                },
              },
            }),
          },
        },
        {
          provide: JwtHelperService,
          useValue: { isTokenExpired },
        },
      ],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('shares one HTTP refresh across simultaneous callers', async () => {
    const first = firstValueFrom(service.refreshSession());
    const second = firstValueFrom(service.refreshSession());
    const request = http.expectOne(environment.baseUrl + 'auth/refresh');

    expect(request.request.withCredentials).toBe(true);
    request.flush({
      accessToken: 'new-access-token',
      expiresIn: 900,
      user: {
        userId: '1',
        userName: 'Test User',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        mobile: '100',
        role: RoleEnum.Admin,
      },
    });

    await expect(Promise.all([first, second])).resolves.toEqual([
      'new-access-token',
      'new-access-token',
    ]);
    expect(service.getToken()).toBe('new-access-token');
    expect(service.getCurentUser()?.email).toBe('test@example.com');
  });

  it('restores a browser session through the refresh cookie', async () => {
    const restored = firstValueFrom(service.restoreSession());
    const request = http.expectOne(environment.baseUrl + 'auth/refresh');
    request.flush({
      accessToken: 'restored-token',
      expiresIn: 900,
      user: {
        userId: '2',
        userName: 'Customer User',
        email: 'customer@example.com',
        mobile: '200',
        role: RoleEnum.Customer,
      },
    });

    await restored;
    expect(service.isLoggedIn()).toBe(true);
  });

  it('keeps the session logged in while an expired access token awaits refresh', async () => {
    const restored = firstValueFrom(service.restoreSession());
    http.expectOne(environment.baseUrl + 'auth/refresh').flush({
      accessToken: 'soon-expired-token',
      expiresIn: 900,
      user: {
        userId: '3',
        userName: 'Booking User',
        email: 'booking@example.com',
        mobile: '300',
        role: RoleEnum.Customer,
      },
    });
    await restored;
    isTokenExpired.mockReturnValue(true);

    expect(service.isTokenExpired()).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
  });
});
