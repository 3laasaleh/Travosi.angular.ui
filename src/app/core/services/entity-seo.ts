export type SeoLanguage = 'en' | 'ar';

/** Public API contract shared by all catalogue entities. Empty editor fields fall back to content. */
export interface EntitySeoFields {
  seoTitleEng?: string | null;
  seoTitleAr?: string | null;
  seoDescriptionEng?: string | null;
  seoDescriptionAr?: string | null;
}

export function localizedEntityText(entity: any, language: SeoLanguage, ...fields: string[]): string {
  const suffixes = language === 'ar' ? ['Ar'] : ['Eng', 'En'];
  for (const field of fields) {
    for (const key of [...suffixes.map(suffix => field + suffix), field]) {
      const value = entity?.[key] ?? entity?.[key[0].toUpperCase() + key.slice(1)];
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
  }
  return '';
}

export function resolveEntitySeo(entity: any, language: SeoLanguage, schemaType: string,
  fallbackTitle = '', fallbackDescription = '') {
  const name = localizedEntityText(entity, language, 'name', 'title') || fallbackTitle;
  const seoTitle = localizedEntityText(entity, language, 'seoTitle', 'metaTitle');
  const title = seoTitle || (schemaType === 'City' && name
    ? language === 'ar' ? `جولات ${name} والرحلات اليومية` : `${name} Tours & Day Trips`
    : name);
  const sections = entity?.headerData ?? entity?.HeaderData;
  const description = localizedEntityText(entity, language, 'seoDescription', 'metaDescription')
    || localizedEntityText(entity, language, 'description', 'summary', 'fullDescription', 'content')
    || (Array.isArray(sections) ? sections.map(section =>
      localizedEntityText(section, language, 'description')).filter(Boolean).join(' ') : '')
    || fallbackDescription;
  return { name, title, description };
}
