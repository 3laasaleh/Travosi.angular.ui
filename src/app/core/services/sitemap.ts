/** Keep canonical origins consistent even when the API has a different deployment setting. */
export function normalizeSitemap(xml: string, publicBaseUrl: string): string {
  if (!/<urlset\b[^>]*xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["']/.test(xml)
    || /<!DOCTYPE|<!ENTITY|<html\b/i.test(xml)) throw new Error('Invalid upstream sitemap');
  const canonical = (value: string) => {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid sitemap URL');
    return `${publicBaseUrl.replace(/\/+$/, '')}${url.pathname.replace(/\/+$/, '')}`;
  };
  return xml.replace(/(<loc>)([^<]+)(<\/loc>)/g, (_, start, url, end) => `${start}${canonical(url)}${end}`)
    .replace(/(href=["'])(https?:\/\/[^"']+)(["'])/g, (_, start, url, end) => `${start}${canonical(url)}${end}`);
}
