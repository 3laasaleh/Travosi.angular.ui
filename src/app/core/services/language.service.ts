import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal<'en' | 'ar'>('en');

  constructor(private http: HttpClient, private cookieService: CookieService, public translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    const lang = this.getCurrentLanguage();
    this.currentLanguage.set(lang);
    translate.use(lang);
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
    const language = this.normalizeLanguage(lang);
    this.saveLanguageCookie(language);
    this.translate.use(language);
    this.currentLanguage.set(language);

    return this.http.post(environment.baseUrl + 'language/set', { language });
  }

  private normalizeLanguage(language?: string): 'en' | 'ar' {
    return language?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
  }

  private saveLanguageCookie(language: 'en' | 'ar'): void {
    this.cookieService.set('lang', language, {
      path: '/',
      sameSite: 'Strict'
    });
  }
}
