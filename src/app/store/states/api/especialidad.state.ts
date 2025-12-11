import { Injectable, Signal } from "@angular/core";
import { Action, Selector, State, StateContext, createSelector, ofActionDispatched } from '@ngxs/store';

import { DeleteEspecialidadAction, GetByIdEspecialidadAction, GetEspecialidadAction, PostEspecialidadAction, PutEspecialidadAction } from "../../actions/api/especialidad.action";
import { EspecialidadService } from "../../../services/especialidad.service";
import { lastValueFrom } from "rxjs";
import { Especialidad } from "../../../entities/especialidad";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";
import { AsignSelectedEspecialidad } from "../../actions/pages/especialidad.action";
import { MessageService } from "primeng/api";
import { EspecialidadModelState } from "../../modelstate/api/especialidad.modelstate";
import { LoadingForm } from "../../actions/pages/app.action";

@State<EspecialidadModelState>({
  name: 'especialidades',
  defaults: {
    especialidades: [],
    loading: true,
    error: false,
    errorMessage: '',
  }
})

@Injectable()
export class EspecialidadState {

  @Selector()
  static getEspecialidades(state: EspecialidadModelState) {
    return state.especialidades;
  }

  @Selector()
  static getLoading(state: EspecialidadModelState) {
    return state.loading;
  }

  @Selector()
  static getError(state: EspecialidadModelState) {
    return state.error;
  }

  @Selector()
  static getErrorMessage(state: EspecialidadModelState) {
    return state.errorMessage;
  }

  constructor(private service: EspecialidadService) {

  }

  @Action(GetEspecialidadAction)
  async getEspecialidadAction(ctx: StateContext<EspecialidadModelState>, action: GetEspecialidadAction) {
    ctx.patchState({ error: false })
    ctx.dispatch(new LoadingForm(true));
    try {
      const response = await lastValueFrom(this.service.getEspecialidades());
      ctx.patchState({
        especialidades: response
      })
    }
    catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
    finally {

      ctx.dispatch(new LoadingForm(false));
    }

  }

  @Action(PostEspecialidadAction)
  async postEspecialidadAction(ctx: StateContext<EspecialidadModelState>, action: PostEspecialidadAction) {
    ctx.patchState({ error: false })
    ctx.dispatch(new LoadingForm(true));
    try {
      const response = await lastValueFrom(this.service.postEspecialidad(action.especialidad));
      const list = ctx.getState().especialidades;
      ctx.patchState({
        especialidades: [...list, response]
      })
    }
    catch (error: any) {
      let errorMsg = ''
      if (error.status === 409) {
        errorMsg = error.error.filter()
      }
      ctx.patchState({ error: true, errorMessage: '' })
    }
    finally {
      ctx.dispatch(new LoadingForm(false));
    }
  }

  @Action(GetByIdEspecialidadAction)
  async getByIdEspecialidad(ctx: StateContext<EspecialidadModelState>, action: GetByIdEspecialidadAction) {
    ctx.patchState({ error: false })
    ctx.dispatch(new LoadingForm(true));
    try {
      const response = await lastValueFrom(this.service.getByIdEspecialidad(action.id));
      ctx.dispatch(new AsignSelectedEspecialidad(response));
    }
    catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
    finally {
      ctx.dispatch(new LoadingForm(false));
    }

  }

  @Action(PutEspecialidadAction)
  async putEspecialidad(ctx: StateContext<EspecialidadModelState>, action: PutEspecialidadAction) {
    ctx.patchState({ error: false })
    ctx.dispatch(new LoadingForm(true));
    try {
      const response = await lastValueFrom(this.service.putEspecialidad(action.especialdiad));

      const updatedEspecialidades = ctx.getState().especialidades.map(item => item =
        item._id === response._id ? response : item
      );
      ctx.patchState({
        especialidades: updatedEspecialidades
      })
    }
    catch (error: any) {
      ctx.patchState({ error: true, errorMessage: '' })
    }
    finally {
          ctx.dispatch(new LoadingForm(false));
    }
  }

  @Action(DeleteEspecialidadAction)
  async deleteEspecialidadAction(ctx: StateContext<EspecialidadModelState>, action: DeleteEspecialidadAction) {
    ctx.patchState({
      error: false,
      errorMessage: '',
    })
    ctx.dispatch(new LoadingForm(true));
    try {
      await lastValueFrom(this.service.deleteEspecialidad(action.id));
      ctx.patchState({
        especialidades: ctx.getState().especialidades.filter(x => x._id !== action.id)
      })
    }
    catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
    finally {
      ctx.dispatch(new LoadingForm(false));

    }
  }






}