import { DOCUMENT } from '@angular/common';
import { Injectable, REQUEST, RESPONSE_INIT, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PUBLIC_BASE_URL } from '../tokens/app-urls';
import { LanguageService } from './language.service';

export type SeoSchemaType =
  | 'WebPage'
  | 'TouristTrip'
  | 'TouristDestination'
  | 'Place'
  | 'City'
  | 'BlogPosting';

export interface SeoPageOptions {
  imageUrl?: string;
  image?: unknown;
  fallbackTitle?: string;
  fallbackDescription?: string;
  schemaType?: SeoSchemaType;
}

interface LocalizedSeoPage {
  title?: string | null;
  description?: string | null;
  imageUrl?: string;
  imageAlt?: string;
  schemaType: SeoSchemaType;
  entity?: Record<string, unknown>;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

const SITE_NAME = 'Sea World Holidays';
const DEFAULT_DESCRIPTION =
  'Discover curated tours, travel packages, cities and destinations with Sea World Holidays.';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly request = inject(REQUEST, { optional: true });
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });
  private readonly publicBaseUrl = inject(PUBLIC_BASE_URL);
  private lastPage: LocalizedSeoPage | null = null;

  constructor() {
    this.setSiteStructuredData();
    this.applyRouteDefaults(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.applyRouteDefaults(event.urlAfterRedirects));

    effect(() => {
      const currentLanguage = this.language.currentLanguage();
      if (this.lastPage) this.applyLocalizedPageSeo(this.lastPage, currentLanguage);
    });
  }

  /** Uses only the entity's existing title/name and description/summary/content fields. */
  updateFrom(entity: any, options: SeoPageOptions = {}): void {
    const headerData = entity?.headerData ;
    const headerDescription = Array.isArray(headerData)
      ? headerData
          .slice()
          .map((item: any) => item?.description ?? '')
          .filter((value: unknown) => typeof value === 'string' && value.trim())
          .join(' ')
      : '';
    const image =
      options.image ??
      entity?.coverImage ??
      entity?.coverImageUrl ??
      entity?.imageUrl ??
      entity?.images?.[0] ?? entity?.Images?.[0];

    const page: LocalizedSeoPage = {
      title:
        entity?.title ,
        description: 
        entity?.description??
        entity?.summary??
        entity?.fullDescription ?? headerDescription,

      imageUrl: this.absoluteUrl(options.imageUrl),
      imageAlt: this.imageAlt(image),
      schemaType: options.schemaType ?? 'WebPage',
      entity,
    };

    this.lastPage = page;
    this.applyLocalizedPageSeo(page, this.languageFromUrl());
  }

  markNotFound(message = 'Page not found'): void {
    this.lastPage = null;
    if (this.responseInit) this.responseInit.status = 404;
    this.applyDocumentLanguage(this.languageFromUrl());
    this.titleService.setTitle(`${message} | ${SITE_NAME}`);
    this.updateName('robots', 'noindex, nofollow');
    this.updateName('googlebot', 'noindex, nofollow');
    this.updateOrRemoveName('description', '');
    this.updateOrRemoveProperty('og:title', '');
    this.updateOrRemoveProperty('og:description', '');
    this.updateOrRemoveProperty('og:image', '');
    this.updateOrRemoveName('twitter:title', '');
    this.updateOrRemoveName('twitter:description', '');
    this.updateOrRemoveName('twitter:image', '');
    this.setCanonical(this.canonicalUrl());
    this.removePageStructuredData();
  }

  imageAlt(image: any, fallback = ''): string {
    const english = image?.altEng ?? image?.AltEng;
    const arabic = image?.altAr ?? image?.AltAr;
    return this.languageFromUrl() === 'ar'
      ? arabic || english || image?.imageName || image?.ImageName || fallback
      : english || arabic || image?.imageName || image?.ImageName || fallback;
  }

  private applyLocalizedPageSeo(page: LocalizedSeoPage, language: 'en' | 'ar'): void {
    const title = this.localized(page.title, page.title, '', language);
    const description = this.localized(page.description , page.description, '', language);
    this.applyDocumentLanguage(language);
    this.setPage(title, description, page.imageUrl, page.imageAlt, page.schemaType, page.entity);
  }

  private setPage(
    title: string,
    description: string,
    imageUrl: string | undefined,
    imageAlt: string | undefined,
    schemaType: SeoSchemaType,
    entity?: Record<string, unknown>,
  ): void {
    const resolvedTitle = title.trim();
    const resolvedDescription = this.cleanDescription(description);
    const canonicalUrl = this.canonicalUrl();
    const language = this.languageFromUrl();

    this.titleService.setTitle(this.brandedTitle(resolvedTitle));
    this.updateOrRemoveName('description', resolvedDescription);
    this.updateName('robots', 'index, follow, max-image-preview:large');
    this.updateName('googlebot', 'index, follow, max-image-preview:large');
    this.updateProperty('og:site_name', SITE_NAME);
    this.updateOrRemoveProperty('og:title', resolvedTitle);
    this.updateOrRemoveProperty('og:description', resolvedDescription);
    this.updateProperty('og:type', schemaType === 'BlogPosting' ? 'article' : 'website');
    this.updateProperty('og:locale', language === 'ar' ? 'ar_EG' : 'en_US');
    this.updateProperty('og:url', canonicalUrl);
    this.updateName('twitter:card', imageUrl ? 'summary_large_image' : 'summary');
    this.updateOrRemoveName('twitter:title', resolvedTitle);
    this.updateOrRemoveName('twitter:description', resolvedDescription);
    this.setCanonical(canonicalUrl);
    this.setLanguageAlternates();

    if (imageUrl) {
      this.updateProperty('og:image', imageUrl);
      this.updateName('twitter:image', imageUrl);
      this.updateOrRemoveProperty('og:image:alt', imageAlt ?? '');
      this.updateOrRemoveName('twitter:image:alt', imageAlt ?? '');
    } else {
      this.updateOrRemoveProperty('og:image', '');
      this.updateOrRemoveName('twitter:image', '');
      this.updateOrRemoveProperty('og:image:alt', '');
      this.updateOrRemoveName('twitter:image:alt', '');
    }

    this.setPageStructuredData(resolvedTitle, resolvedDescription, imageUrl, schemaType, entity);
  }

  private applyRouteDefaults(url: string): void {
    this.lastPage = null;
    const path = this.normalizePath(url);
    const segments = path.split('/').filter(Boolean);
    const language = segments[0] === 'ar' ? 'ar' : 'en';
    const section = segments[0] === 'ar' || segments[0] === 'en' ? segments[1] : segments[0];
    const privateSections = new Set([
      'configurations', 'account', 'login', 'signup', 'signup-success', 'forgot-password',
      'reset-password', 'user-setting', 'user-profile', 'user-booking', 'user-payment',
      'user-invoice', 'user-social', 'user-notification',
    ]);

    this.applyDocumentLanguage(language);
    if (privateSections.has(section ?? '')) {
      this.titleService.setTitle(SITE_NAME);
      this.updateName('robots', 'noindex, nofollow');
      this.updateName('googlebot', 'noindex, nofollow');
      this.removePageStructuredData();
      return;
    }

    const titles: Record<string, [string, string]> = {
      home: ['Sea World Holidays | Tours, Packages & Destinations', 'سي وورلد هوليدايز | جولات وباقات ووجهات'],
      destinations: ['Travel Destinations | Sea World Holidays', 'وجهات السفر | سي وورلد هوليدايز'],
      cities: ['Travel Cities | Sea World Holidays', 'مدن سياحية | سي وورلد هوليدايز'],
      tours: ['Tours & Excursions | Sea World Holidays', 'الجولات والرحلات | سي وورلد هوليدايز'],
      'nile-cruises': ['Nile Cruises | Sea World Holidays', 'رحلات النيل | سي وورلد هوليدايز'],
      packages: ['Travel Packages | Sea World Holidays', 'باقات السفر | سي وورلد هوليدايز'],
      blogs: ['Travel Blog | Sea World Holidays', 'مدونة السفر | سي وورلد هوليدايز'],
    };
    const pageTitle = titles[section ?? 'home'] ?? titles['home'];
    this.setPage(
      language === 'ar' ? pageTitle[1] : pageTitle[0],
      DEFAULT_DESCRIPTION,
      undefined,
      undefined,
      'WebPage',
    );
  }

  private setPageStructuredData(
    title: string,
    description: string,
    imageUrl: string | undefined,
    type: SeoSchemaType,
    entity?: Record<string, unknown>,
  ): void {
    const canonicalUrl = this.canonicalUrl();
    const language = this.languageFromUrl();
    const page: Record<string, unknown> = {
      '@type': type,
      '@id': `${canonicalUrl}#page`,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: language,
      isPartOf: { '@id': `${this.publicBaseUrl}/#website` },
    };
    if (imageUrl) page['image'] = imageUrl;

    if (type === 'BlogPosting') {
      page['headline'] = title;
      page['mainEntityOfPage'] = { '@id': `${canonicalUrl}#page` };
      page['publisher'] = { '@id': `${this.publicBaseUrl}/#organization` };
      const published = this.dateValue(entity, 'publishedAt', 'PublishedAt');
      const modified = this.dateValue(entity, 'modifiedAt', 'ModifiedAt', 'updatedAt', 'UpdatedAt');
      if (published) page['datePublished'] = published;
      if (modified) page['dateModified'] = modified;
    }

    const graph: Record<string, unknown>[] = [page];
    const breadcrumbs = this.breadcrumbs(title);
    if (breadcrumbs.length > 1) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: this.absolutePath(item.path),
        })),
      });
    }

    this.setJsonLd('page-structured-data', {
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }

  private setSiteStructuredData(): void {
    this.setJsonLd('site-structured-data', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TravelAgency',
          '@id': `${this.publicBaseUrl}/#organization`,
          name: SITE_NAME,
          url: this.publicBaseUrl,
          logo: { '@type': 'ImageObject', url: this.absolutePath('/assets/images/main-logo.png') },
        },
        {
          '@type': 'WebSite',
          '@id': `${this.publicBaseUrl}/#website`,
          name: SITE_NAME,
          url: this.publicBaseUrl,
          publisher: { '@id': `${this.publicBaseUrl}/#organization` },
          inLanguage: ['en', 'ar'],
        },
      ],
    });
  }

  private breadcrumbs(currentTitle: string): BreadcrumbItem[] {
    const language = this.languageFromUrl();
    const path = this.currentPath();
    const segments = path.split('/').filter(Boolean);
    const sectionIndex = segments[0] === 'en' || segments[0] === 'ar' ? 1 : 0;
    const section = segments[sectionIndex] ?? 'home';
    const localizedRoot = `/${language}`;
    const labels: Record<string, [string, string]> = {
      destinations: ['Destinations', 'الوجهات'],
      cities: ['Destinations', 'الوجهات'],
      tours: ['Tours', 'الجولات'],
      'nile-cruises': ['Nile Cruises', 'رحلات النيل'],
      packages: ['Packages', 'الباقات'],
      blogs: ['Blog', 'المدونة'],
    };
    const items: BreadcrumbItem[] = [
      { name: language === 'ar' ? 'الرئيسية' : 'Home', path: `${localizedRoot}/home` },
    ];
    const label = labels[section];
    if (label) {
      const sectionPath = section === 'cities' ? 'destinations' : section;
      items.push({ name: language === 'ar' ? label[1] : label[0], path: `${localizedRoot}/${sectionPath}` });
    }
    if (segments.length > sectionIndex + 1 && currentTitle) items.push({ name: currentTitle, path });
    return items;
  }

  private setCanonical(url: string): void {
    const canonicalLinks = Array.from(
      this.document.head.querySelectorAll('link[rel="canonical"]'),
    ) as HTMLLinkElement[];
    let link = canonicalLinks.shift() ?? null;
    canonicalLinks.forEach((duplicate) => duplicate.remove());
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private setLanguageAlternates(): void {
    const segments = this.currentPath().split('/').filter(Boolean);
    this.document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    if (segments[0] !== 'en' && segments[0] !== 'ar') return;
    for (const language of ['en', 'ar', 'x-default'] as const) {
      const alternateSegments = [...segments];
      alternateSegments[0] = language === 'x-default' ? 'en' : language;
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = language;
      link.href = this.absolutePath(`/${alternateSegments.join('/')}`);
      this.document.head.appendChild(link);
    }
  }

  private setJsonLd(id: string, value: Record<string, unknown>): void {
    let script = this.document.head.querySelector(`#${id}`) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(value).replace(/</g, '\\u003c');
  }

  private removePageStructuredData(): void {
    this.document.head.querySelector('#page-structured-data')?.remove();
  }

  private currentPath(): string {
    const routerPath = this.normalizePath(this.router.url);
    if (routerPath !== '/') return routerPath;
    if (this.request) return this.normalizePath(new URL(this.request.url).pathname);
    return this.normalizePath(this.document.defaultView?.location.pathname ?? '/');
  }

  private canonicalUrl(): string {
    return this.absolutePath(this.currentPath());
  }

  private absolutePath(path: string): string {
    const normalized = this.normalizePath(path);
    return `${this.publicBaseUrl}${normalized === '/' ? '' : normalized}`;
  }

  private absoluteUrl(value?: string): string | undefined {
    if (!value) return undefined;
    if (/^https?:\/\//i.test(value)) return value;
    return this.absolutePath(value);
  }

  private normalizePath(value: string): string {
    const path = (value || '/').split(/[?#]/, 1)[0] || '/';
    const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
    return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : withLeadingSlash;
  }

  private localized(english: unknown, arabic: unknown, fallback: unknown, language = this.languageFromUrl()): string {
    const value = language === 'ar' ? arabic || english || fallback : english || arabic || fallback;
    return typeof value === 'string' ? value : '';
  }

  private cleanDescription(value: string): string {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);
  }

  private brandedTitle(value: string): string {
    const title = value.trim();
    if (!title) return SITE_NAME;
    return title.toLocaleLowerCase().includes(SITE_NAME.toLocaleLowerCase())
      ? title
      : `${title} | ${SITE_NAME}`;
  }

  private dateValue(entity: Record<string, unknown> | undefined, ...keys: string[]): string | null {
    for (const key of keys) {
      const value = entity?.[key];
      if (typeof value !== 'string' && !(value instanceof Date)) continue;
      const date = new Date(value);
      if (!Number.isNaN(date.valueOf())) return date.toISOString();
    }
    return null;
  }

  private updateName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name="${name}"`);
  }

  private updateProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private updateOrRemoveName(name: string, content: string): void {
    if (content) this.updateName(name, content);
    else this.meta.removeTag(`name="${name}"`);
  }

  private updateOrRemoveProperty(property: string, content: string): void {
    if (content) this.updateProperty(property, content);
    else this.meta.removeTag(`property="${property}"`);
  }

  private languageFromUrl(): 'en' | 'ar' {
    const segment = this.currentPath().split('/').filter(Boolean)[0]?.toLowerCase();
    return segment === 'ar' ? 'ar' : segment === 'en' ? 'en' : this.language.currentLanguage();
  }

  private applyDocumentLanguage(language: 'en' | 'ar'): void {
    const root = this.document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    this.document.body?.setAttribute('dir', root.dir);
  }
}
