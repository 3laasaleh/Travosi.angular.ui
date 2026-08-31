import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from './language.service';

export interface SeoPageOptions {
  imageUrl?: string;
  image?: unknown;
  fallbackTitle?: string;
  fallbackDescription?: string;
  schemaType?: 'WebPage' | 'TouristTrip' | 'Place' | 'City' | 'BlogPosting';
}

export interface LocalizedSeoPage {
  titleEn?: string | null;
  titleAr?: string | null;
  descriptionEn?: string | null;
  descriptionAr?: string | null;
  slug?: string | null;
  section?: 'tours' | 'packages' | 'destinations' | 'cities' | 'blogs';
  currentLang?: 'en' | 'ar';
  imageUrl?: string;
  imageAlt?: string;
  schemaType?: SeoPageOptions['schemaType'];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  private lastPage: LocalizedSeoPage | null = null;

  constructor() {
    // Detail components are reused when only /en changes to /ar. Reapply the
    // loaded entity's bilingual metadata even when the component is not recreated.
    effect(() => {
      const currentLanguage = this.language.currentLanguage();
      if (this.lastPage) this.applyLocalizedPageSeo(this.lastPage, currentLanguage);
    });
  }

  /** Uses the active language and the standard bilingual API fields for a public page. */
  updateFrom(entity: any, options: SeoPageOptions = {}): void {
    const image = options.image ?? entity?.coverImage ?? entity?.coverImageUrl ?? entity?.imageUrl ?? entity?.images?.[0];
    this.setLocalizedPageSeo({
      titleEn: entity?.seoTitleEn ?? entity?.SeoTitleEn ?? entity?.seoTitleEng ?? entity?.SeoTitleEng ?? entity?.titleEn ?? entity?.TitleEn ?? entity?.titleEng ?? entity?.TitleEng ?? entity?.nameEn ?? entity?.NameEn ?? entity?.nameEng ?? entity?.NameEng ?? entity?.title ?? entity?.Title ?? entity?.name ?? entity?.Name ?? options.fallbackTitle,
      titleAr: entity?.seoTitleAr ?? entity?.SeoTitleAr ?? entity?.titleAr ?? entity?.TitleAr ?? entity?.nameAr ?? entity?.NameAr,
      descriptionEn: entity?.seoDescriptionEn ?? entity?.SeoDescriptionEn ?? entity?.seoDescriptionEng ?? entity?.SeoDescriptionEng ?? entity?.descriptionEn ?? entity?.DescriptionEn ?? entity?.descriptionEng ?? entity?.DescriptionEng ?? entity?.fullDescriptionEn ?? entity?.FullDescriptionEn ?? entity?.fullDescriptionEng ?? entity?.FullDescriptionEng ?? entity?.summaryEn ?? entity?.SummaryEn ?? entity?.summaryEng ?? entity?.SummaryEng ?? entity?.contentEn ?? entity?.ContentEn ?? entity?.contentEng ?? entity?.ContentEng ?? entity?.description ?? entity?.Description ?? entity?.fullDescription ?? entity?.FullDescription ?? entity?.summary ?? entity?.Summary ?? entity?.content ?? entity?.Content ?? options.fallbackDescription,
      descriptionAr: entity?.seoDescriptionAr ?? entity?.SeoDescriptionAr ?? entity?.descriptionAr ?? entity?.DescriptionAr ?? entity?.fullDescriptionAr ?? entity?.FullDescriptionAr ?? entity?.summaryAr ?? entity?.SummaryAr ?? entity?.contentAr ?? entity?.ContentAr,
      slug: entity?.slug ?? entity?.Slug ?? entity?.routeName ?? entity?.RouteName,
      currentLang: this.languageFromUrl(),
      imageUrl: options.imageUrl,
      imageAlt: this.imageAlt(image),
      schemaType: options.schemaType,
    });
  }

  /** Sets a localized detail page's SEO from the API response after it has loaded. */
  setLocalizedPageSeo(page: LocalizedSeoPage): void {
    this.lastPage = page;
    this.applyLocalizedPageSeo(page, page.currentLang ?? this.languageFromUrl());
  }

