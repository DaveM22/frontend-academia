import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AlumnoInscripcionModelState } from "../../modelstate/api/alumno-inscripcion.modelstate";
import { DeleteAlumnoInscripcionAction, GetOneAlumnoInscripcionAction, PostAlumnoInscripcionAction, PutAlumnoInscripcionAction } from "../../actions/api/alumno-inscripcion.action";
import { AlumnoInscripcionService } from "../../../services/alumno-inscripcion.service";
import { lastValueFrom } from "rxjs";
import { AsignAlumnoInscripcionAction } from "../../actions/pages/alumno-inscripcion.action";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";

@State<AlumnoInscripcionModelState>({
    name: 'alumno_inscripciones',
    defaults: {
        inscripciones: [],
        loading: true,
        error: false,
        errorMessage:''

    }
})

@Injectable()
export class AlumnoInscripcionState {
    

    constructor(private service:AlumnoInscripcionService){}

    @Action(PostAlumnoInscripcionAction)
    async postAlumnoInscripcion(ctx:StateContext<AlumnoInscripcionModelState>, action: PostAlumnoInscripcionAction){
        const response = await lastValueFrom(this.service.post(action.inscripcion));
        const list = ctx.getState().inscripciones;
        ctx.patchState({
          inscripciones: [...list,response]
        })
    }

    @Action(GetOneAlumnoInscripcionAction)
    async getOneAlumnoInscripcion(ctx:StateContext<AlumnoInscripcionModelState>, action: GetOneAlumnoInscripcionAction){
        const response = await lastValueFrom(this.service.get(action.id));
        ctx.dispatch(new AsignAlumnoInscripcionAction(response));
    }

    @Action(PutAlumnoInscripcionAction)
    async putAlumnoInscripcion(ctx:StateContext<AlumnoInscripcionModelState>, action: PutAlumnoInscripcionAction){
        const response = await lastValueFrom(this.service.put(action.id,action.alumnoInscripcion));

        const updatedAlumnoInscripcion = ctx.getState().inscripciones.map(item => item = 
          item._id === response._id ? response : item
        );
        ctx.patchState({
          inscripciones:updatedAlumnoInscripcion 
        })
  
    }

    @Action(DeleteAlumnoInscripcionAction)
    async deleteComision(ctx:StateContext<AlumnoInscripcionModelState>, action: DeleteAlumnoInscripcionAction){
        ctx.patchState({
            error:false,
            errorMessage:''
          })
          try{
            await lastValueFrom(this.service.delete(action.id));
            ctx.patchState({
              inscripciones: ctx.getState().inscripciones.filter(x => x._id !== action.id)   
            })
          }
          catch(error: any){
            ErrorStateHandler.handleError(error, ctx);
          }
    }
}