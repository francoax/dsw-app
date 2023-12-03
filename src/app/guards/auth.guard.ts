import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!)
  const router = inject(Router)
  if(!loggedUser) {
    router.navigate(['/login'])
    return false
  }
  const expectedRole = route.data['expectedRole'];
  const userRole = loggedUser.role
  if (userRole && userRole === expectedRole) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
