import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EspecialidadModelState } from "../../modelstate/pages/especialidad.modelstate";
import { Injectable, booleanAttribute } from "@angular/core";
import { AsignSelectedEspecialidad, ClearSelectedEspecialidad, ShowModalDelete } from "../../actions/pages/especialidad.action";

@State<EspecialidadModelState>({
    name: 'especialidadesPage',
    defaults:{
        showModalDelete:false,
        especialidadSelected:null
    }
  })

  @Injectable()
  export class EspecialidadPageState{

    @Selector()
    static getShowModalDelete(state: EspecialidadModelState){
        return state.showModalDelete;
    }

    @Selector()
    static getEspecialidadSelected(state: EspecialidadModelState){
        return state.especialidadSelected;
    }


    @Action(ShowModalDelete)
    showModalDelete(ctx:StateContext<EspecialidadModelState>, action: ShowModalDelete){
        return ctx.patchState({
            showModalDelete:action.show
        })
    }

    @Action(AsignSelectedEspecialidad)
    asignEspecialidad(ctx:StateContext<EspecialidadModelState>, action:AsignSelectedEspecialidad){
        return ctx.patchState({
            especialidadSelected: action.especialidad!
        })
    }

    @Action(ClearSelectedEspecialidad)
    clearEspecialidad(ctx:StateContext<EspecialidadModelState>, action:ClearSelectedEspecialidad){
        return ctx.patchState({
            especialidadSelected: null
        })
    }


  }
