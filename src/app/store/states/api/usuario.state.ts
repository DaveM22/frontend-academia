import { Injectable } from "@angular/core";
import { UsuarioModelState } from "../../modelstate/api/usuario.modelstate";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DeleteUsuarioAction, GetByIdUsuarioAction, GetUsuarioListaAction, PostUsuarioAction, PutUsuarioAction } from "../../actions/api/usuarios.action";
import { UsuarioService } from "../../../services/usuario.service";
import { lastValueFrom, Observable } from "rxjs";
import { Usuario } from "../../../entities/usuario";
import { AsignSelectedUsuario } from "../../actions/pages/usuario.action";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";

@State<UsuarioModelState>({
    name: 'usuarios',
    defaults:{
        usuarios:[],
        loading:true,
        error:false,
        errorMessage:''
    }
  })

@Injectable()
export class UsuarioState{

    @Selector()
    static getLoading(state: UsuarioModelState){
        return state.loading;
    }

    @Selector()
    static getError(state: UsuarioModelState){
        return state.error;
    }

    @Selector()
    static getErrorMessage(state: UsuarioModelState){
        return state.errorMessage;
    }
    
    @Selector()
    static getUsuarios(state: UsuarioModelState){
        return state.usuarios;
    }
    
    
    constructor(private service:UsuarioService){}

    @Action(GetUsuarioListaAction)
    async getUsuario(ctx:StateContext<UsuarioModelState>, action:GetUsuarioListaAction){
        ctx.patchState({loading:true})
        try{
            const response = await lastValueFrom(this.service.getUsuarios());
            ctx.patchState({
                usuarios:response
            })
        }
        catch(error){
            ctx.patchState({
                error:true
            })
        }
        finally
        {
            ctx.patchState({
                loading:false
            })
        }
    }

    @Action(GetByIdUsuarioAction)
    async getByIdUsuario(ctx:StateContext<UsuarioModelState>, action:GetByIdUsuarioAction){
        ctx.patchState({loading:true})
        try{
            const response = await lastValueFrom(this.service.getByIdUsuario(action.id));
            ctx.dispatch(new AsignSelectedUsuario(response));
        }
        catch(error){
            ctx.patchState({
                error:true
            })
        }
        finally
        {
            ctx.patchState({
                loading:false
            })
        }
    }

        @Action(DeleteUsuarioAction)
        async deletePlan(ctx: StateContext<UsuarioModelState>, action:DeleteUsuarioAction){
          ctx.patchState({loading:true, error:false});
          try{
            const response = await lastValueFrom(this.service.deleteUsuario(action.id));
            ctx.patchState({
              usuarios: ctx.getState().usuarios.filter(x => x._id !== action.id)
              
            })
          }
          catch(error:any){
            ErrorStateHandler.handleError(error, ctx);
          }
          finally{
            ctx.patchState({loading:false})
          }
        }

        @Action(PostUsuarioAction)
        async postPlanAction(ctx: StateContext<UsuarioModelState>, action: PostUsuarioAction){
          ctx.patchState({loading:true, error:false});
          try{
            const response = await lastValueFrom(this.service.postUsuario(action.usr));
          }
          catch(error:any){
            ErrorStateHandler.handleError(error, ctx);
          }
          finally{
            ctx.patchState({loading:false, error:false})
          }
        }

        @Action(PutUsuarioAction)
        async putUsuarioAction(ctx: StateContext<UsuarioModelState>, action: PutUsuarioAction){
          ctx.patchState({loading:true, error:false}); 
          try{
            const response = await lastValueFrom(this.service.putUsuario(action.usr));
          }
          catch(error:any){
            ErrorStateHandler.handleError(error, ctx);
          }
          finally{
            ctx.patchState({loading:false, error:false})
          }
        }
}

