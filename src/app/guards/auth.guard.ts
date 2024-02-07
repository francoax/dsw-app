import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
  iat: number;
}

export const authGuard: CanActivateFn = (route, state) => {
  const loggedUser = localStorage.getItem('loggedUser');
  const router = inject(Router);

  if (!loggedUser) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRole = route.data['expectedRole'];

  const decodedToken: JwtPayload = jwtDecode(loggedUser);
  const userRole = decodedToken.role;

  if (userRole && userRole === expectedRole) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
