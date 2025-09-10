import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AlumnoInscripcionModelState } from "../../modelstate/api/alumno-inscripcion.modelstate";
import { DeleteAlumnoInscripcionAction, GetInscripcionByCursoAction, GetOneAlumnoInscripcionAction, PostAlumnoInscripcionAction, PutAlumnoInscripcionAction } from "../../actions/api/alumno-inscripcion.action";
import { AlumnoInscripcionService } from "../../../services/alumno-inscripcion.service";
import { lastValueFrom } from "rxjs";
import { AsignAlumnoInscripcionAction } from "../../actions/pages/alumno-inscripcion.action";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";

@State<AlumnoInscripcionModelState>({
  name: 'alumno_inscripciones',
  defaults: {
    inscripciones: [],
    loading: true,
    error: false,
    errorMessage: ''

  }
})

@Injectable()
export class AlumnoInscripcionState {

  @Selector()
  static getLoading(state: AlumnoInscripcionModelState) {
    return state.loading;
  }

  @Selector()
  static getInscripciones(state: AlumnoInscripcionModelState) {
    return state.inscripciones;
  }

  constructor(private service: AlumnoInscripcionService) { }

  @Action(PostAlumnoInscripcionAction)
  async postAlumnoInscripcion(ctx: StateContext<AlumnoInscripcionModelState>, action: PostAlumnoInscripcionAction) {
    ctx.patchState({ loading: true, error: false })
    const response = await lastValueFrom(this.service.post(action.inscripcion));
    const list = ctx.getState().inscripciones;
    ctx.patchState({
      inscripciones: [...list, response],
      loading: false
    })
  }

  @Action(GetOneAlumnoInscripcionAction)
  async getOneAlumnoInscripcion(ctx: StateContext<AlumnoInscripcionModelState>, action: GetOneAlumnoInscripcionAction) {
    ctx.patchState({ loading: true, error: false })
    const response = await lastValueFrom(this.service.get(action.id));
    ctx.dispatch(new AsignAlumnoInscripcionAction(response));
    ctx.patchState({ loading: false, error: false })
  }

  @Action(GetInscripcionByCursoAction)
  async getInscripcionesByCurso(ctx: StateContext<AlumnoInscripcionModelState>, action: GetInscripcionByCursoAction) {
    ctx.patchState({ loading: true, error: false })
    try {
      const response = await lastValueFrom(this.service.getByCurso(action.cursoId));
      ctx.patchState({
        inscripciones: response
      });
    } catch (error) {
      ErrorStateHandler.handleError(error, ctx);
    }
    finally {
      ctx.patchState({ loading: false, error: false })
    }
  }

  @Action(PutAlumnoInscripcionAction)
  async putAlumnoInscripcion(ctx: StateContext<AlumnoInscripcionModelState>, action: PutAlumnoInscripcionAction) {
    ctx.patchState({ loading: true, error: false })
    const response = await lastValueFrom(this.service.put(action.id, action.alumnoInscripcion));

    const updatedAlumnoInscripcion = ctx.getState().inscripciones.map(item => item =
      item._id === response._id ? response : item
    );
    ctx.patchState({
      inscripciones: updatedAlumnoInscripcion,
      loading: false
    })

  }

  @Action(DeleteAlumnoInscripcionAction)
  async deleteComision(ctx: StateContext<AlumnoInscripcionModelState>, action: DeleteAlumnoInscripcionAction) {
    ctx.patchState({
      error: false,
      errorMessage: ''
    })
    try {
      await lastValueFrom(this.service.delete(action.id));
      ctx.patchState({
        inscripciones: ctx.getState().inscripciones.filter(x => x._id !== action.id)
      })
    }
    catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
  }
}