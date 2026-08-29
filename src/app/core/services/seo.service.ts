import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from './language.service';

export interface SeoPageOptions {
  imageUrl?: string;
  image?: unknown;
  fallbackTitle?: string;
  fallbackDescription?: string;
  schemaType?: 'WebPage' | 'TouristTrip' | 'Place' | 'City' | 'BlogPosting';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);

  /** Uses the active language and the standard bilingual API fields for a public page. */
  updateFrom(entity: any, options: SeoPageOptions = {}): void {
    const title = this.localized(
      entity?.titleEng ?? entity?.TitleEng,
      entity?.titleAr ?? entity?.TitleAr,
      entity?.title ?? entity?.Title ?? entity?.nameEng ?? entity?.NameEng ?? entity?.name ?? entity?.Name ?? options.fallbackTitle,
    );
    const description = this.localized(
      entity?.descriptionEng ?? entity?.DescriptionEng ?? entity?.fullDescriptionEng ?? entity?.FullDescriptionEng ?? entity?.summaryEng ?? entity?.SummaryEng ?? entity?.contentEng ?? entity?.ContentEng,
      entity?.descriptionAr ?? entity?.DescriptionAr ?? entity?.fullDescriptionAr ?? entity?.FullDescriptionAr ?? entity?.summaryAr ?? entity?.SummaryAr ?? entity?.contentAr ?? entity?.ContentAr,
      entity?.description ?? entity?.Description ?? entity?.fullDescription ?? entity?.FullDescription ?? entity?.summary ?? entity?.Summary ?? entity?.content ?? entity?.Content ?? options.fallbackDescription,
    );
    const image = options.image ?? entity?.coverImage ?? entity?.coverImageUrl ?? entity?.imageUrl ?? entity?.images?.[0];
    this.setPage(title, description, options.imageUrl, this.imageAlt(image, title));
    this.setStructuredData(title, description, options.imageUrl, options.schemaType ?? 'WebPage');
  }

  setPage(title: string, description: string, imageUrl?: string, imageAlt?: string): void {
    const resolvedTitle = title.trim();
    const resolvedDescription = this.cleanDescription(description);
    const canonicalUrl = this.canonicalUrl();
    if (resolvedTitle) {
      this.titleService.setTitle(resolvedTitle);
      this.updateProperty('og:title', resolvedTitle);
      this.updateName('twitter:title', resolvedTitle);
    }
    if (resolvedDescription) {
      this.updateName('description', resolvedDescription);
      this.updateProperty('og:description', resolvedDescription);
      this.updateName('twitter:description', resolvedDescription);
    }
    this.updateName('robots', 'index, follow');
    this.updateProperty('og:type', 'website');
    this.updateProperty('og:locale', this.language.currentLanguage() === 'ar' ? 'ar_EG' : 'en_US');
    this.updateProperty('og:url', canonicalUrl);
    this.updateName('twitter:card', imageUrl ? 'summary_large_image' : 'summary');
    this.setCanonical(canonicalUrl);
    this.setLanguageAlternates();
    if (imageUrl) {
      this.updateProperty('og:image', imageUrl);
      this.updateName('twitter:image', imageUrl);
      if (imageAlt) {
        this.updateProperty('og:image:alt', imageAlt);
        this.updateName('twitter:image:alt', imageAlt);
      }
    }
  }

  imageAlt(image: any, fallback = ''): string {
    const english = image?.altEng ?? image?.AltEng;
    const arabic = image?.altAr ?? image?.AltAr;
    return this.language.currentLanguage() === 'ar'
      ? arabic || english || image?.imageName || image?.ImageName || fallback
      : english || arabic || image?.imageName || image?.ImageName || fallback;
  }

  private localized(english: unknown, arabic: unknown, fallback: unknown): string {
    const value = this.language.currentLanguage() === 'ar'
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
    let link = this.document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
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

    for (const language of ['en', 'ar']) {
      const alternateSegments = [...segments];
      alternateSegments[0] = language;
      const href = `${location.origin}/${alternateSegments.join('/')}`;
      let link = this.document.head.querySelector(`link[rel="alternate"][hreflang="${language}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = this.document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = language;
        this.document.head.appendChild(link);
      }
      link.href = href;
    }
  }

  private setStructuredData(title: string, description: string, imageUrl: string | undefined, type: SeoPageOptions['schemaType']): void {
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
      inLanguage: this.language.currentLanguage(),
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
}
