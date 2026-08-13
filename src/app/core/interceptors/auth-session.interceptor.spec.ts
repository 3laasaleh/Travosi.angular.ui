import { HttpContext, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../features/user/_services/auth.service';
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
