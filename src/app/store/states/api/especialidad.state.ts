import { Injectable, Signal } from "@angular/core";
import { Action, Selector, State, StateContext, createSelector, ofActionDispatched } from '@ngxs/store';

import { DeleteEspecialidadAction, GetByIdEspecialidadAction, GetEspecialidadAction, PostEspecialidadAction, PutEspecialidadAction } from "../../actions/api/especialidad.action";
import { EspecialidadService } from "../../../services/especialidad.service";
import { lastValueFrom } from "rxjs";
import { Especialidad } from "../../../entities/especialidad";
import {ErrorStateHandler } from "../../../util/ErrorStateHandler";
import { AsignSelectedEspecialidad } from "../../actions/pages/especialidad.action";
import { MessageService } from "primeng/api";
import { EspecialidadModelState } from "../../modelstate/api/especialidad.modelstate";

@State<EspecialidadModelState>({
    name: 'especialidades',
    defaults:{
        especialidades:[],
        loading:true,
        error:false,
        errorMessage:'',
    }
  })

@Injectable()
export class EspecialidadState{

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

    constructor(private service: EspecialidadService){

    }

    @Action(GetEspecialidadAction)
    async getEspecialidadAction(ctx: StateContext<EspecialidadModelState>, action: GetEspecialidadAction){
      ctx.patchState({loading:true, error:false})
      try{
        const response = await lastValueFrom(this.service.getEspecialidades());
        ctx.patchState({
          especialidades: response
        })
      }
      catch(error:any){
        ErrorStateHandler.handleError(error, ctx);
      }
      finally{
        ctx.patchState({loading:false})
      }

    }

    @Action(PostEspecialidadAction)
    async postEspecialidadAction(ctx: StateContext<EspecialidadModelState>, action: PostEspecialidadAction){
      try{
        const response = await lastValueFrom(this.service.postEspecialidad(action.especialidad));
        const list = ctx.getState().especialidades;
        ctx.patchState({
          especialidades: [...list,response]
        })
      }
      catch(error:any){
        let errorMsg = ''
        if(error.status === 409){
          errorMsg = error.error.filter()
        }
        ctx.patchState({error: true, errorMessage: ''})
      }
    }

    @Action(GetByIdEspecialidadAction)
    async getByIdEspecialidad(ctx: StateContext<EspecialidadModelState>, action: GetByIdEspecialidadAction){
      const response = await lastValueFrom(this.service.getByIdEspecialidad(action.id));
      ctx.dispatch(new AsignSelectedEspecialidad(response));
    }

    @Action(PutEspecialidadAction)
    async putEspecialidad(ctx: StateContext<EspecialidadModelState>, action: PutEspecialidadAction){
      const response = await lastValueFrom(this.service.putEspecialidad(action.especialdiad));
      
      const updatedEspecialidades = ctx.getState().especialidades.map(item => item = 
        item._id === response._id ? response : item
      );
      console.log(updatedEspecialidades)
      ctx.patchState({
        especialidades:updatedEspecialidades
      })

    }

    @Action(DeleteEspecialidadAction)
    async deleteEspecialidadAction(ctx: StateContext<EspecialidadModelState>, action: DeleteEspecialidadAction){
      ctx.patchState({
        error:false,
        errorMessage:''
      })
      try{
        await lastValueFrom(this.service.deleteEspecialidad(action.id));
        ctx.patchState({
          especialidades: ctx.getState().especialidades.filter(x => x._id !== action.id)   
        })
      }
      catch(error: any){
        console.log(error)
        ctx.patchState({
          error:true,
          errorMessage: error.error.error
        })
      }
    }


    

 

}