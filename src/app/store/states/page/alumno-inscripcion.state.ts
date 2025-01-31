import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AlumnoInscripcionPageModelState } from "../../modelstate/pages/alumno-inscripcion.modelstate";
import { Injectable } from "@angular/core";
import { AsignAlumnoInscripcionAction, ClearAlumnoInscripcionAction } from "../../actions/pages/alumno-inscripcion.action";

@State<AlumnoInscripcionPageModelState>({
    name: 'alumnoInscripcionPage',
    defaults:{
        showModalDelete:false,
        alumnoInscripcionSelected:null
    }
  })

  @Injectable()
  export class AlumnoInscripcionPageState{


    @Selector()
    static getAlumnoInscripcionSelected(state: AlumnoInscripcionPageModelState){
        return state.alumnoInscripcionSelected;
    }

    @Action(AsignAlumnoInscripcionAction)
    asignAlumnoInscripcion(ctx:StateContext<AlumnoInscripcionPageModelState>, action:AsignAlumnoInscripcionAction){
        return ctx.patchState({
            alumnoInscripcionSelected: action.inscripcion!
        })
    }

    @Action(ClearAlumnoInscripcionAction)
    clearAlumnoInscripcion(ctx:StateContext<AlumnoInscripcionPageModelState>, action:ClearAlumnoInscripcionAction){
        return ctx.patchState({
           alumnoInscripcionSelected: null
        })
    }

  }