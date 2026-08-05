import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/user/_services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const hasToken = !!authService.getToken();
  const role = authService.getCurrentUserRole();
  const hasAccess = role === 'Admin' || role === 'Agent';
  if (hasToken && hasAccess) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
