import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = await authService.isAdmin().toPromise();

  if (isAdmin) {
    return true;
  } else {
    return router.createUrlTree(['/']);
  }
};
