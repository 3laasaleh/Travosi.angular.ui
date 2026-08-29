import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  it('applies Arabic direction and navigates to the localized route without reloading', () => {
    const body = { setAttribute: vi.fn() };
    const documentElement = { lang: 'en', dir: 'ltr' };
    const documentRef = {
      documentElement,
      body,
      defaultView: { location: { pathname: '/en/tours/hurghada', search: '', hash: '' } },
    } as unknown as Document;
    const http = {
      post: vi.fn().mockReturnValue(of({ isSuccess: true })),
    } as unknown as HttpClient;
    const cookies = {
      get: vi.fn().mockReturnValue('en'),
      set: vi.fn(),
    } as unknown as CookieService;
    const translate = {
      addLangs: vi.fn(),
      use: vi.fn(),
    } as unknown as TranslateService;
    const router = { navigateByUrl: vi.fn(), navigate: vi.fn() };
    const service = new LanguageService(http, cookies, translate, router as any, documentRef);

    service.setLanguageAndReload('ar');

    expect(documentElement).toEqual({ lang: 'ar', dir: 'rtl' });
    expect(body.setAttribute).toHaveBeenLastCalledWith('dir', 'rtl');
    expect(cookies.set).toHaveBeenLastCalledWith('lang', 'ar', {
      path: '/',
      sameSite: 'Lax',
    });

    expect(router.navigateByUrl).toHaveBeenCalledWith('/ar/tours/hurghada');
    expect(http.post).not.toHaveBeenCalled();
  });
});
