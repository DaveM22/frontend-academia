import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { DashboardService } from '../../../services/dashboard.service';
import { GetDashboardProfesorTotalesAction } from '../../actions/api/dashboard-profesor.action';
import { DashboardProfesorModelState } from '../../modelstate/api/dashboard-profesor.modelstate';
import { ErrorStateHandler } from '../../../util/ErrorStateHandler';

@State<DashboardProfesorModelState>({
  name: 'dashboardProfesor',
  defaults: {
    catedrasAsignadas: 0,
    cursosActivos: 0,
    inscripcionesEnRevision: 0,
    loading: true,
    error: false,
    errorMessage: ''
  }
})
@Injectable()
export class DashboardProfesorState {
  constructor(private service: DashboardService) {}

  @Selector()
  static getLoading(state: DashboardProfesorModelState) { return state.loading; }

  @Selector()
  static getCatedrasAsignadas(state: DashboardProfesorModelState) { return state.catedrasAsignadas; }

  @Selector()
  static getCursosActivos(state: DashboardProfesorModelState) { return state.cursosActivos; }

  @Selector()
  static getInscripcionesEnRevision(state: DashboardProfesorModelState) { return state.inscripcionesEnRevision; }

  @Action(GetDashboardProfesorTotalesAction)
  async getTotales(ctx: StateContext<DashboardProfesorModelState>, action: GetDashboardProfesorTotalesAction) {
    ctx.patchState({ loading: true, error: false, errorMessage: '' });
    try {
      const response = await lastValueFrom(this.service.getProfesorTotales(action.profesorId));
      ctx.patchState({
        catedrasAsignadas: response.catedras.asignadas,
        cursosActivos: response.cursos.activos,
        inscripcionesEnRevision: response.inscripciones.enRevision,
      });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    } finally {
      ctx.patchState({ loading: false });
    }
  }
}
