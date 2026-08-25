import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
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
    this.applyLanguageSelection(lang);
    this.reloadPage();
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
