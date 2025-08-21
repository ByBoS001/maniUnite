import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../services/auth-store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.userProfile$.pipe(
    take(1), // Take the latest value and complete
    map(user => {
      const isLoggedIn = !!user && (user.role === 'individual' || user.role === 'ong' || user.role === 'admin');
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['/iniciosesion']);
        return false;
      }
    })
  );
};
