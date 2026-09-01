import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal<'en' | 'ar'>('en');

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public translate: TranslateService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    translate.addLangs(['en', 'ar']);
    const lang = this.getCurrentLanguage();
    this.currentLanguage.set(lang);
    translate.use(lang);
    this.applyDocumentLanguage(lang);
  }

  get isArbic() {
    return this.getCurrentLanguage() === 'ar';
  }

  getCurrentLanguage(): 'en' | 'ar' {
    const storedLanguage = this.cookieService.get('lang');
    const language = this.normalizeLanguage(storedLanguage);

    if (storedLanguage !== language) {
      this.saveLanguageCookie(language);
    }

    return language;
  }

  setGLobalLanguage(lang?: string) {
    const language = this.applyLanguageSelection(lang);

    return this.http.post(
      environment.baseUrl + 'language/set',
      { language },
      {
        withCredentials: true,
        headers: { 'Accept-Language': language },
      },
    );
  }

  setLanguageAndReload(lang?: string): void {
    const language = this.applyLanguageSelection(lang);
    const location = this.document.defaultView?.location;
    if (!location?.pathname) {
      void this.router.navigate([language, 'home']);
      return;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0]?.toLowerCase();
    const localizablePaths = new Set([
      'home', 'destinations', 'tours', 'nile-cruises', 'packages', 'blogs',
    ]);

    if (firstSegment === 'en' || firstSegment === 'ar') {
      pathSegments[0] = language;
    } else if (pathSegments.length === 0 || localizablePaths.has(firstSegment)) {
      pathSegments.unshift(language);
    } else {
      void this.router.navigateByUrl(`/${language}/home`);
      return;
    }

    const target = `/${pathSegments.join('/')}${location.search ?? ''}${location.hash ?? ''}`;
    if (target === `${location.pathname}${location.search ?? ''}${location.hash ?? ''}`) {
      return;
    }
    // A full navigation makes every route recreate its data requests using the
    // newly selected language, including pages that Angular would otherwise reuse.
    location.assign(target);
  }

  /** Applies the language selected by a canonical /en or /ar route without reloading. */
  setLanguage(lang?: string): void {
    this.applyLanguageSelection(lang);
  }

  reloadPage(): void {
    this.document.defaultView?.location.reload();
  }

  private normalizeLanguage(language?: string): 'en' | 'ar' {
    return language?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
  }

  private applyLanguageSelection(lang?: string): 'en' | 'ar' {
    const language = this.normalizeLanguage(lang);
    this.saveLanguageCookie(language);
    this.translate.use(language);
    this.currentLanguage.set(language);
    this.applyDocumentLanguage(language);
    return language;
  }

  private saveLanguageCookie(language: 'en' | 'ar'): void {
    this.cookieService.set('lang', language, {
      path: '/',
      sameSite: 'Lax'
    });
  }

  private applyDocumentLanguage(language: 'en' | 'ar'): void {
    const root = this.document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    this.document.body?.setAttribute('dir', root.dir);
  }
}
