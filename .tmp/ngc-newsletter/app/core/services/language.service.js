import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-cookie-service";
import * as i3 from "@ngx-translate/core";
export class LanguageService {
    http;
    cookieService;
    translate;
    document;
    currentLanguage = signal('en', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentLanguage" }] : /* istanbul ignore next */ []));
    constructor(http, cookieService, translate, document) {
        this.http = http;
        this.cookieService = cookieService;
        this.translate = translate;
        this.document = document;
        translate.addLangs(['en', 'ar']);
        const lang = this.getCurrentLanguage();
        this.currentLanguage.set(lang);
        translate.use(lang);
        this.applyDocumentLanguage(lang);
    }
    get isArbic() {
        return this.getCurrentLanguage() === 'ar';
    }
    getCurrentLanguage() {
        const storedLanguage = this.cookieService.get('lang');
        const language = this.normalizeLanguage(storedLanguage);
        if (storedLanguage !== language) {
            this.saveLanguageCookie(language);
        }
        return language;
    }
    setGLobalLanguage(lang) {
        const language = this.normalizeLanguage(lang);
        this.saveLanguageCookie(language);
        this.translate.use(language);
        this.currentLanguage.set(language);
        this.applyDocumentLanguage(language);
        return this.http.post(environment.baseUrl + 'language/set', { language }, {
            withCredentials: true,
            headers: { 'Accept-Language': language },
        });
    }
    normalizeLanguage(language) {
        return language?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    }
    saveLanguageCookie(language) {
        this.cookieService.set('lang', language, {
            path: '/',
            sameSite: 'Lax'
        });
    }
    applyDocumentLanguage(language) {
        const root = this.document.documentElement;
        root.lang = language;
        root.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
    static ɵfac = function LanguageService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || LanguageService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.CookieService), i0.ɵɵinject(i3.TranslateService), i0.ɵɵinject(DOCUMENT)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LanguageService, factory: LanguageService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LanguageService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }, { type: i2.CookieService }, { type: i3.TranslateService }, { type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }], null); })();
