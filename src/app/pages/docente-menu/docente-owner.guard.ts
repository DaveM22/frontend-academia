import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppPageState } from '../../store/states/page/app.state';

export const docenteOwnerGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);
  const idParam = route.params['id'];
  const currentPersonId = store.selectSnapshot(AppPageState.getPersonId);
  if (!currentPersonId || currentPersonId !== idParam) {
    return router.parseUrl('/not-found');
  }
  return true;
};
