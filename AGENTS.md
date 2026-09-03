# Sea World Holidays — Angular platform

Angular 22 SSR travel-agency app (package name `SeaWorld.TravelAgency`). Bilingual EN/AR with
language-prefixed routes (`/en/...`, `/ar/...`) and RTL support.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm start` |
| Production build (browser + server bundles) | `npx ng build` |
| SSR dev build + serve | `npm run serve:ssr:app-dev` |
| Run the built SSR server | `node dist/seeworld/server/server.mjs` (listens on `:4000`) |
| Unit tests | `npm test` |

Verify changes with `npx ng build`. For SSR/SEO changes, also start the built server and inspect the
rendered HTML (`Invoke-WebRequest http://localhost:4000/en/tours`) — meta tags, JSON-LD and
breadcrumbs must be present in the server response, not only after hydration.

If the build fails with `Could not resolve "@angular/ssr"` or `Cannot find type definition file for
'node'`, the checkout is missing packages — run `npm install`.

## Conventions

- Standalone components, `ChangeDetectionStrategy.OnPush`, signals for new state.
- Files are named after the component without a `.component` suffix (`tour-page.ts` / `tour-page.html`).
- Translations live in `src/assets/lang/en.json` and `ar.json`; every new user-facing string needs both.
- Public API calls go through `ApiService.getUnauthntecated` / `postUnauthenticated` (note the
  existing spelling) so the auth interceptor and transfer cache skip them.
- Prices are always formatted through `CurrencyService` / `formatHomePrice`.

## SEO

- `SeoService` (`src/app/core/services/seo.service.ts`) owns titles, meta, Open Graph, canonical,
  `hreflang` and all JSON-LD. Pages publish their entity with `seo.updateFrom(entity, { schemaType })`.
- Public company details (address, phone, e-mail, socials, payment methods) live once in
  `src/app/core/data/company-profile.ts` and feed the Organization schema. Keep it in sync with the
  footer markup.
- `BreadcrumbService` (`src/app/core/services/breadcrumb.service.ts`) derives the trail from the route
  and feeds both the visible `<app-breadcrumbs />` component and the `BreadcrumbList` schema. Add new
  routes to its `SEGMENTS` map so they get localized labels.
- `<app-breadcrumbs />` goes on every page except the home page, immediately after `<app-home-navbar />`.
