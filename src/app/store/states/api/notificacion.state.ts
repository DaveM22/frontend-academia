import { State, Action, StateContext, Selector } from '@ngxs/store';
import { NotificacionModelState } from '../../modelstate/api/notificacion.modelstate';
import { GetNotificacionesAction, GetNoLeidasAction, GetNoLeidasCountAction, MarcarComoLeidaAction, ClearNotificacionesAction, GetNotificacionesAlumnoAction, GetNoLeidasCountAlumnoAction, MarcarComoLeidaAlumnoAction } from '../../actions/api/notificacion.action';
import { NotificacionService } from '../../../services/notificacion.service';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { ErrorStateHandler } from '../../../util/ErrorStateHandler';
import { LoadingForm } from '../../actions/pages/app.action';

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
  async getNotificaciones(ctx: StateContext<NotificacionModelState>, action: GetNotificacionesAction) {
    ctx.patchState({ loading: true, error: false, errorMessage: '' });
    ctx.dispatch(new LoadingForm  (true));
    try {
      const notificaciones = await lastValueFrom(this.notificacionService.getByDocente(action.payload.docenteId));
      ctx.patchState({ notificaciones });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
      ctx.dispatch(new LoadingForm(false));
    }
  }

  @Action(GetNoLeidasAction)
  async getNoLeidas(ctx: StateContext<NotificacionModelState>, action: GetNoLeidasAction) {
    try {
      const noLeidas = await lastValueFrom(this.notificacionService.getNoLeidas(action.payload.docenteId));
      ctx.patchState({ noLeidas });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
  }

  @Action(GetNoLeidasCountAction)
  async getNoLeidasCount(ctx: StateContext<NotificacionModelState>, action: GetNoLeidasCountAction) {
    try {
      const response: any = await lastValueFrom(this.notificacionService.getNoLeidasCount(action.payload.docenteId));
      const count = typeof response === 'number' ? response : (response?.count || 0);
      ctx.patchState({ noLeidasCount: count });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
  }

  @Action(MarcarComoLeidaAction)
  async marcarComoLeida(ctx: StateContext<NotificacionModelState>, action: MarcarComoLeidaAction) {
    try {
      await lastValueFrom(this.notificacionService.marcarComoLeida(action.payload.notificacionId));
      ctx.dispatch(new GetNotificacionesAction({ docenteId: action.payload.docenteId }));
      ctx.dispatch(new GetNoLeidasCountAction({ docenteId: action.payload.docenteId }));
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Notificación marcada como leída' });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
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

  @Action(GetNotificacionesAlumnoAction)
  async getNotificacionesAlumno(ctx: StateContext<NotificacionModelState>, action: GetNotificacionesAlumnoAction) {
    ctx.patchState({ loading: true, error: false, errorMessage: '' });
    try {
      const notificaciones = await lastValueFrom(this.notificacionService.getByAlumno(action.payload.alumnoId));
      ctx.patchState({ notificaciones, loading: false });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
      ctx.patchState({ loading: false });
    }
  }

  @Action(GetNoLeidasCountAlumnoAction)
  async getNoLeidasCountAlumno(ctx: StateContext<NotificacionModelState>, action: GetNoLeidasCountAlumnoAction) {
    try {
      const response: any = await lastValueFrom(this.notificacionService.getNoLeidasCountAlumno(action.payload.alumnoId));
      const count = typeof response === 'number' ? response : (response?.count || 0);
      ctx.patchState({ noLeidasCount: count });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
  }

  @Action(MarcarComoLeidaAlumnoAction)
  async marcarComoLeidaAlumno(ctx: StateContext<NotificacionModelState>, action: MarcarComoLeidaAlumnoAction) {
    try {
      await lastValueFrom(this.notificacionService.marcarComoLeida(action.payload.notificacionId));
      ctx.dispatch(new GetNotificacionesAlumnoAction({ alumnoId: action.payload.alumnoId }));
      ctx.dispatch(new GetNoLeidasCountAlumnoAction({ alumnoId: action.payload.alumnoId }));
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Notificación marcada como leída' });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
  }
}
