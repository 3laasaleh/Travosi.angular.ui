import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang/configurations/**',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  {
    path: ':lang/signup-success',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  {
    path: ':lang/account/**',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  {
    path: ':lang/login',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  {
    path: ':lang/signup',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  {
    path: ':lang/forgot-password',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  {
    path: ':lang/reset-password',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  ...[
    'user-setting', 'user-profile', 'user-booking', 'user-payment', 'user-invoice',
    'user-social', 'user-notification',
  ].map((path): ServerRoute => ({
    path: `:lang/${path}`,
    renderMode: RenderMode.Client,
  })),
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
