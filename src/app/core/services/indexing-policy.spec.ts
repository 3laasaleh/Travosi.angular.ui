import { mayIndexRequest, blockedRobotsContent, withNoindexRobotsMeta } from './indexing-policy';
import { normalizeSitemap } from './sitemap';

describe('indexing policy', () => {
  const origin = 'https://api.seaworldholidays.com';
  it('indexes only the canonical production origin with indexing enabled', () => {
    expect(mayIndexRequest(true, origin, `${origin}/ar/tours`)).toBe(true);
    expect(mayIndexRequest(false, origin, `${origin}/ar/tours`)).toBe(false);
    expect(mayIndexRequest(true, origin, 'https://stage.seaworldholidays.com/ar/tours')).toBe(false);
    expect(mayIndexRequest(true, origin, 'http://localhost:4000/ar/tours')).toBe(false);
  });
  it('blocks crawlers on non-indexable deployments', () => {
    expect(blockedRobotsContent()).toBe('User-agent: *\nDisallow: /\n');
  });
  it('replaces the shell robots tag without duplicates on noindex routes', () => {
    const html = '<head><meta name="robots" content="index, follow"><meta name="robots" content="index, follow"></head>';
    const result = withNoindexRobotsMeta(html);
    expect(result.match(/name="robots"/g)).toHaveLength(1);
    expect(result).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(withNoindexRobotsMeta('<head></head>')).toContain('noindex, nofollow');
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
