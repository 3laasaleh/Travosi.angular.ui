import { mkdir, writeFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import assert from 'node:assert/strict';

const base = process.argv[2] ?? 'https://seaworld-stage.premiumasp.net';
const output = process.argv[3] ?? 'artifacts/seo-audit/before';
await mkdir(output, { recursive: true });
const results = await Promise.all([
  ['ar', '/ar/destinations/egypt-tours/cities/cairo'],
  ['en', '/en/destinations/egypt-tours/cities/cairo'],
  ['robots', '/robots.txt'],
  ['sitemap', '/sitemap.xml'],
].map(async ([name, path]) => {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(60000) });
  const body = await response.text();
  await writeFile(`${output}/${name}.html`, body);
  const result = { name, capturedAt: new Date().toISOString(), requestedUrl: `${base}${path}`, url: response.url, status: response.status,
    headers: Object.fromEntries(response.headers) };
  if (name === 'ar' || name === 'en') {
    const document = new JSDOM(body).window.document;
    const content = (selector) => document.querySelector(selector)?.getAttribute('content') ?? null;
    Object.assign(result, {
      title: document.title,
      description: content('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      alternates: [...document.querySelectorAll('link[hreflang]')].map(el => ({
        language: el.getAttribute('hreflang'), href: el.getAttribute('href'),
      })),
      robots: content('meta[name="robots"]'),
      googlebot: content('meta[name="googlebot"]'),
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      h1: [...document.querySelectorAll('h1')].map(el => el.textContent.trim()),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => {
        try { return JSON.parse(el.textContent); } catch { return { error: 'Invalid JSON-LD' }; }
      }),
      mainText: [...document.querySelectorAll('main')].map(el => el.textContent.replace(/\s+/g, ' ').trim()),
      placeholderCount: (body.match(/ssssss/gi) ?? []).length,
      tourLinks: [...document.querySelectorAll('main a[href*="/tours/"]')].map(el => ({
        href: el.getAttribute('href'), text: el.textContent.replace(/\s+/g, ' ').trim(),
      })),
      breadcrumb: document.querySelector('app-breadcrumbs')?.textContent.replace(/\s+/g, ' ').trim(),
    });
  } else {
    result.bodyPreview = body.slice(0, 1500);
  }
  await writeFile(`${output}/${name}.json`, JSON.stringify(result, null, 2));
  return result;
}));
await writeFile(`${output}/summary.json`, JSON.stringify(results, null, 2));
if (process.argv.includes('--assert-staging')) {
  for (const result of results) {
    assert.equal(result.status, 200, `${result.name} HTTP status`);
    assert.equal(result.headers['x-robots-tag'], 'noindex, nofollow');
    if (result.name === 'ar' || result.name === 'en') {
      assert.equal(result.lang, result.name);
      assert.equal(result.h1.length, 1);
      assert.equal(result.placeholderCount, 0);
      assert.equal(result.robots, 'noindex, nofollow');
      assert.ok(result.description);
      assert.ok(result.canonical.startsWith('https://seaworld-prod.premiumasp.net/'));
      assert.ok(result.jsonLd.flatMap(item => item['@graph'] ?? []).some(item => item['@type'] === 'City'));
      assert.ok(result.breadcrumb.includes(result.h1[0]));
      assert.ok(result.tourLinks.length > 0);
      assert.ok(result.tourLinks.every(link => link.href.startsWith(`/${result.name}/tours/`)));
      for (const language of ['ar', 'en']) {
        assert.ok(result.alternates.some(link => link.language === language
          && link.href === `https://seaworld-prod.premiumasp.net/${language}/destinations/egypt-tours/cities/cairo`));
      }
    }
  }
  assert.match(results.find(item => item.name === 'robots').bodyPreview, /Disallow: \//);
  assert.doesNotMatch(results.find(item => item.name === 'sitemap').bodyPreview, /<loc>/);
  console.log('Raw SSR staging assertions passed (no JavaScript executed).');
}
console.log(JSON.stringify(results.map(({ jsonLd, mainText, tourLinks, headers, ...rest }) => rest), null, 2));
