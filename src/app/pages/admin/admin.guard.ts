import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../user/auth-pages/_services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const hasToken = !!authService.getToken();
  const isAdmin = authService.getCurrentUserRole() === 'Admin';

  if (hasToken && isAdmin) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
