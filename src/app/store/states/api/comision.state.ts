import { Injectable } from "@angular/core";
import { ComisionModelState } from "../../modelstate/api/comision.modelstate";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DeleteComisionAction, GetByIdComisionAction, GetComision, PostComisionAction, PutComisionAction } from "../../actions/api/comision.action";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";
import { lastValueFrom } from "rxjs";
import { ComisionService } from "../../../services/comision.service";
import { AsignComisionAction } from "../../actions/pages/comision.action";
import { ComisionFilter } from "../../../entities/filter";

@State<ComisionModelState>({
    name: 'comisiones',
    defaults: {
        comisiones: [],
        loading: true,
        error: false,
        errorMessage: '',
    }
})

@Injectable()
export class ComisionState {
    @Selector()
    static getComisiones(state: ComisionModelState) {
        return state.comisiones;
    }

    @Selector()
    static getLoading(state: ComisionModelState) {
        return state.loading;
    }

    @Selector()
    static getError(state: ComisionModelState) {
        return state.error;
    }

    @Selector()
    static getErrorMessage(state: ComisionModelState) {
        return state.errorMessage;
    }

    constructor(private service:ComisionService){}

    @Action(GetComision)
    async getComision(ctx:StateContext<ComisionModelState>, action:GetComision){
        ctx.patchState({loading:true, error:false})
        try{
          const response = await lastValueFrom(this.service.get(action.filter));
          ctx.patchState({
              comisiones:[...response],
              loading:false,
              error:false
          })
        }
        catch(error:any){
          ErrorStateHandler.handleError(error, ctx);
        }
        finally{
          ctx.patchState({loading:false})
        }
    }

    @Action(GetByIdComisionAction)
    async getByIdComision(ctx: StateContext<ComisionModelState>, action: GetByIdComisionAction){

      ctx.patchState({loading:true, error:false})
      try{
        const response = await lastValueFrom(this.service.getById(action.id));
        ctx.dispatch(new AsignComisionAction(response));
      }
      catch(error:any){
        ErrorStateHandler.handleError(error, ctx);
      }
      finally{
        ctx.patchState({loading:false})
      }

    }

    @Action(PostComisionAction)
    async postComisionAction(ctx:StateContext<ComisionModelState>, action: PostComisionAction){
        const response = await lastValueFrom(this.service.post(action.comision))
        const list = ctx.getState().comisiones;
        ctx.patchState({
          comisiones: [...list,response]
        })
    }

    @Action(PutComisionAction)
    async putComision(ctx: StateContext<ComisionModelState>, action: PutComisionAction){
      const response = await lastValueFrom(this.service.put(action.comision));
      const updatedEspecialidades = ctx.getState().comisiones.map(item =>
        item._id === response._id ? response : item
      );

      ctx.patchState({
        comisiones:updatedEspecialidades
      })

    }

    @Action(DeleteComisionAction)
    async deleteComision(ctx:StateContext<ComisionModelState>, action: DeleteComisionAction){
      ctx.patchState({ error: false })
      try {
        await lastValueFrom(this.service.delete(action.id));
        let filter = new ComisionFilter();
        filter.mostrarPlan = true;
        ctx.dispatch(new GetComision(filter));
        ctx.patchState({
          comisiones: ctx.getState().comisiones.filter(x => x._id !== action.id)   
        })
      }
      catch (error:any) {
        console.log(error)
        ctx.patchState({ error: true })
        ctx.patchState({
          error:true,
          errorMessage: error.error.error
        })
      }
    }

}