/** Only the configured production origin may be indexed, even with a production build on staging. */
export function mayIndexRequest(enabled: boolean, publicBaseUrl: string, requestUrl?: string): boolean {
  if (!enabled) return false;
  if (!requestUrl) return enabled;
  try {
    return new URL(requestUrl).origin === new URL(publicBaseUrl).origin;
  } catch {
    return false;
  }
}

export function robotsContent(indexable: boolean, publicBaseUrl: string): string {
  if (!indexable) return 'User-agent: *\nDisallow: /\n';
  return [
    'User-agent: *', 'Allow: /', 'Disallow: /*/configurations/',
    'Disallow: /*/account/', 'Disallow: /*/user-', 'Disallow: /*/login',
    'Disallow: /*/signup', '', `Sitemap: ${publicBaseUrl}/sitemap.xml`, '',
  ].join('\n');
}
