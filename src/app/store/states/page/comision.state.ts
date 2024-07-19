import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ComisionPageModelState } from "../../modelstate/pages/comision.modelstate";
import { AsignComisionAction, ClearComisionAction } from "../../actions/pages/comision.action";

@State<ComisionPageModelState>({
    name: 'comisionPage',
    defaults:{
        showModalDelete:false,
        comisionSelected:null
    }
  })

  @Injectable()
  export class ComisionPageState{


    @Selector()
    static getComisionSelected(state: ComisionPageModelState){
        return state.comisionSelected;
    }




    @Action(AsignComisionAction)
    asignEspecialidad(ctx:StateContext<ComisionPageModelState>, action:AsignComisionAction){
        return ctx.patchState({
            comisionSelected: action.comision!
        })
    }

    @Action(ClearComisionAction)
    clearEspecialidad(ctx:StateContext<ComisionPageModelState>, action:ClearComisionAction){
        return ctx.patchState({
           comisionSelected: null
        })
    }

  }