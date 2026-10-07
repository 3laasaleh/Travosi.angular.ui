import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/user/_services/auth.service';

export const adminOnlyGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.getToken() && auth.getCurrentUserRole() === 'Admin'
    ? true
    : inject(Router).createUrlTree(['/home']);
};
