import { Injectable } from "@angular/core";
import { Action, Select, Selector, State, StateContext } from "@ngxs/store";
import { PlanModelState } from "../../modelstate/api/plan.modelstate";
import { ClearPlanes, GenerateReport, GetByIdPlanAction, GetByIdPlanForCursoAction, GetPlanAction, GetPlanByIdWithMateriasAction, GetPlanesByEspecialidad, PostPlanAction, PutPlanAction } from "../../actions/api/planes.action";
import { lastValueFrom } from "rxjs";
import { PlanService } from "../../../services/plan.service";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";
import { AsignSelectedEspecialidad } from "../../actions/pages/especialidad.action";
import { AsignSelectedPlan } from "../../actions/pages/plan.action";
import { saveAs } from 'file-saver';
@State<PlanModelState>({
    name: 'planes',
    defaults:{
        planes:[],
        planSelected:null,
        loading:true,
        error:false,
        errorMessage:''
    }
  })

@Injectable()
export class PlanState{
    @Selector()
    static getPlanes(state: PlanModelState) {
      return state.planes;
    }

    @Selector()
    static getLoading(state: PlanModelState) {
      return state.loading;
    }

    @Selector()
    static getError(state: PlanModelState) {
      return state.error;
    }

    @Selector()
    static getErrorMessage(state: PlanModelState) {
      return state.errorMessage;
    }

    @Selector()
    static getPlanSelected(state: PlanModelState){
      return state.planSelected;
    }


    constructor(private service: PlanService){

    }

    @Action(GetPlanAction)
    async getPlanAction(ctx: StateContext<PlanModelState>, action: GetPlanAction){
      ctx.patchState({loading:true, error:false})
      try{
        const response = await lastValueFrom(this.service.getPlanes(action.filter));
        ctx.patchState({
            planes:[...response],
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

    @Action(ClearPlanes)
    clearPlanes(ctx: StateContext<PlanModelState>, action: ClearPlanes){
      ctx.patchState({
        planes:[]
      })
    }

    @Action(PostPlanAction)
    async postPlanAction(ctx: StateContext<PlanModelState>, action: PostPlanAction){
      try{
        const response = await lastValueFrom(this.service.postPlan(action.plan));
        ctx.patchState({
            planSelected: response,
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

    @Action(PutPlanAction)
    async putPlanAction(ctx: StateContext<PlanModelState>, action: PutPlanAction){
      try{
        const response = await lastValueFrom(this.service.putPlan(action.plan));
        ctx.patchState({
            planSelected: response,
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

    @Action(GetByIdPlanAction)
    async getByIdPlanAction(ctx: StateContext<PlanModelState>, action: GetByIdPlanAction){
      ctx.patchState({loading:true, error:false});
      try{
        const response = await lastValueFrom(this.service.getPlanById(action.id, action.filter));
        ctx.dispatch(new AsignSelectedPlan(response));
        ctx.patchState({
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

    @Action(GetByIdPlanForCursoAction)
    async getByIdPlanForCursoAction(ctx: StateContext<PlanModelState>, action: GetByIdPlanForCursoAction){
      ctx.patchState({loading:true, error:false});
      try{
        const response = await lastValueFrom(this.service.getPlanByIdForCurso(action.id));
        ctx.dispatch(new AsignSelectedPlan(response));
        ctx.patchState({
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

    

    @Action(GetPlanByIdWithMateriasAction)
    async getPlanByIdWithMaterias(ctx: StateContext<PlanModelState>, action:GetPlanByIdWithMateriasAction){
      ctx.patchState({loading:true, error:false});
      try{
        const response = await lastValueFrom(this.service.getPlanByIdMaterias(action.id));
        ctx.patchState({
            planSelected: response,
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

    @Action(GetPlanesByEspecialidad)
    async getPlanesByEspecialidad(ctx: StateContext<PlanModelState>, action: GetPlanesByEspecialidad){
      ctx.patchState({loading:true, error:false});
      try{
        const response = await lastValueFrom(this.service.getPlanesByEspecialidad(action.idEspecialidad));
        ctx.patchState({
            planes: response,
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

    @Action(GenerateReport)
    async generateReport(ctx: StateContext<PlanModelState>, action: GenerateReport){
      const reponse = await lastValueFrom(this.service.generateReport(action.id));
      const filename = 'reporte.pdf'; // El nombre con el que se descargará el archivo
      saveAs(reponse, filename);
    }
}