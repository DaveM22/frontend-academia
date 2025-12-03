import { State, Action, StateContext, Selector } from '@ngxs/store';
import { NotificacionModelState } from '../../modelstate/api/notificacion.modelstate';
import { GetNotificacionesAction, GetNoLeidasAction, GetNoLeidasCountAction, MarcarComoLeidaAction, ClearNotificacionesAction } from '../../actions/api/notificacion.action';
import { NotificacionService } from '../../../services/notificacion.service';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@State<NotificacionModelState>({
  name: 'notificacion',
  defaults: {
    notificaciones: [],
    noLeidas: [],
    noLeidasCount: 0,
    loading: false,
    error: false,
    errorMessage: ''
  }
})
@Injectable()
export class NotificacionState {
  constructor(
    private notificacionService: NotificacionService,
    private messageService: MessageService
  ) {}

  @Selector()
  static getNotificaciones(state: NotificacionModelState): any[] {
    return state.notificaciones;
  }

  @Selector()
  static getNoLeidas(state: NotificacionModelState): any[] {
    return state.noLeidas;
  }

  @Selector()
  static getNoLeidasCount(state: NotificacionModelState): number {
    return state.noLeidasCount;
  }

  @Selector()
  static getLoading(state: NotificacionModelState): boolean {
    return state.loading;
  }

  @Selector()
  static getError(state: NotificacionModelState): boolean {
    return state.error;
  }

  @Selector()
  static getErrorMessage(state: NotificacionModelState): string {
    return state.errorMessage;
  }

  @Action(GetNotificacionesAction)
  getNotificaciones(ctx: StateContext<NotificacionModelState>, action: GetNotificacionesAction) {
    ctx.patchState({ loading: true, error: false, errorMessage: '' });
    return this.notificacionService.getByDocente(action.payload.docenteId).pipe(
      tap((notificaciones) => {
        ctx.patchState({ notificaciones, loading: false });
      }),
      catchError((error) => {
        const message = error?.error?.message || 'Error al cargar notificaciones';
        ctx.patchState({ error: true, errorMessage: message, loading: false });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
        return of([]);
      })
    );
  }

  @Action(GetNoLeidasAction)
  getNoLeidas(ctx: StateContext<NotificacionModelState>, action: GetNoLeidasAction) {
    return this.notificacionService.getNoLeidas(action.payload.docenteId).pipe(
      tap((noLeidas) => {
        ctx.patchState({ noLeidas });
      }),
      catchError((error) => {
        const message = error?.error?.message || 'Error al cargar notificaciones no leidas';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
        return of([]);
      })
    );
  }

  @Action(GetNoLeidasCountAction)
  getNoLeidasCount(ctx: StateContext<NotificacionModelState>, action: GetNoLeidasCountAction) {
    return this.notificacionService.getNoLeidasCount(action.payload.docenteId).pipe(
      tap((response) => {
        ctx.patchState({ noLeidasCount: response.count });
      }),
      catchError((error) => {
        const message = error?.error?.message || 'Error al obtener cantidad de notificaciones';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
        return of({ count: 0 });
      })
    );
  }

  @Action(MarcarComoLeidaAction)
  marcarComoLeida(ctx: StateContext<NotificacionModelState>, action: MarcarComoLeidaAction) {
    return this.notificacionService.marcarComoLeida(action.payload.notificacionId).pipe(
      tap(() => {
        // Recargar notificaciones y contar
        ctx.dispatch(new GetNotificacionesAction({ docenteId: action.payload.docenteId }));
        ctx.dispatch(new GetNoLeidasCountAction({ docenteId: action.payload.docenteId }));
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Notificación marcada como leída' });
      }),
      catchError((error) => {
        const message = error?.error?.message || 'Error al marcar notificación como leída';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
        return of(null);
      })
    );
  }

  @Action(ClearNotificacionesAction)
  clearNotificaciones(ctx: StateContext<NotificacionModelState>) {
    ctx.patchState({
      notificaciones: [],
      noLeidas: [],
      noLeidasCount: 0,
      loading: false,
      error: false,
      errorMessage: ''
    });
  }
}
