import { DOCUMENT } from '@angular/common';
import { REQUEST, RESPONSE_INIT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { INDEXING_ENABLED, PUBLIC_BASE_URL } from '../tokens/app-urls';
import { BreadcrumbService } from './breadcrumb.service';
import { LanguageService } from './language.service';
import { SeoSchemaType, SeoService } from './seo.service';

const origin = 'https://seaworld-prod.premiumasp.net';
const cases: [string, SeoSchemaType][] = [
  ['destinations/egypt-tours', 'TouristDestination'],
  ['destinations/egypt-tours/cities/cairo', 'City'],
  ['tours/cairo-day-tour', 'TouristTrip'],
  ['packages/egypt-week', 'TouristTrip'],
  ['hotels/cairo-hotel', 'Hotel'],
  ['blogs/cairo-guide', 'BlogPosting'],
];

function setup(language: 'ar' | 'en' = 'ar', path = cases[1][0], staging = false) {
  const doc = document.implementation.createHTMLDocument('');
  const events = new Subject<unknown>();
  const router = { url: `/${language}/${path}`, events };
  const response: ResponseInit = {};
  TestBed.configureTestingModule({ providers: [
    { provide: DOCUMENT, useValue: doc },
    { provide: Router, useValue: router },
    { provide: LanguageService, useValue: { currentLanguage: signal(language) } },
    { provide: PUBLIC_BASE_URL, useValue: origin },
    { provide: INDEXING_ENABLED, useValue: !staging },
    { provide: REQUEST, useValue: new Request(`${staging ? 'https://seaworld-stage.premiumasp.net' : origin}${router.url}`) },
    { provide: RESPONSE_INIT, useValue: response },
  ] });
  return { doc, router, events, response, seo: TestBed.inject(SeoService), crumbs: TestBed.inject(BreadcrumbService) };
}

const entity = {
  nameEng: 'Cairo', nameAr: 'القاهرة',
  seoTitleEng: 'Explore Cairo tours', seoTitleAr: 'اكتشف جولات القاهرة',
  seoDescriptionEng: 'Plan your Cairo visit with our local tours.',
  seoDescriptionAr: 'خطط لزيارة القاهرة واكتشف الجولات المحلية المتاحة.',
  descriptionEng: 'Display description', descriptionAr: 'وصف الصفحة',
};

describe('shared entity SEO', () => {
  afterEach(() => TestBed.resetTestingModule());

  for (const language of ['ar', 'en'] as const) {
    for (const [path, type] of cases) {
      it(`uses the ${language} database fields for ${path}`, () => {
        const { seo, doc, crumbs } = setup(language, path);
        seo.updateFrom(entity, { schemaType: type, imageUrl: 'https://images.example/cairo.jpg' });
        const title = language === 'ar' ? entity.seoTitleAr : entity.seoTitleEng;
        const description = language === 'ar' ? entity.seoDescriptionAr : entity.seoDescriptionEng;
        expect(doc.title).toBe(`${title} | Sea World Holidays`);
        expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(description);
        expect(doc.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(title);
        expect(doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe(description);
        expect(doc.documentElement.lang).toBe(language);
        expect(doc.documentElement.dir).toBe(language === 'ar' ? 'rtl' : 'ltr');
        expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${origin}/${language}/${path}`);
        for (const alternate of ['ar', 'en']) {
          expect(doc.querySelector(`link[hreflang="${alternate}"]`)?.getAttribute('href')).toBe(`${origin}/${alternate}/${path}`);
        }
        const graph = JSON.parse(doc.querySelector('#page-structured-data')!.textContent!)['@graph'];
        expect(graph.find((item: any) => item['@type'] === type).name).toBe(language === 'ar' ? entity.nameAr : entity.nameEng);
        expect(graph.find((item: any) => item['@type'] === 'WebPage').name).toBe(title);
        expect(crumbs.items().at(-1)?.name).toBe(language === 'ar' ? entity.nameAr : entity.nameEng);
        expect(graph.find((item: any) => item['@type'] === 'BreadcrumbList')).toBeTruthy();
      });
    }
  }

  it('keeps entity metadata and parent labels published before NavigationEnd', () => {
    const { seo, doc, router, events, crumbs } = setup();
    events.next(new NavigationStart(1, router.url));
    crumbs.setCurrentParent({ name: 'مصر', path: '/ar/destinations/egypt-tours' });
    seo.updateFrom(entity, { schemaType: 'City' });
    events.next(new NavigationEnd(1, router.url, router.url));
    expect(doc.title).toContain(entity.seoTitleAr);
    expect(crumbs.items()[2].name).toBe('مصر');
    expect(doc.querySelector('#page-structured-data')?.textContent).toContain('مصر');
  });

  it('falls back to this entity content, cleans HTML and does not reuse the previous page', () => {
    const { seo, doc, router, events } = setup();
    seo.updateFrom(entity, { schemaType: 'City' });
    router.url = '/ar/hotels/new-hotel?tracking=1';
    events.next(new NavigationStart(2, router.url));
    seo.updateFrom({ nameAr: 'فندق جديد', seoTitleAr: ' ', descriptionAr: '<p>إقامة &amp; راحة</p>' }, { schemaType: 'Hotel' });
    events.next(new NavigationEnd(2, router.url, router.url));
    expect(doc.title).toBe('فندق جديد | Sea World Holidays');
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('إقامة & راحة');
    expect(doc.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${origin}/ar/hotels/new-hotel`);
    expect(doc.querySelector('#page-structured-data')?.textContent).not.toContain('"addressCountry":"EG"');
  });

  it('keeps staging noindex after data loads and uses production canonical links', () => {
    const { seo, doc } = setup('ar', cases[1][0], true);
    seo.updateFrom(entity, { schemaType: 'City' });
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow');
    expect(doc.querySelector('meta[name="googlebot"]')?.getAttribute('content')).toBe('noindex, nofollow');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain(origin);
  });

  it('keeps an SSR 404 through NavigationEnd and distinguishes upstream failure as 503', () => {
    const { seo, doc, events, router, response } = setup();
    events.next(new NavigationStart(1, router.url));
    seo.markNotFound('المدينة غير موجودة');
    events.next(new NavigationEnd(1, router.url, router.url));
    expect(response.status).toBe(404);
    expect(doc.title).toContain('المدينة غير موجودة');
    expect(doc.querySelector('#page-structured-data')).toBeNull();
    seo.markUnavailable();
    expect(response.status).toBe(503);
    expect(new Headers(response.headers).get('Retry-After')).toBe('300');
  });
});
