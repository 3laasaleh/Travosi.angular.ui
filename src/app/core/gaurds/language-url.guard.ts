import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

const supportedLanguages = new Set(['en', 'ar']);

/** Keeps public catalogue URLs canonical, for example /ar/tours/2. */
export const languageUrlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const languageService = inject(LanguageService);
  const tree = router.parseUrl(state.url);
  const primary = tree.root.children['primary'];
  const segments = primary?.segments.map((segment) => segment.path) ?? [];
  const routeLanguage = route.paramMap.get('lang')?.toLowerCase();
  const urlLanguage = segments[0]?.toLowerCase();

  if (supportedLanguages.has(urlLanguage)) {
    languageService.setLanguage(urlLanguage);
    return true;
  }

  // An unsupported value in the :lang position should not become part of the
  // requested catalogue path.
  if (routeLanguage) {
    return router.createUrlTree([languageService.getCurrentLanguage(), 'home']);
  }

  return router.createUrlTree(
    [languageService.getCurrentLanguage(), ...segments],
    { queryParams: tree.queryParams, fragment: tree.fragment ?? undefined },
  );
};
