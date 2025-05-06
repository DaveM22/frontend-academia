import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EspecialidadPageModelState } from "../../modelstate/pages/especialidad.modelstate";
import { Injectable, booleanAttribute } from "@angular/core";
import { AsignSelectedEspecialidad, ClearSelectedEspecialidad, ShowModalDelete } from "../../actions/pages/especialidad.action";

@State<EspecialidadPageModelState>({
    name: 'especialidadesPage',
    defaults:{
        showModalDelete:false,
        especialidadSelected:null,
        context:null
    }
  })

  @Injectable()
  export class EspecialidadPageState{

    @Selector()
    static getShowModalDelete(state: EspecialidadPageModelState){
        return state.showModalDelete;
    }

    @Selector()
    static getEspecialidadSelected(state: EspecialidadPageModelState){
        return state.especialidadSelected;
    }


    @Action(ShowModalDelete)
    showModalDelete(ctx:StateContext<EspecialidadPageModelState>, action: ShowModalDelete){
        return ctx.patchState({
            showModalDelete:action.show
        })
    }

    @Action(AsignSelectedEspecialidad)
    asignEspecialidad(ctx:StateContext<EspecialidadPageModelState>, action:AsignSelectedEspecialidad){
        return ctx.patchState({
            especialidadSelected: action.especialidad!,
            context:action.context
        })
    }

    @Action(ClearSelectedEspecialidad)
    clearEspecialidad(ctx:StateContext<EspecialidadPageModelState>, action:ClearSelectedEspecialidad){
        return ctx.patchState({
            especialidadSelected: null
        })
    }


  }
