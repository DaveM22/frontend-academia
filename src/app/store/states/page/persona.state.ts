import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PersonaPageModelState } from "../../modelstate/pages/persona.modelstate";
import { ShowModalDelete } from "../../actions/pages/especialidad.action";
import { AsignSelectedAlumno, AsignSelectedPersona, ClearSelectedAlumno, ClearSelectedPersona } from "../../actions/pages/persona.action";

@State<PersonaPageModelState>({
    name: 'personasPage',
    defaults:{
        showModalDelete:false,
        personaSelected:null,
        alumnoSelected:null
    }
  })

  @Injectable()
  export class PersonaPageState {

    @Selector()
    static getShowModalDelete(state: PersonaPageModelState){
        return state.showModalDelete;
    }

    @Selector()
    static getPersonaSelected(state: PersonaPageModelState){
        return state.personaSelected;
    }

    @Selector()
    static getAlumnoSelected(state: PersonaPageModelState){
        return state.alumnoSelected;
    }


    @Action(ShowModalDelete)
    showModalDelete(ctx:StateContext<PersonaPageModelState>, action: ShowModalDelete){
        return ctx.patchState({
            showModalDelete:action.show
        })
    }

    @Action(AsignSelectedPersona)
    asignPersona(ctx:StateContext<PersonaPageModelState>, action:AsignSelectedPersona){
        return ctx.patchState({
            personaSelected: action.persona!
        })
    }

    @Action(ClearSelectedPersona)
    clearPersona(ctx:StateContext<PersonaPageModelState>, action:ClearSelectedPersona){
        return ctx.patchState({
            personaSelected: null
        })
    }

    @Action(AsignSelectedAlumno)
    asignAlumno(ctx:StateContext<PersonaPageModelState>, action:AsignSelectedAlumno){
        return ctx.patchState({
            alumnoSelected: action.alumno!
        })
    }

    @Action(ClearSelectedAlumno)
    clearAlumno(ctx:StateContext<PersonaPageModelState>, action:ClearSelectedAlumno){
        return ctx.patchState({
            alumnoSelected: null
        })
    }
  }
