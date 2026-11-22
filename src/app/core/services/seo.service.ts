import { DOCUMENT } from '@angular/common';
import { Injectable, REQUEST, RESPONSE_INIT, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { COMPANY_PROFILE } from '../data/company-profile';
import { INDEXING_ENABLED, PUBLIC_BASE_URL } from '../tokens/app-urls';
import { BreadcrumbService, breadcrumbSegmentLabel } from './breadcrumb.service';
import { LanguageService } from './language.service';
import { resolveEntitySeo } from './entity-seo';
import { mayIndexRequest } from './indexing-policy';

export type SeoSchemaType =
  | 'WebPage'
  | 'Tour'
  | 'Destination'
  | 'City'
  | 'Package'
  | 'Hotel'
  | 'HotelRoom'
  | 'Blog';

export interface SeoPageOptions {
  imageUrl?: string;
  image?: unknown;
  fallbackTitle?: string;
  fallbackDescription?: string;
  schemaType?: SeoSchemaType;
}

interface LocalizedSeoPage {
  name: Record<'en' | 'ar', string>;
  title: Record<'en' | 'ar', string>;
  hasMetaTitle: Record<'en' | 'ar', boolean>;
  description: Record<'en' | 'ar', string>;
  imageUrl?: string;
  imageAlt?: string;
  schemaType: SeoSchemaType;
  entity?: Record<string, unknown>;
}

const SITE_NAME = COMPANY_PROFILE.name;
type LocalizedText = Record<'en' | 'ar', string>;
interface StaticSeoPage {
  name: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
}

const STATIC_SEO: Record<string, StaticSeoPage> = {
  home: {
    name: { en: 'Home', ar: 'الرئيسية' },
    title: {
      en: 'Sea World Holidays | Tours, Packages & Destinations',
      ar: 'سي وورلد هوليدايز | جولات وباقات ووجهات',
    },
    description: {
      en: 'Discover curated tours, travel packages, cities and destinations with Sea World Holidays. Plan your next journey with local travel experts.',
      ar: 'اكتشف الجولات والباقات السياحية والمدن والوجهات المختارة مع سي وورلد هوليدايز وخطط رحلتك القادمة مع خبراء السفر.',
    },
  },
  destinations: {
    name: { en: 'Destinations', ar: 'الوجهات' },
    title: { en: 'Travel Destinations | Sea World Holidays', ar: 'وجهات السفر | سي وورلد هوليدايز' },
    description: {
      en: 'Explore inspiring travel destinations and discover the places where your next Sea World Holidays journey can begin.',
      ar: 'استكشف وجهات سفر ملهمة واكتشف الأماكن التي تبدأ منها رحلتك القادمة مع سي وورلد هوليدايز.',
    },
  },
  cities: {
    name: { en: 'Cities', ar: 'المدن' },
    title: { en: 'Travel Cities | Sea World Holidays', ar: 'المدن السياحية | سي وورلد هوليدايز' },
    description: {
      en: 'Browse travel cities, local highlights and memorable experiences with Sea World Holidays.',
      ar: 'تصفح المدن السياحية ومعالمها وتجاربها المميزة مع سي وورلد هوليدايز.',
    },
  },
  tours: {
    name: { en: 'Tours', ar: 'الجولات' },
    title: { en: 'Tours & Excursions | Sea World Holidays', ar: 'الجولات والرحلات | سي وورلد هوليدايز' },
    description: {
      en: 'Find memorable tours and excursions, from cultural discoveries to relaxing adventures with Sea World Holidays.',
      ar: 'اعثر على جولات ورحلات مميزة، من الاكتشافات الثقافية إلى المغامرات الممتعة مع سي وورلد هوليدايز.',
    },
  },
  'nile-cruises': {
    name: { en: 'Nile Cruises', ar: 'الرحلات النيلية' },
    title: { en: 'Nile Cruises | Sea World Holidays', ar: 'رحلات النيل | سي وورلد هوليدايز' },
    description: {
      en: 'Experience the Nile with carefully planned cruises, sightseeing and comfortable travel arrangements.',
      ar: 'استمتع برحلة نيلية تجمع بين المعالم السياحية والترتيبات المريحة والتخطيط المتقن.',
    },
  },
  packages: {
    name: { en: 'Packages', ar: 'الباقات' },
    title: { en: 'Travel Packages | Sea World Holidays', ar: 'باقات السفر | سي وورلد هوليدايز' },
    description: {
      en: 'Discover thoughtfully planned travel packages with destinations, stays and experiences arranged around you.',
      ar: 'اكتشف باقات سفر مخططة بعناية تجمع بين الوجهات والإقامة والتجارب المصممة حول احتياجاتك.',
    },
  },
  hotels: {
    name: { en: 'Hotels', ar: 'الفنادق' },
    title: { en: 'Hotels & Rooms | Sea World Holidays', ar: 'الفنادق والغرف | سي وورلد هوليدايز' },
    description: {
      en: 'Search trusted hotels and comfortable rooms, compare stays and check availability for your trip.',
      ar: 'ابحث عن فنادق موثوقة وغرف مريحة وقارن أماكن الإقامة وتحقق من التوفر لرحلتك.',
    },
  },
  blogs: {
    name: { en: 'Travel Blog', ar: 'مدونة السفر' },
    title: { en: 'Travel Blog | Sea World Holidays', ar: 'مدونة السفر | سي وورلد هوليدايز' },
    description: {
      en: 'Read travel guides, destination ideas and useful stories from Sea World Holidays.',
      ar: 'اقرأ أدلة السفر وأفكار الوجهات والقصص المفيدة من سي وورلد هوليدايز.',
    },
  },
  aboutus: {
    name: { en: 'About Us', ar: 'من نحن' },
    title: { en: 'About Us | Sea World Holidays', ar: 'من نحن | سي وورلد هوليدايز' },
    description: {
      en: 'Learn about Sea World Holidays, our travel expertise and the care we put into every journey.',
      ar: 'تعرّف على سي وورلد هوليدايز وخبرتنا في السفر والاهتمام الذي نقدمه في كل رحلة.',
    },
  },
  helpcenter: {
    name: { en: 'Help Center', ar: 'مركز المساعدة' },
    title: { en: 'Help Center | Sea World Holidays', ar: 'مركز المساعدة | سي وورلد هوليدايز' },
    description: {
      en: 'Find answers and helpful information for planning and managing your Sea World Holidays trip.',
      ar: 'اعثر على إجابات ومعلومات مفيدة لتخطيط رحلتك وإدارتها مع سي وورلد هوليدايز.',
    },
  },
  'helpcenter-faqs': {
    name: { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
    title: { en: 'Frequently Asked Questions | Sea World Holidays', ar: 'الأسئلة الشائعة | سي وورلد هوليدايز' },
    description: {
      en: 'Get quick answers to common questions about Sea World Holidays services and bookings.',
      ar: 'احصل على إجابات سريعة عن الأسئلة الشائعة حول خدمات وحجوزات سي وورلد هوليدايز.',
    },
  },
  'helpcenter-guides': {
    name: { en: 'Travel Guides', ar: 'أدلة السفر' },
    title: { en: 'Travel Guides | Sea World Holidays', ar: 'أدلة السفر | سي وورلد هوليدايز' },
    description: {
      en: 'Use practical travel guides and tips to prepare for a smoother Sea World Holidays experience.',
      ar: 'استخدم أدلة ونصائح السفر العملية للاستعداد لتجربة أسهل مع سي وورلد هوليدايز.',
    },
  },
  'helpcenter-support': {
    name: { en: 'Travel Support', ar: 'دعم السفر' },
    title: { en: 'Travel Support | Sea World Holidays', ar: 'دعم السفر | سي وورلد هوليدايز' },
    description: {
      en: 'Get travel support from the Sea World Holidays team before, during and after your journey.',
      ar: 'احصل على دعم السفر من فريق سي وورلد هوليدايز قبل رحلتك وأثناءها وبعدها.',
    },
  },
  terms: {
    name: { en: 'Terms and Conditions', ar: 'الشروط والأحكام' },
    title: { en: 'Terms and Conditions | Sea World Holidays', ar: 'الشروط والأحكام | سي وورلد هوليدايز' },
    description: {
      en: 'Review the terms and conditions that apply to Sea World Holidays services and bookings.',
      ar: 'راجع الشروط والأحكام المطبقة على خدمات وحجوزات سي وورلد هوليدايز.',
    },
  },
  privacy: {
    name: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    title: { en: 'Privacy Policy | Sea World Holidays', ar: 'سياسة الخصوصية | سي وورلد هوليدايز' },
    description: {
      en: 'Learn how Sea World Holidays handles personal information and protects your privacy.',
      ar: 'تعرّف على كيفية تعامل سي وورلد هوليدايز مع معلوماتك الشخصية وحماية خصوصيتك.',
    },
  },
  contact: {
    name: { en: 'Contact Us', ar: 'اتصل بنا' },
    title: { en: 'Contact Us | Sea World Holidays', ar: 'اتصل بنا | سي وورلد هوليدايز' },
    description: {
      en: 'Contact Sea World Holidays for travel advice, booking help and personalized trip planning.',
      ar: 'تواصل مع سي وورلد هوليدايز للحصول على نصائح السفر ومساعدة الحجز وتخطيط رحلة مخصصة.',
    },
  },
  'not-found': {
    name: { en: 'Page Not Found', ar: 'الصفحة غير موجودة' },
    title: { en: 'Page Not Found | Sea World Holidays', ar: 'الصفحة غير موجودة | سي وورلد هوليدايز' },
    description: {
      en: 'The page you requested could not be found. Continue exploring Sea World Holidays.',
      ar: 'تعذر العثور على الصفحة المطلوبة. تابع استكشاف سي وورلد هوليدايز.',
    },
  },
};

const ACCOUNT_SECTIONS = new Set([
  'user-setting', 'user-profile', 'user-booking', 'user-payment', 'user-invoice',
  'user-social', 'user-notification',
]);

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly router = inject(Router);
  private readonly request = inject(REQUEST, { optional: true });
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });
  private readonly publicBaseUrl = inject(PUBLIC_BASE_URL);
  private readonly indexingEnabled = inject(INDEXING_ENABLED);
  private lastPage: LocalizedSeoPage | null = null;
  private pendingPath: string | null = null;
  private lastPagePath: string | null = null;
  private failurePath: string | null = null;
  private siteStructuredDataLanguage: 'en' | 'ar' | null = null;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.pendingPath = this.normalizePath(event.url);
        this.applyRouteDefaults(event.url);
      } else if (event instanceof NavigationEnd) {
        const path = this.normalizePath(event.urlAfterRedirects);
        this.pendingPath = path;
        if (this.lastPagePath !== path && this.failurePath !== path) this.applyRouteDefaults(path);
        this.pendingPath = null;
      }
    });

    effect(() => {
      this.language.currentLanguage();
      if (this.lastPage)
        this.applyLocalizedPageSeo(this.lastPage, this.languageFromUrl());
    });
  }

  /** Builds language-specific SEO from both bilingual source fields and localized API fields. */
  updateFrom(entity: any, options: SeoPageOptions = {}): void {
    const schemaType = options.schemaType ?? 'WebPage';
    const english = resolveEntitySeo(entity, 'en', schemaType, options.fallbackTitle, options.fallbackDescription);
    const arabic = resolveEntitySeo(entity, 'ar', schemaType, options.fallbackTitle, options.fallbackDescription);
    const image =
      options.image ??
      entity?.coverImage ??
      entity?.coverImageUrl ??
      entity?.imageUrl ??
      entity?.images?.[0] ?? entity?.Images?.[0];
    const page: LocalizedSeoPage = {
      name: { en: english.name, ar: arabic.name },
      title: { en: english.title, ar: arabic.title },
      hasMetaTitle: { en: english.hasMetaTitle, ar: arabic.hasMetaTitle },
      description: { en: english.description, ar: arabic.description },
      imageUrl: this.absoluteUrl(options.imageUrl ?? this.imageUrl(image)),
      imageAlt: this.imageAlt(image),
      schemaType,
      entity,
    };

    this.lastPage = page;
    this.failurePath = null;
    this.lastPagePath = this.currentPath();
    this.applyLocalizedPageSeo(page, this.languageFromUrl());
  }



  markUnavailable(): void {
    this.markFailure(this.languageFromUrl() === 'ar' ? 'المحتوى غير متاح مؤقتًا' : 'Content temporarily unavailable', 503);
  }

  markNotFound(message?: string): void {
     
    this.markFailure(
      message || (this.languageFromUrl() === 'ar' ? 'المحتوى غير موجود' : 'Content not found'),
      404,
    );
  }

  private markFailure(message: string, status: number): void {
    this.lastPage = null;
    this.failurePath = this.currentPath();
    if (this.responseInit) {
      this.responseInit.status = status;
      if (status === 503) {
        const headers = new Headers(this.responseInit.headers);
        headers.set('Retry-After', '300');
        this.responseInit.headers = headers;
      }
    }
    this.applyDocumentLanguage(this.languageFromUrl());
    this.titleService.setTitle(`${message} | ${SITE_NAME}`);
    this.updateName('robots', 'noindex, nofollow');
    this.updateOrRemoveName('description', '');
    this.updateOrRemoveProperty('og:title', '');
    this.updateOrRemoveProperty('og:description', '');
    this.updateOrRemoveProperty('og:image', 'https://seaworldholidays.com/assets/images/main-logo.png');
    this.updateOrRemoveName('twitter:title', '');
    this.updateOrRemoveName('twitter:description', '');
    this.updateOrRemoveName('twitter:image', 'https://seaworldholidays.com/assets/images/main-logo.png');
    this.setCanonical(this.canonicalUrl());
    this.removePageStructuredData();
  }

  imageAlt(image: any, fallback = ''): string {
    const english = image?.altEng ;
    const arabic = image?.altAr ;
    return this.languageFromUrl() === 'ar'
      ? arabic || english || image?.imageName || image?.ImageName || fallback
      : english || arabic || image?.imageName || image?.ImageName || fallback;
  }

  private imageUrl(image: any): string | undefined {
    if (typeof image === 'string') return image;
    return image?.imageUrl ?? image?.ImageUrl ?? image?.url ?? image?.Url;
  }

  private applyLocalizedPageSeo(page: LocalizedSeoPage, language: 'en' | 'ar'): void {
    const alternative = language === 'ar' ? 'en' : 'ar';
    const title = page.title[language] || page.title[alternative];
     
    const hasMetaTitle = page.title[language]
      ? page.hasMetaTitle[language]
      : page.hasMetaTitle[alternative];
    const description = page.description[language] || page.description[alternative];

    this.applyDocumentLanguage(language);
    // SEO headlines may be longer than the entity name shown in navigation and structured data.
    const name = page.name[language] || page.name[alternative];
    this.breadcrumbService.setCurrentTitle(name);
    this.setPage(
      title,
      description,
      page.imageUrl,
      page.imageAlt,
      page.schemaType,
      page.entity,
      name,
      hasMetaTitle,
    );
  }

  private setPage(
    title: string,
    description: string,
    imageUrl: string | undefined,
    imageAlt: string | undefined,
    schemaType: SeoSchemaType,
    entity?: Record<string, unknown>,
    entityName?: string,
    useExactTitle = false,
  ): void {
    const resolvedTitle = this.plainText(title);
    const resolvedDescription = this.cleanDescription(description);
    const metaDescription = schemaType === 'Package'
      ? resolvedDescription.slice(0, 150)
      : resolvedDescription;
    const canonicalUrl = this.canonicalUrl();
    const language = this.languageFromUrl();
    this.titleService.setTitle(useExactTitle ? resolvedTitle : this.brandedTitle(resolvedTitle));
    this.updateOrRemoveName('description', metaDescription);
    const requestUrl = this.request?.url ?? this.document.defaultView?.location.href;
    const robots = mayIndexRequest(this.indexingEnabled, this.publicBaseUrl, requestUrl)
      ? 'index, follow' : 'noindex, nofollow';
    this.updateName('robots', robots);
    this.updateProperty('og:site_name', SITE_NAME);
    this.updateOrRemoveProperty('og:title', resolvedTitle);
    this.updateOrRemoveProperty('og:description', resolvedDescription);
    this.updateProperty('og:type', schemaType === 'Blog' ? 'article' : 'website');
    this.updateProperty('og:locale', language === 'ar' ? 'ar_EG' : 'en_US');
    this.updateProperty('og:locale:alternate', language === 'ar' ? 'en_US' : 'ar_EG');
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
      this.updateOrRemoveProperty('og:image', 'https://seaworldholidays.com/assets/images/main-logo.png');
      this.updateOrRemoveName('twitter:image', 'https://seaworldholidays.com/assets/images/main-logo.png');
      this.updateOrRemoveProperty('og:image:alt', 'Sea World Holidays logo');
      this.updateOrRemoveName('twitter:image:alt', 'Sea World Holidays logo');
    }

    this.setPageStructuredData(resolvedTitle, resolvedDescription, imageUrl, schemaType, entity, entityName);
  }

  private applyRouteDefaults(url: string): void {
    const path = this.normalizePath(url);
    const segments = path.split('/').filter(Boolean);
    const language = segments[0] === 'ar' ? 'ar' : 'en';
    const section = segments[0] === 'ar' || segments[0] === 'en' ? segments[1] : segments[0];
    this.failurePath = null;
    const excludedSections = new Set([
      'configurations', 'account', 'login', 'signup', 'signup-success', 'forgot-password',
      'reset-password',
    ]);

    this.applyDocumentLanguage(language);
    if (excludedSections.has(section ?? '')) {
      this.lastPage = null;
      this.lastPagePath = path;
      this.titleService.setTitle(SITE_NAME);
      this.updateName('robots', 'noindex, nofollow');
      this.removePageStructuredData();
      return;
    }

    const accountName = ACCOUNT_SECTIONS.has(section ?? '') ? {
      en: breadcrumbSegmentLabel(section!, 'en') ?? SITE_NAME,
      ar: breadcrumbSegmentLabel(section!, 'ar') ?? SITE_NAME,
    } : null;
    const page = STATIC_SEO[section ?? ''] ?? (accountName ? {
      name: accountName,
      title: { en: `${accountName.en} | ${SITE_NAME}`, ar: `${accountName.ar} | ${SITE_NAME}` },
      description: { en: '', ar: '' },
    } : STATIC_SEO['not-found']);
    this.lastPage = {
      name: page.name,
      title: page.title,
      hasMetaTitle: { en: true, ar: true },
      description: page.description,
      schemaType: 'WebPage',
    };
    this.lastPagePath = path;
    this.applyLocalizedPageSeo(this.lastPage, language);
  }

  private setPageStructuredData(
    title: string,
    description: string,
    imageUrl: string | undefined,
    type: SeoSchemaType,
    entity?: Record<string, unknown>,
    entityName?: string,
  ): void {
    const canonicalUrl = this.canonicalUrl();
    const language = this.languageFromUrl();
    const page: Record<string, unknown> = {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#page`,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: language,
      isPartOf: { '@id': `${this.publicBaseUrl}/#website` },
    };
    if (imageUrl) page['image'] = imageUrl;
    const graph: Record<string, unknown>[] = [page];
    const subject: Record<string, unknown> = type === 'WebPage' ? page : {
      '@type': type,
      '@id': `${canonicalUrl}#entity`,
      url: canonicalUrl,
      name: entityName || title,
      description,
      ...(imageUrl ? { image: imageUrl } : {}),
      mainEntityOfPage: { '@id': `${canonicalUrl}#page` },
    };
    if (subject !== page) {
      page['mainEntity'] = { '@id': `${canonicalUrl}#entity` };
      graph.push(subject);
    }

    if (type === 'Blog') {
      subject['headline'] = entityName || title;
      subject['inLanguage'] = language;
      subject['publisher'] = { '@id': `${this.publicBaseUrl}/#organization` };
      subject['author'] = { '@id': `${this.publicBaseUrl}/#organization` };
      const published = this.dateValue(entity, 'publishedAt', 'PublishedAt');
      const modified = this.dateValue(entity, 'modifiedAt', 'ModifiedAt', 'updatedAt', 'UpdatedAt');
      if (published) subject['datePublished'] = published;
      if (modified) subject['dateModified'] = modified;
    }

    if (type === 'Tour') {
      subject['provider'] = { '@id': `${this.publicBaseUrl}/#organization` };
      const offer = this.offer(entity, canonicalUrl);
      if (offer) subject['offers'] = offer;
      const duration = this.durationInDays(entity);
      if (duration) subject['itinerary'] = { '@type': 'ItemList', numberOfItems: duration };
    }

    if (type === 'City' || type === 'Destination') {
      const country = this.textValue(entity, 'countryCode', 'CountryCode', 'countryName', 'CountryName');
      subject['address'] = {
        '@type': 'PostalAddress',
        ...(country ? { addressCountry: country } : {}),
        addressLocality: entityName || title,
      };
      if (type === 'Destination') subject['touristType'] = language === 'ar' ? 'سياح' : 'Leisure travellers';
    }

    if (type === 'Hotel') {
      const country = this.textValue(entity, 'countryCode', 'CountryCode', 'countryName', 'CountryName');
      subject['address'] = {
        '@type': 'PostalAddress',
        ...(country ? { addressCountry: country } : {}),
        addressLocality: this.textValue(
          entity,
          language === 'ar' ? 'cityNameAr' : 'cityNameEng',
          language === 'ar' ? 'CityNameAr' : 'CityNameEng',
          'destinationName', 'DestinationName',
        ) ?? entityName ?? title,
      };
      const starRating = this.numberValue(entity, 'starRating', 'StarRating');
      if (starRating) subject['starRating'] = { '@type': 'Rating', ratingValue: starRating, bestRating: 5 };
      const telephone = this.textValue(entity, 'phoneNumber', 'PhoneNumber');
      const email = this.textValue(entity, 'email', 'Email');
      if (telephone) subject['telephone'] = telephone;
      if (email) subject['email'] = email;
      const amenities = this.arrayValue(entity, 'amenities', 'Amenities');
      if (amenities.length) {
        subject['amenityFeature'] = amenities.map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: this.textValue(
            amenity,
            language === 'ar' ? 'nameAr' : 'nameEng',
            language === 'ar' ? 'NameAr' : 'NameEng',
            'name', 'Name',
          ) ?? '',
          value: true,
        })).filter((feature) => feature.name);
      }
    }

    if (type === 'HotelRoom') {
      const hotelName = this.textValue(entity, 'hotelName', 'HotelName');
      const hotelUrl = this.textValue(entity, 'hotelUrl', 'HotelUrl');
      if (hotelName) {
        subject['containedInPlace'] = {
          '@type': 'Hotel',
          name: hotelName,
          ...(hotelUrl ? { url: this.absoluteUrl(hotelUrl) } : {}),
        };
      }
      const occupancy = this.numberValue(entity, 'maxTotalOccupancy', 'MaxTotalOccupancy');
      if (occupancy) subject['occupancy'] = { '@type': 'QuantitativeValue', maxValue: occupancy };
      const roomSize = this.numberValue(entity, 'roomSize', 'RoomSize');
      if (roomSize) subject['floorSize'] = { '@type': 'QuantitativeValue', value: roomSize, unitCode: 'MTK' };
      const bed = this.textValue(entity, 'bedType', 'BedType');
      if (bed) subject['bed'] = bed;
      const offer = this.offer(entity, canonicalUrl);
      if (offer) subject['offers'] = offer;
    }

    const breadcrumbs = this.breadcrumbService.items();
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

  /**
   * Organization + website graph, kept in sync with the company details shown in the footer
   * so Google sees the same name, address, phone, e-mail and social profiles as visitors do.
   */
  private setSiteStructuredData(language: 'en' | 'ar'): void {
    const logo = this.absolutePath(COMPANY_PROFILE.logoPath);
    this.setJsonLd('site-structured-data', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TravelAgency',
          '@id': `${this.publicBaseUrl}/#organization`,
          name: SITE_NAME,
          legalName: COMPANY_PROFILE.legalName,
          url: this.publicBaseUrl,
          description: COMPANY_PROFILE.description[language],
          logo: { '@type': 'ImageObject', '@id': `${this.publicBaseUrl}/#logo`, url: logo, caption: SITE_NAME },
          image: { '@id': `${this.publicBaseUrl}/#logo` },
          email: COMPANY_PROFILE.email,
          telephone: COMPANY_PROFILE.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: COMPANY_PROFILE.address[language],
            addressLocality: COMPANY_PROFILE.address.locality,
            addressRegion: COMPANY_PROFILE.address.region,
            addressCountry: COMPANY_PROFILE.address.country,
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              telephone: COMPANY_PROFILE.phone,
              email: COMPANY_PROFILE.email,
              availableLanguage: ['en', 'ar'],
              areaServed: COMPANY_PROFILE.address.country,
            },
          ],
          sameAs: COMPANY_PROFILE.socialProfiles,
          paymentAccepted: COMPANY_PROFILE.paymentAccepted.join(', '),
          currenciesAccepted: COMPANY_PROFILE.currenciesAccepted.join(', '),
          knowsLanguage: ['en', 'ar'],
        },
        {
          '@type': 'WebSite',
          '@id': `${this.publicBaseUrl}/#website`,
          name: SITE_NAME,
          url: this.publicBaseUrl,
          description: COMPANY_PROFILE.description[language],
          publisher: { '@id': `${this.publicBaseUrl}/#organization` },
          inLanguage: ['en', 'ar'],
        },
      ],
    });
    this.siteStructuredDataLanguage = language;
  }

  /** Builds an `Offer` node from whichever price fields the tour or package exposes. */
  private offer(entity: Record<string, unknown> | undefined, url: string): Record<string, unknown> | null {
    const price = this.numberValue(
      entity,
      'finalPrice', 'FinalPrice', 'priceAfterDiscount', 'PriceAfterDiscount',
      'adultPrice', 'AdultPrice', 'pricePerPerson', 'PricePerPerson', 'price', 'Price',
    );
    if (price === null) return null;
    const currency = this.textValue(entity, 'currencyCode', 'CurrencyCode', 'currency', 'Currency') ?? 'USD';
    return {
      '@type': 'Offer',
      price,
      priceCurrency: currency.toUpperCase(),
      availability: 'https://schema.org/InStock',
      url,
      seller: { '@id': `${this.publicBaseUrl}/#organization` },
    };
  }

  private durationInDays(entity: Record<string, unknown> | undefined): number | null {
    return this.numberValue(entity, 'durationDays', 'DurationDays', 'numberOfDays', 'NumberOfDays', 'days', 'Days');
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
    if (this.pendingPath) return this.pendingPath;
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



  private cleanDescription(value: string): string {
    const text = this.plainText(value);
    return text;
  
  }

  private plainText(value: string): string {
    const element = this.document.createElement('div');
    element.innerHTML = value.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
      .replace(/<[^>]*>/g, ' ');
    return (element.textContent ?? '').replace(/\s+/g, ' ').trim();
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

  private numberValue(entity: Record<string, unknown> | undefined, ...keys: string[]): number | null {
    for (const key of keys) {
      const value = Number(entity?.[key]);
      if (Number.isFinite(value) && value > 0) return value;
    }
    return null;
  }

  private textValue(entity: Record<string, unknown> | undefined, ...keys: string[]): string | null {
    for (const key of keys) {
      const value = entity?.[key];
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
    return null;
  }

  private arrayValue(entity: Record<string, unknown> | undefined, ...keys: string[]): Record<string, unknown>[] {
    for (const key of keys) {
      const value = entity?.[key];
      if (Array.isArray(value)) {
        return value.filter((item): item is Record<string, unknown> => !!item && typeof item === 'object');
      }
    }
    return [];
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
    if (this.siteStructuredDataLanguage !== language) this.setSiteStructuredData(language);
    const root = this.document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    this.document.body?.setAttribute('dir', root.dir);
  }
}
