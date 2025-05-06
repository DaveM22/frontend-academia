import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PlanModelState } from "../../modelstate/pages/plan.page.modelstate";
import { AsignSelectedPlan, ClearSelectedPlan, ShowModalDelete } from "../../actions/pages/plan.action";

@State<PlanModelState>({
    name: 'planesPage',
    defaults:{
        showModalDelete:false,
        planSelected:null,
        context:null
    }
  })

  @Injectable()
  export class PlanPageState{

    @Selector()
    static getShowModalDelete(state: PlanModelState){
        return state.showModalDelete;
    }

    @Selector()
    static getPlanSelected(state: PlanModelState){
        return state.planSelected;
    }

    @Action(ShowModalDelete)
    showModalDelete(ctx:StateContext<PlanModelState>, action: ShowModalDelete){
        return ctx.patchState({
            showModalDelete:action.show
        })
    }

    @Action(AsignSelectedPlan)
    asignPlan(ctx:StateContext<PlanModelState>, action:AsignSelectedPlan){
        ctx.patchState({
            planSelected: action.plan!,
            context:action.context
        });
    }

    @Action(ClearSelectedPlan)
    clearPlan(ctx:StateContext<PlanModelState>, action:ClearSelectedPlan){
        return ctx.patchState({
            planSelected: null
        })
    }

  }
