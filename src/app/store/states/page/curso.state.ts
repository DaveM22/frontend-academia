import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EspecialidadPageModelState } from "../../modelstate/pages/especialidad.modelstate";
import { Injectable, booleanAttribute } from "@angular/core";
import { AsignSelectedEspecialidad, ClearSelectedEspecialidad, ShowModalDelete } from "../../actions/pages/especialidad.action";
import { CursoPageModelState } from "../../modelstate/pages/curso.modelstate";
import { AsignSelectedCursoAction, ClearSelectedCursoAction } from "../../actions/pages/curso.action";

@State<CursoPageModelState>({
    name: 'cursoPage',
    defaults:{
        showModalDelete:false,
        cursoSelected:null
    }
  })

  @Injectable()
  export class CursoPageState{

    @Selector()
    static getShowModalDelete(state: CursoPageModelState){
        return state.showModalDelete;
    }

    @Selector()
    static getCursoSelected(state: CursoPageModelState){
        return state.cursoSelected;
    }


    @Action(ShowModalDelete)
    showModalDelete(ctx:StateContext<CursoPageModelState>, action: ShowModalDelete){
        return ctx.patchState({
            showModalDelete:action.show
        })
    }

    @Action(AsignSelectedCursoAction)
    asignEspecialidad(ctx:StateContext<CursoPageModelState>, action:AsignSelectedCursoAction){
        return ctx.patchState({
            cursoSelected: action.Curso!
        })
    }

    @Action(ClearSelectedCursoAction)
    clearEspecialidad(ctx:StateContext<CursoPageModelState>, action:ClearSelectedCursoAction){
        return ctx.patchState({
           cursoSelected: null
        })
    }


  }
