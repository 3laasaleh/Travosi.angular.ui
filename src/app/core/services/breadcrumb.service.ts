import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LanguageService } from './language.service';

export interface BreadcrumbItem {
  /** Localized label shown to the visitor and published in the BreadcrumbList schema. */
  name: string;
  /** Absolute, language prefixed path used both for routerLink and for the schema `item`. */
  path: string;
}

interface SegmentDefinition {
  en: string;
  ar: string;
  /** Path segment the crumb links to when it differs from the URL segment. */
  path?: string;
  /** Key of a parent crumb that has to be inserted before this one. */
  parent?: string;
}

const SEGMENTS: Record<string, SegmentDefinition> = {
  destinations: { en: 'Destinations', ar: 'الوجهات' },
  cities: { en: 'Destinations', ar: 'الوجهات', path: 'destinations' },
  tours: { en: 'Tours', ar: 'الجولات' },
  'nile-cruises': { en: 'Nile Cruises', ar: 'الرحلات النيلية' },
  packages: { en: 'Packages', ar: 'الباقات' },
  blogs: { en: 'Blog', ar: 'المدونة' },
  aboutus: { en: 'About Us', ar: 'من نحن' },
  contact: { en: 'Contact Us', ar: 'اتصل بنا' },
  terms: { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  privacy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  helpcenter: { en: 'Help Center', ar: 'مركز المساعدة' },
  'helpcenter-faqs': { en: 'FAQs', ar: 'الأسئلة الشائعة', parent: 'helpcenter' },
  'helpcenter-guides': { en: 'Guides', ar: 'الأدلة الإرشادية', parent: 'helpcenter' },
  'helpcenter-support': { en: 'Support', ar: 'الدعم', parent: 'helpcenter' },
  login: { en: 'Sign In', ar: 'تسجيل الدخول' },
  signup: { en: 'Sign Up', ar: 'إنشاء حساب' },
  'signup-success': { en: 'Sign Up', ar: 'إنشاء حساب' },
  'forgot-password': { en: 'Forgot Password', ar: 'نسيت كلمة المرور' },
  'reset-password': { en: 'Reset Password', ar: 'إعادة تعيين كلمة المرور' },
  'user-profile': { en: 'My Account', ar: 'حسابي' },
  'user-setting': { en: 'Account Settings', ar: 'إعدادات الحساب' },
  'user-booking': { en: 'My Bookings', ar: 'حجوزاتي' },
  'user-payment': { en: 'Payments', ar: 'المدفوعات' },
  'user-invoice': { en: 'Invoices', ar: 'الفواتير' },
  'user-social': { en: 'Social Accounts', ar: 'الحسابات الاجتماعية' },
  'user-notification': { en: 'Notifications', ar: 'الإشعارات' },
  configurations: { en: 'Dashboard', ar: 'لوحة التحكم' },
  hotels: { en: 'Hotels', ar: 'الفنادق' },
  airlines: { en: 'Airlines', ar: 'شركات الطيران' },
  flights: { en: 'Flights', ar: 'الرحلات الجوية' },
  customers: { en: 'Customers', ar: 'العملاء' },
  tasks: { en: 'Tasks', ar: 'المهام' },
  quotations: { en: 'Quotations', ar: 'عروض الأسعار' },
  invoices: { en: 'Invoices', ar: 'الفواتير' },
  vouchers: { en: 'Vouchers', ar: 'القسائم' },
  bookings: { en: 'Bookings', ar: 'الحجوزات' },
  'contact-messages': { en: 'Contact Messages', ar: 'رسائل التواصل' },
};

/**
 * Builds the breadcrumb trail for the active route once, so the visible navigation and the
 * BreadcrumbList structured data can never drift apart.
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);
  private readonly language = inject(LanguageService);
  private readonly document = inject(DOCUMENT);
  private readonly url = signal(this.router.url);

  /** Title of the currently displayed entity (tour, package, city, blog...) when it is known. */
  private readonly currentTitle = signal('');

  readonly items = computed<BreadcrumbItem[]>(() => this.build(this.url(), this.currentTitle()));
  readonly isHome = computed(() => this.items().length <= 1);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentTitle.set('');
        this.url.set(event.urlAfterRedirects);
      });
  }

  /** Lets the SEO service share the resolved page title so detail pages show a real last crumb. */
  setCurrentTitle(title: string): void {
    this.currentTitle.set(title.trim());
  }

  private build(url: string, currentTitle: string): BreadcrumbItem[] {
    const path = this.normalize(url);
    const segments = path.split('/').filter(Boolean);
    const hasLanguagePrefix = segments[0] === 'en' || segments[0] === 'ar';
    const language = hasLanguagePrefix ? (segments[0] as 'en' | 'ar') : this.language.currentLanguage();
    const root = `/${language}`;
    const rest = hasLanguagePrefix ? segments.slice(1) : segments;
    const section = rest[0];

    const items: BreadcrumbItem[] = [
      { name: language === 'ar' ? 'الرئيسية' : 'Home', path: `${root}/home` },
    ];
    if (!section || section === 'home') return items;

    const definition = SEGMENTS[section];
    if (definition?.parent) {
      const parent = SEGMENTS[definition.parent];
      items.push({ name: this.label(parent, definition.parent, language), path: `${root}/${definition.parent}` });
    }
    items.push({
      name: this.label(definition, section, language),
      path: `${root}/${definition?.path ?? section}`,
    });

    const leaf = rest[rest.length - 1];
    if (rest.length > 1) {
      // Admin sub pages use fixed labels; public detail routes carry a slug we resolve from the page title.
      const child = section === 'configurations' ? SEGMENTS[leaf] : undefined;
      items.push({
        name: child ? this.label(child, leaf, language) : currentTitle || this.humanize(leaf),
        path,
      });
    }
    return items;
  }

  private label(definition: SegmentDefinition | undefined, segment: string, language: 'en' | 'ar'): string {
    if (!definition) return this.humanize(segment);
    return language === 'ar' ? definition.ar : definition.en;
  }

  private humanize(segment: string): string {
    const decoded = this.decode(segment).replace(/[-_]+/g, ' ').trim();
    if (!decoded) return '';
    return /[\u0600-\u06FF]/.test(decoded)
      ? decoded
      : decoded.replace(/\b\p{Ll}/gu, (character) => character.toLocaleUpperCase());
  }

  private decode(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  private normalize(value: string): string {
    const routerPath = ((value || '/').split(/[?#]/, 1)[0] || '/');
    const path = routerPath !== '/'
      ? routerPath
      : this.document.defaultView?.location.pathname ?? '/';
    const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
    return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : withLeadingSlash;
  }
}
