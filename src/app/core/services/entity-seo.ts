export type SeoLanguage = 'en' | 'ar';

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

export function resolveEntitySeo(entity: any, language: SeoLanguage, _schemaType: string,
  fallbackTitle = '', fallbackDescription = '') {
  const name = localizedEntityText(entity, language, 'name', 'title') || fallbackTitle;
  const description = localizedEntityText(entity, language, 'description', 'summary') || fallbackDescription;
  return { name, title: name, description };
}
