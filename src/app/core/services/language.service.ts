import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal<string>("");
  constructor(private http: HttpClient, private cookieService: CookieService, public translate: TranslateService) {

    translate.addLangs(['en', 'ar']);
    let lang = this.getCurrentLanguage();
    translate.use(lang);

  }

  get isArbic() {
    return this.getCurrentLanguage() == "ar";
  }
  getCurrentLanguage() {
    let lang = this.cookieService.get("lang");
    if (!lang) {
      lang = "ar"
      this.setGLobalLanguage(lang);
    }
    return lang;

  }


  setGLobalLanguage(lang?: string) {
    if (!lang)
      lang = "ar";
    // Save in cookie
    this.cookieService.set('lang', lang, {
      path: '/',
      sameSite: 'Strict' // or 'Strict' depending on your case
    });
    this.translate.use(lang);
    this.currentLanguage.update(v => v = lang);

    // Update subject
    // Call API to update server-side culture
    return this.http.post(environment.baseUrl + 'language/set', { language: lang });
  }
}
