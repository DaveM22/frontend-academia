import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { PersonaService } from '../../services/persona.service';
import { DocenteFilter } from '../../entities/filter';

export const docenteExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const personaService = inject(PersonaService);
  const router = inject(Router);
  const id = route.params['id'];
  const docenteFilter = new DocenteFilter();
  docenteFilter.incluirAsignaciones = true;
  return personaService.getByIdProfesor(id, docenteFilter).pipe(
    map(() => true),
    catchError(() => of(router.parseUrl('/not-found')))
  );
};
