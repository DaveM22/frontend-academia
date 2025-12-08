import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { DashboardService } from '../../../services/dashboard.service';
import { GetDashboardTotalesAction } from '../../actions/api/dashboard.action';
import { DashboardModelState } from '../../modelstate/api/dashboard.modelstate';
import { ErrorStateHandler } from '../../../util/ErrorStateHandler';

@State<DashboardModelState>({
  name: 'dashboard',
  defaults: {
    alumnosTotalRegistrados: 0,
    profesoresTotalActivos: 0,
    cursosCicloActual: 0,
    inscripcionesProcesadasEsteMes: 0,
    loading: true,
    error: false,
    errorMessage: ''
  }
})
@Injectable()
export class DashboardState {
  constructor(private service: DashboardService) {}

  @Selector()
  static getLoading(state: DashboardModelState) { return state.loading; }

  @Selector()
  static getAlumnosTotalRegistrados(state: DashboardModelState) { return state.alumnosTotalRegistrados; }

  @Selector()
  static getProfesoresTotalActivos(state: DashboardModelState) { return state.profesoresTotalActivos; }

  @Selector()
  static getCursosCicloActual(state: DashboardModelState) { return state.cursosCicloActual; }

  @Selector()
  static getInscripcionesProcesadasEsteMes(state: DashboardModelState) { return state.inscripcionesProcesadasEsteMes; }

  @Action(GetDashboardTotalesAction)
  async getDashboardTotales(ctx: StateContext<DashboardModelState>) {
    ctx.patchState({ loading: true, error: false, errorMessage: '' });
    try {
      const response = await lastValueFrom(this.service.getTotales());
      ctx.patchState({
        alumnosTotalRegistrados: response.alumnos.totalRegistrados,
        profesoresTotalActivos: response.profesores.totalActivos,
        cursosCicloActual: response.cursos.cicloActual,
        inscripcionesProcesadasEsteMes: response.inscripciones.procesadasEsteMes,
      });
    } catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    } finally {
      ctx.patchState({ loading: false });
    }
  }
}
