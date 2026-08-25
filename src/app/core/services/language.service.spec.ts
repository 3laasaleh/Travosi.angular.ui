import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  it('applies Arabic direction and reloads the current page', () => {
    const reload = vi.fn();
    const body = { setAttribute: vi.fn() };
    const documentElement = { lang: 'en', dir: 'ltr' };
    const documentRef = {
      documentElement,
      body,
      defaultView: { location: { reload } },
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
    const service = new LanguageService(http, cookies, translate, documentRef);

    service.setLanguageAndReload('ar');

    expect(documentElement).toEqual({ lang: 'ar', dir: 'rtl' });
    expect(body.setAttribute).toHaveBeenLastCalledWith('dir', 'rtl');
    expect(cookies.set).toHaveBeenLastCalledWith('lang', 'ar', {
      path: '/',
      sameSite: 'Lax',
    });

    expect(reload).toHaveBeenCalledTimes(1);
    expect(http.post).not.toHaveBeenCalled();
  });
});
