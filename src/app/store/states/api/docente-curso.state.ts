import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DocenteCursoModelState } from "../../modelstate/api/docente-curso.modelstate";
import { GetDocenteCursoAction  } from "../../actions/api/docente-curso.action";
import { lastValueFrom } from "rxjs";
import { DocenteCursoService } from "../../../services/docente-curso.service";

@State<DocenteCursoModelState>({
    name: 'docente_cursos',
    defaults: {
        docentes_cursos: [],
        loading: true,
        error: false,
        errorMessage: '',
    }
})

@Injectable()
export class DocenteCursoState {
    
    @Selector()
    static getDocentesCursos(state: DocenteCursoModelState){
        return state.docentes_cursos;
    }


    @Selector()
    static getLoading(state: DocenteCursoModelState) {
        return state.loading;
    }

    @Selector()
    static getError(state: DocenteCursoModelState) {
        return state.error;
    }

    constructor(private service:DocenteCursoService){}


    @Action(GetDocenteCursoAction)
    async getDocenteCurso(ctx:StateContext<DocenteCursoModelState>, action:GetDocenteCursoAction){
        try{
            const reponse = await lastValueFrom(this.service.get(action.filter))
        }
        catch(error){
            ctx.dispatch({error:true})
        }
        finally{
            ctx.patchState({
                loading:false
            })
        }
    }
}