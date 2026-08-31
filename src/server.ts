import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { environment } from './environments/environment';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const allowedHosts = (process.env['NG_ALLOWED_HOSTS']
  || 'localhost,127.0.0.1,seaworld.premiumasp.net,www.seaworld.premiumasp.net')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean);
const angularApp = new AngularNodeAppEngine({ allowedHosts });
const publicBaseUrl = (process.env['PUBLIC_BASE_URL'] || environment.publicBaseUrl).replace(/\/+$/, '');
const apiBaseUrl = process.env['API_BASE_URL'] || environment.baseUrl;
const apiOrigin = new URL(apiBaseUrl).origin;

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send([
    'User-agent: *',
    'Allow: /',
    'Disallow: /configurations/',
    'Disallow: /account/',
    'Disallow: /user-',
    'Disallow: /login',
    'Disallow: /signup',
    '',
    `Sitemap: ${publicBaseUrl}/sitemap.xml`,
    '',
  ].join('\n'));
});

app.get('/sitemap.xml', async (_req, res, next) => {
  try {
    const response = await fetch(`${apiOrigin}/sitemap.xml`, {
      headers: { Accept: 'application/xml' },
    });
    const body = await response.text();
    res.status(response.status).type('application/xml').send(body);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  const path = req.path;
  if (path.length > 1 && path.endsWith('/')) {
    return res.redirect(308, `${path.replace(/\/+$/, '')}${req.url.slice(path.length)}`);
  }

  const firstSegment = path.split('/').filter(Boolean)[0]?.toLowerCase();
  const localizedPaths = new Set([
    'home', 'destinations', 'cities', 'tours', 'nile-cruises', 'packages', 'blogs',
    'configurations', 'account', 'login', 'signup', 'signup-success', 'forgot-password',
    'reset-password', 'user-setting', 'user-profile', 'user-booking', 'user-payment',
    'user-invoice', 'user-social', 'user-notification', 'aboutus', 'helpcenter',
    'helpcenter-faqs', 'helpcenter-guides', 'helpcenter-support', 'terms', 'privacy',
    'contact', 'blog-standard', 'blog-detail',
  ]);
  if (path === '/' || (firstSegment && localizedPaths.has(firstSegment))) {
    const cookieLanguage = /(?:^|;\s*)lang=(ar|en)(?:;|$)/i.exec(req.headers.cookie ?? '')?.[1];
    const language = cookieLanguage?.toLowerCase() === 'ar'
      || (!cookieLanguage && req.acceptsLanguages('ar', 'en') === 'ar') ? 'ar' : 'en';
    const target = path === '/' ? `/${language}/home` : `/${language}${path}`;
    return res.redirect(308, `${target}${req.url.slice(path.length)}`);
  }
  return next();
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
