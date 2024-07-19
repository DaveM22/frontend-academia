import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AlumnoInscripcionModelState } from "../../modelstate/api/alumno-inscripcion.modelstate";
import { PostAlumnoInscripcion } from "../../actions/api/alumno-inscripcion.action";
import { AlumnoInscripcionService } from "../../../services/alumno-inscripcion.service";
import { lastValueFrom } from "rxjs";

@State<AlumnoInscripcionModelState>({
    name: 'alumno_inscripciones',
    defaults: {
        inscripciones: [],
        loading: true,
        error: false,

    }
})

@Injectable()
export class AlumnoInscripcionState {
    

    constructor(private service:AlumnoInscripcionService){}

    @Action(PostAlumnoInscripcion)
    async postAlumnoInscripcion(ctx:StateContext<AlumnoInscripcionModelState>, action: PostAlumnoInscripcion){
        const response = await lastValueFrom(this.service.post(action.inscripcion));
        const list = ctx.getState().inscripciones;
        ctx.patchState({
          inscripciones: [...list,response]
        })
    }
}