import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { MateriaPageModelState } from "../../modelstate/pages/materia.modelstate";
import { GetByIdMateriaAction, PUtMateriaAction, PostMateriaAction } from "../../actions/api/materia.action";
import { PlanService } from "../../../services/plan.service";
import { lastValueFrom } from "rxjs";
import { MateriaService } from "../../../services/materia.service";
import { MateriaModelState } from "../../modelstate/api/materia.modelstate";
import { AsignMateriaAction } from "../../actions/pages/materia.action";
import { MessageService } from "primeng/api";

@State<MateriaModelState>({
    name: 'materias',
    defaults:{
        error: false
    }
  })

@Injectable()
export class MateriaState{
    
    constructor(private service:MateriaService){

    }


    @Action(PostMateriaAction)
    async postMateriaAction(ctx:StateContext<MateriaModelState>, action: PostMateriaAction){
      ctx.patchState({error:false})
      try{
        await lastValueFrom(await this.service.postMateria(action.materia));
      }
      catch(error){
        ctx.patchState({error:true})
      }

    }


    @Action(GetByIdMateriaAction)
    async getByIdMateriaAction(ctx:StateContext<MateriaModelState>, action: GetByIdMateriaAction){
      ctx.patchState({error:false})
      try{
        const response = await lastValueFrom(this.service.getById(action.id));
        console.log(response);
        await lastValueFrom(ctx.dispatch(new AsignMateriaAction(response)));
      }
      catch(error){
        ctx.patchState({error:true})
      }

    }

    @Action(PUtMateriaAction)
    async putMateriaAction(ctx:StateContext<MateriaModelState>, action: PUtMateriaAction){
      ctx.patchState({error:false})
      try{
        const response = await lastValueFrom(this.service.putMateria(action.materia));
        await lastValueFrom(ctx.dispatch(new AsignMateriaAction(response)));

      }
      catch(error){
        ctx.patchState({error:true})
      }

    }
}