  private applyLocalizedPageSeo(page: LocalizedSeoPage, language: 'en' | 'ar'): void {
    const title = this.localized(page.titleEn, page.titleAr, '', language);
    const description = this.localized(page.descriptionEn, page.descriptionAr, '', language);
    this.applyDocumentLanguage(language);
    this.setPage(title, description, page.imageUrl, page.imageAlt, language);
    this.setStructuredData(title, description, page.imageUrl, page.schemaType ?? 'WebPage', language);
  }

  setPage(title: string, description: string, imageUrl?: string, imageAlt?: string, language = this.languageFromUrl()): void {
    const resolvedTitle = title.trim();
    const resolvedDescription = this.cleanDescription(description);
    const canonicalUrl = this.canonicalUrl();
    this.titleService.setTitle(resolvedTitle || this.titleService.getTitle());
    this.updateOrRemoveProperty('og:title', resolvedTitle);
    this.updateOrRemoveName('twitter:title', resolvedTitle);
    this.updateOrRemoveName('description', resolvedDescription);
    this.updateOrRemoveProperty('og:description', resolvedDescription);
    this.updateOrRemoveName('twitter:description', resolvedDescription);
    this.updateName('robots', 'index, follow');
    this.updateProperty('og:type', 'website');
    this.updateProperty('og:locale', language === 'ar' ? 'ar_EG' : 'en_US');
    this.updateProperty('og:url', canonicalUrl);
    this.updateName('twitter:card', imageUrl ? 'summary_large_image' : 'summary');
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
  }

  imageAlt(image: any, fallback = ''): string {
    const english = image?.altEng ?? image?.AltEng;
    const arabic = image?.altAr ?? image?.AltAr;
    return this.languageFromUrl() === 'ar'
      ? arabic || english || image?.imageName || image?.ImageName || fallback
      : english || arabic || image?.imageName || image?.ImageName || fallback;
  }

  private localized(english: unknown, arabic: unknown, fallback: unknown, language = this.languageFromUrl()): string {
    const value = language === 'ar'
      ? arabic || english || fallback
      : english || arabic || fallback;
    return typeof value === 'string' ? value : '';
  }

  private cleanDescription(value: string): string {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);
  }

  private canonicalUrl(): string {
    const location = this.document.defaultView?.location;
    return location ? `${location.origin}${location.pathname}` : '';
  }

  private setCanonical(url: string): void {
    const canonicalLinks = Array.from(this.document.head.querySelectorAll('link[rel="canonical"]')) as HTMLLinkElement[];
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
    const location = this.document.defaultView?.location;
    if (!location) return;
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments[0] !== 'en' && segments[0] !== 'ar') return;

    this.document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    for (const language of ['en', 'ar', 'x-default'] as const) {
      const alternateSegments = [...segments];
      alternateSegments[0] = language === 'x-default' ? 'en' : language;
      const href = `${location.origin}/${alternateSegments.join('/')}`;
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = language;
      link.href = href;
      this.document.head.appendChild(link);
    }
  }

  private setStructuredData(title: string, description: string, imageUrl: string | undefined, type: SeoPageOptions['schemaType'], language = this.languageFromUrl()): void {
    const scriptId = 'page-structured-data';
    let script = this.document.head.querySelector(`#${scriptId}`) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': type,
      name: title,
      description,
      url: this.canonicalUrl(),
      inLanguage: language,
    };
    if (imageUrl) data['image'] = imageUrl;
    script.textContent = JSON.stringify(data);
  }

  private updateName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private updateProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
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
    const segment = this.document.defaultView?.location.pathname.split('/').filter(Boolean)[0]?.toLowerCase();
    return segment === 'ar' ? 'ar' : segment === 'en' ? 'en' : this.language.currentLanguage();
  }

  private applyDocumentLanguage(language: 'en' | 'ar'): void {
    const root = this.document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
}
