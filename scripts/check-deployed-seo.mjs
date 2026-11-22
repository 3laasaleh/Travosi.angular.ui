import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const production = (process.env.SEO_PRODUCTION_BASE || 'https://seaworldholidays.com').replace(/\/+$/, '');
const staging = (process.env.SEO_STAGE_BASE || 'https://stage.seaworldholidays.com').replace(/\/+$/, '');

async function get(path, base = production) {
  const response = await fetch(`${base}${path}`, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
  const body = await response.text();
  assert.equal(response.status, 200, `${base}${path}: expected HTTP 200, got ${response.status}`);
  return { response, body, url: response.url };
}

function htmlDocument(body) {
  return new JSDOM(body).window.document;
}

function meta(document, name) {
  return [...document.querySelectorAll(`meta[name="${name}"]`)];
}

function checkMetaConflicts(document, label) {
  assert.ok(meta(document, 'robots').length <= 1, `${label}: duplicate robots tags`);
  assert.equal(meta(document, 'googlebot').length, 0, `${label}: redundant googlebot tag`);
}

async function checkPublicPage(language) {
  const { response, body, url } = await get(`/${language}`);
  const document = htmlDocument(body);
  const label = `production /${language}`;
  checkMetaConflicts(document, label);
  assert.ok(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${label}: noindex response header`);
  assert.equal(meta(document, 'robots').length, 1, `${label}: missing robots tag`);
  assert.match(meta(document, 'robots')[0].content, /\bindex\s*,\s*follow\b/i, `${label}: not indexable`);
  assert.doesNotMatch(meta(document, 'robots')[0].content, /noindex/i, `${label}: conflicting noindex robots tag`);
  assert.ok(document.title.trim(), `${label}: missing title`);
  assert.ok(document.querySelector('meta[name="description"]')?.content.trim(), `${label}: missing description`);
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  assert.equal(canonical, url, `${label}: canonical differs from final URL`);
  assert.equal(document.querySelector('meta[property="og:url"]')?.content, canonical, `${label}: wrong Open Graph URL`);
  for (const alternate of ['en', 'ar']) {
    assert.equal(document.querySelector(`link[rel="alternate"][hreflang="${alternate}"]`)?.href,
      `${new URL(url).origin}/${alternate}/home`, `${label}: wrong ${alternate} hreflang`);
  }
  console.log(`PASS ${label} -> ${url}`);
}

async function checkNoindex(path, base, requireMeta) {
  const { response, body, url } = await get(path, base);
  const document = htmlDocument(body);
  checkMetaConflicts(document, url);
  assert.match(response.headers.get('x-robots-tag') || '', /noindex\s*,\s*nofollow/i,
    `${url}: missing noindex response header`);
  assert.ok(!/(?:^|,)\s*index\b/i.test(response.headers.get('x-robots-tag') || ''),
    `${url}: conflicting index response header`);
  if (requireMeta) {
    assert.equal(meta(document, 'robots').length, 1, `${url}: missing robots tag`);
    assert.match(meta(document, 'robots')[0].content, /noindex\s*,\s*nofollow/i,
      `${url}: missing noindex robots tag`);
  } else {
    assert.ok(meta(document, 'robots').every((tag) => /noindex/i.test(tag.content)),
      `${url}: private page has an indexable robots tag`);
  }
  console.log(`PASS noindex ${url}`);
}

async function checkIndexableShell(path) {
  const { response, body, url } = await get(path);
  const document = htmlDocument(body);
  checkMetaConflicts(document, url);
  assert.ok(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${url}: noindex response header`);
  assert.equal(meta(document, 'robots').length, 1, `${url}: missing robots tag`);
  assert.equal(meta(document, 'robots')[0].content, 'index, follow', `${url}: wrong robots tag`);
  console.log(`PASS indexable shell ${url}`);
}

async function main() {
  const robots = await get('/robots.txt');
  assert.match(robots.response.headers.get('content-type') || '', /^text\/plain\b/i);
  assert.equal(robots.body.replace(/\r\n/g, '\n').trimEnd(),
    'User-agent: *\nAllow: /\n\nSitemap: https://seaworldholidays.com/sitemap.xml');
  assert.ok(!/noindex/i.test(robots.response.headers.get('x-robots-tag') || ''), 'robots.txt has noindex header');
  assert.ok(!/<html\b/i.test(robots.body), 'robots.txt was replaced by HTML');
  console.log(`PASS robots.txt -> ${robots.url}`);

  const sitemap = await get('/sitemap.xml');
  assert.match(sitemap.response.headers.get('content-type') || '', /^(application|text)\/xml\b/i);
  assert.ok(!/noindex/i.test(sitemap.response.headers.get('x-robots-tag') || ''), 'sitemap has noindex header');
  const xml = new JSDOM(sitemap.body, { contentType: 'application/xml' }).window.document;
  assert.equal(xml.documentElement.localName, 'urlset', 'sitemap is not a URL set');
  const locations = [...xml.querySelectorAll('loc')].map((node) => node.textContent);
  for (const language of ['en', 'ar']) {
    assert.ok(locations.some((url) => url?.endsWith(`/${language}/home`)), `sitemap lacks ${language} home`);
  }
  console.log(`PASS sitemap.xml -> ${sitemap.url}`);

  await checkPublicPage('en');
  await checkPublicPage('ar');
  await checkNoindex('/en', staging, true);
  await checkNoindex('/en/login', production, false);
  await checkNoindex('/en/signup', production, false);
  await checkNoindex('/en/configurations', production, false);
  await checkIndexableShell('/en/user-profile');
  await checkIndexableShell('/en/user-booking');
  await checkIndexableShell('/en/user-payment');
  await checkIndexableShell('/en/user-invoice');
  await checkIndexableShell('/en/user-setting');
  await checkIndexableShell('/en/user-social');
  await checkIndexableShell('/en/user-notification');
}

main().catch((error) => {
  console.error(`FAIL ${error.message}`);
  process.exitCode = 1;
});
