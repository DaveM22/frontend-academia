import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MateriaPageModelState } from "../../modelstate/pages/materia.modelstate";
import { GetByIdMateriaAction, PutMateriaAction, PostMateriaAction, GetMateriasAction, GetByIdForInscripcion } from "../../actions/api/materia.action";
import { PlanService } from "../../../services/plan.service";
import { lastValueFrom } from "rxjs";
import { MateriaService } from "../../../services/materia.service";
import { MateriaModelState } from "../../modelstate/api/materia.modelstate";
import { AsignMateriaAction } from "../../actions/pages/materia.action";
import { MessageService } from "primeng/api";

@State<MateriaModelState>({
  name: 'materias',
  defaults: {
    materias:[],
    error: false,
    loading:false
  }
})

@Injectable()
export class MateriaState {

  constructor(private service: MateriaService) {}


  @Selector()
  static getMaterias(state: MateriaModelState) {
    return state.materias;
  }

  @Action(GetMateriasAction)
  async getMateriasAction(ctx: StateContext<MateriaModelState>, action: GetMateriasAction) {
    ctx.patchState({ error: false })
    try {
      const response = await lastValueFrom(this.service.getMateria(action.filter));
      ctx.patchState({
        materias:[...response],
        loading:false,
        error:false
    })
    }
    catch (error) {
      ctx.patchState({ error: true })
    }
  }

  @Action(GetByIdForInscripcion)
  async getByIdForInscripcion(ctx: StateContext<MateriaModelState>, action: GetByIdForInscripcion){
    ctx.patchState({ error: false, loading:true })
    try {
      const response = await lastValueFrom(this.service.getForInscripcion(action.filters));
      ctx.patchState({
        materias:[...response],
    })
    }
    catch (error) {
      ctx.patchState({ error: true })
    }
    finally{
      ctx.patchState({
        loading:false
      })
    }
  }





  @Action(PostMateriaAction)
  async postMateriaAction(ctx: StateContext<MateriaModelState>, action: PostMateriaAction) {
    ctx.patchState({ error: false })
    try {
      await lastValueFrom(this.service.postMateria(action.materia));
    }
    catch (error) {
      ctx.patchState({ error: true })
    }

  }

  @Action(GetByIdMateriaAction)
  async getByIdMateriaAction(ctx: StateContext<MateriaModelState>, action: GetByIdMateriaAction) {
    ctx.patchState({ error: false })
    try {
      const response = await lastValueFrom(this.service.getById(action.id));
      console.log(response);
      await lastValueFrom(ctx.dispatch(new AsignMateriaAction(response)));
    }
    catch (error) {
      ctx.patchState({ error: true })
    }
  }

  @Action(PutMateriaAction)
  async putMateriaAction(ctx: StateContext<MateriaModelState>, action: PutMateriaAction) {
    ctx.patchState({ error: false })
    try {
      const response = await lastValueFrom(this.service.putMateria(action.materia));
      await lastValueFrom(ctx.dispatch(new AsignMateriaAction(response)));
    }
    catch (error) {
      ctx.patchState({ error: true })
    }
  }

}
