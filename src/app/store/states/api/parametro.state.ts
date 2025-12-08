import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ParametroModelState } from "../../modelstate/api/parametros.modelstate";
import { Injectable } from "@angular/core";
import { EspecialidadModelState } from "../../modelstate/api/especialidad.modelstate";
import { GetByNombreParametroAction , GetParametrosAction, PutParametroAction } from "../../actions/api/parametros.action";
import { lastValueFrom } from "rxjs";
import { ParametroService } from "../../../services/parametro.service";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";
import { GeneralLoadingAction, LoadingForm } from "../../actions/pages/app.action";

@State<ParametroModelState>({
  name: 'parametros',
  defaults: {
    parametros:[],
    error: false,
    loading:false,
    errorMessage: '',
    parameterSelected: null
  }
})

@Injectable()
export class ParametroState 
{

  @Selector()
  static getParametros(state: ParametroModelState) {
    return state.parametros;
  }

  @Selector()
  static getLoading(state: ParametroModelState) {
    return state.loading;
  }

  @Selector()
  static getError(state: ParametroModelState) {
    return state.error;
  }

  @Selector()
  static getErrorMessage(state: ParametroModelState) {
    return state.errorMessage;
  }

  @Selector()
  static getParameterSelected(state: ParametroModelState) {
    return state.parameterSelected;
  }

    constructor(private service:ParametroService ) { }

  @Action(GetParametrosAction)
  async getParametrosAction(ctx: StateContext<ParametroModelState>, action: GetParametrosAction) {
    ctx.patchState({ error: false })
    ctx.dispatch(new LoadingForm(true));
    try {
      const response = await lastValueFrom(this.service.getall());
      ctx.patchState({
        parametros: response
      })
    }
    catch (error: any) {
      ErrorStateHandler.handleError(error, ctx);
    }
    finally {
      ctx.dispatch(new LoadingForm(false));
    }

  }

    @Action(PutParametroAction)
    async putParametro(ctx: StateContext<ParametroModelState>, action: PutParametroAction ) {
      ctx.patchState({ error: false })
          ctx.dispatch(new LoadingForm(true));
      try {
    const response = await lastValueFrom(this.service.edit(action.parametro));
    console.log(response);
    const updatedParametros = ctx.getState().parametros.map(item =>
      item._id === response._id ? response : item
    );

    ctx.patchState({
      parametros: updatedParametros
    });
      }
      catch (error: any) {
        ctx.patchState({ error: true, errorMessage: '' })
      }
      finally {
            ctx.dispatch(new LoadingForm(false));
      }
    }

    @Action(GetByNombreParametroAction)
    async getByNameParametro(ctx: StateContext<ParametroModelState>, action: GetByNombreParametroAction) {
        ctx.patchState({ loading: true, error: false })
        try {
            const response = await lastValueFrom(this.service.getByNombre(action.nombre));
            ctx.patchState({
                parameterSelected: response
            })
        }
        catch (error: any) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
                 ctx.patchState({ loading: false })
        }
    }

}
