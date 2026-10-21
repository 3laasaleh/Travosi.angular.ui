import { mayIndexRequest, robotsContent } from './indexing-policy';
import { normalizeSitemap } from './sitemap';

describe('indexing policy', () => {
  const origin = 'https://seaworld-prod.premiumasp.net';
  it('indexes only the canonical production origin with indexing enabled', () => {
    expect(mayIndexRequest(true, origin, `${origin}/ar/tours`)).toBe(true);
    expect(mayIndexRequest(false, origin, `${origin}/ar/tours`)).toBe(false);
    expect(mayIndexRequest(true, origin, 'https://seaworld-stage.premiumasp.net/ar/tours')).toBe(false);
    expect(mayIndexRequest(true, origin, 'http://localhost:4000/ar/tours')).toBe(false);
  });
  it('blocks staging and publishes the production sitemap only for indexable requests', () => {
    expect(robotsContent(false, origin)).toBe('User-agent: *\nDisallow: /\n');
    expect(robotsContent(true, origin)).toContain(`Sitemap: ${origin}/sitemap.xml`);
  });
  it('normalizes sitemap URL origins without changing canonical route paths or XML namespaces', () => {
    const xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://old.example/ar/destinations/egypt/cities/cairo/</loc><xhtml:link href="https://old.example/en/destinations/egypt/cities/cairo"/></url></urlset>';
    const result = normalizeSitemap(xml, origin);
    expect(result).toContain(`<loc>${origin}/ar/destinations/egypt/cities/cairo</loc>`);
    expect(result).toContain(`href="${origin}/en/destinations/egypt/cities/cairo"`);
    expect(result).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(() => normalizeSitemap('<html>API error</html>', origin)).toThrow();
  });
});
