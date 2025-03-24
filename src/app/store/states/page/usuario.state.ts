import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UsuarioModelState } from "../../modelstate/pages/usuario.modelstate";
import { AsignSelectedUsuario, ClearSelectedUsuario } from "../../actions/pages/usuario.action";


@State<UsuarioModelState>({
    name: 'usuariosPage',
    defaults:{
        showModalDelete:false,
        usuarioSelected:null
    }
  })

  @Injectable()
  export class UsuarioPageState{

     @Selector()
    static getShowModalDelete(state: UsuarioModelState){
        return state.showModalDelete;
    }

    @Selector()
    static getUsuarioSelected(state: UsuarioModelState){
        return state.usuarioSelected;
    }


    @Action(AsignSelectedUsuario)
    asignPlan(ctx:StateContext<UsuarioModelState>, action:AsignSelectedUsuario){
        return ctx.patchState({
            usuarioSelected: action.usuario!
        })
    }

    @Action(ClearSelectedUsuario)
    clearPlan(ctx:StateContext<UsuarioModelState>, action:ClearSelectedUsuario){
        return ctx.patchState({
            usuarioSelected: null
        })
    }
  }