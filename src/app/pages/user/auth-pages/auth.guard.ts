import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const user = authService.getCurentUser();

  if (token && user) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
