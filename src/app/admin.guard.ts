import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { from, map, take, tap } from 'rxjs';
import { environment } from '../environments/environment';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = "Administrador";

  return authService.idTokenClaims$.pipe(
    take(1),
    map((idToken: any) => idToken[environment.roleLogin].includes(expectedRole)),
    tap(hasRole => {
      if (!hasRole) {
        router.navigate(['/']);
      }
    })
  );
};

export const alumnoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = "Alumno";

  return authService.idTokenClaims$.pipe(
    take(1),
    map((idToken: any) => idToken[environment.roleLogin].includes(expectedRole)),
    tap(hasRole => {
      if (!hasRole) {
        router.navigate(['/']);
      }
    })
  );
};

export const docenteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = "Docente";

  return authService.idTokenClaims$.pipe(
    take(1),
    map((idToken: any) => idToken[environment.roleLogin].includes(expectedRole)),
    tap(hasRole => {
      if (!hasRole) {
        router.navigate(['/']);
      }
    })
  );
};
