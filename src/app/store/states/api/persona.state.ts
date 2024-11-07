import { ErrorHandler, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PersonaModelState } from "../../modelstate/api/persona.modelstate";
import { PersonaService } from "../../../services/persona.service";
import { DeleteAlumnoAction, DeleteProfesorAction, GetAlumnoByIdAction, GetAlumnoByIdWithInscripcionesAction, GetAlumnosAction, GetProfesorByIdAction, GetProfesoresAction, PostAlumnoAction, PostProfesorAction, PutAlumnoAction, PutProfesorAction } from "../../actions/api/persona.action";
import { lastValueFrom } from "rxjs";
import { AsignSelectedAlumno, AsignSelectedPersona, AsignSelectedProfesor } from "../../actions/pages/persona.action";
import { MessageService } from "primeng/api";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";

@State<PersonaModelState>({
    name: 'personas',
    defaults: {
        alumnos: [],
        profesores: [],
        loading: true,
        error: false,
        errorMessage: '',
    }
})

@Injectable()
export class PersonaState {

    @Selector()
    static getAlumnos(state: PersonaModelState) {
        return state.alumnos;
    }

    @Selector()
    static getProfesores(state: PersonaModelState) {
        return state.profesores;
    }

    @Selector()
    static getLoading(state: PersonaModelState) {
        return state.loading;
    }

    @Selector()
    static getError(state: PersonaModelState) {
        return state.error;
    }

    @Selector()
    static getErrorMessage(state: PersonaModelState) {
        return state.errorMessage;
    }

    constructor(private service: PersonaService, private messageService: MessageService) { }

    @Action(GetAlumnosAction)
    async getAlumnos(ctx: StateContext<PersonaModelState>, action: GetAlumnosAction) {
        try {
            const response = await lastValueFrom(this.service.getAlumnos());
            ctx.patchState({
                alumnos: response
            })

        }
        catch (error) {
            ctx.patchState({
                error: true
            })
        }
        finally {
            ctx.patchState({
                loading: false
            })
        }
    }

    @Action(GetAlumnoByIdAction)
    async GetAlumnoByIdAction(ctx: StateContext<PersonaModelState>, action: GetAlumnoByIdAction) {
        try {
            const response = await lastValueFrom(this.service.getByIdAlumno(action.id, action.filter));
            ctx.dispatch(new AsignSelectedAlumno(response));
        }
        catch (error) {
            ctx.patchState({
                error: true
            })
        }
        finally {
            ctx.patchState({
                loading: false
            })
        }
    }



    @Action(GetProfesorByIdAction)
    async getProfesorById(ctx: StateContext<PersonaModelState>, action: GetProfesorByIdAction) {
        const response = await lastValueFrom(this.service.getByIdProfesor(action.id, action.filter));
        ctx.dispatch(new AsignSelectedProfesor(response));
    }

    @Action(GetProfesoresAction)
    async getProfesores(ctx: StateContext<PersonaModelState>, action: GetProfesoresAction) {
        try {
            const response = await lastValueFrom(this.service.getProfesores(action.filter));
            ctx.patchState({
                profesores: response
            })
        }
        catch (error) {
            ctx.patchState({
                error: true
            })
        }
        finally {
            ctx.patchState({
                loading: false
            })
        }
    }

    @Action(PostAlumnoAction)
    async postAlumnoAction(ctx: StateContext<PersonaModelState>, action: PostAlumnoAction) {
        const response = await lastValueFrom(this.service.postAlumno(action.alumno));
        const list = ctx.getState().alumnos;
        ctx.patchState({
            alumnos: [...list, response]
        })
    }

    @Action(PutAlumnoAction)
    async putAlumno(ctx: StateContext<PersonaModelState>, action: PutAlumnoAction) {
        const response = await lastValueFrom(this.service.putAlumno(action.alumno));

        const updatedAlumnos = ctx.getState().alumnos.map(item =>
            item._id === response._id ? response : item
        );
        ctx.patchState({
            alumnos: updatedAlumnos
        })

    }

    @Action(PostProfesorAction)
    async postProfesorAction(ctx: StateContext<PersonaModelState>, action: PostProfesorAction) {
        const response = await lastValueFrom(this.service.postProfesor(action.profesor));
        const list = ctx.getState().profesores;
        ctx.patchState({
            profesores: [...list, response]
        })
    }

    @Action(PutProfesorAction)
    async putProfesor(ctx: StateContext<PersonaModelState>, action: PutProfesorAction) {
        const response = await lastValueFrom(this.service.putProfesor(action.profesor));
        const updatedProfesores = ctx.getState().profesores.map(item =>
            item._id === response._id ? response : item
        );
        ctx.patchState({
            profesores: updatedProfesores
        })
    }

    @Action(DeleteAlumnoAction)
    async deleteAlumno(ctx: StateContext<PersonaModelState>, action: DeleteAlumnoAction) {
       try{
        await lastValueFrom(this.service.deleteAlumno(action.id));
        ctx.patchState({
            alumnos: ctx.getState().alumnos.filter(x => x._id !== action.id)
        })
       }
       catch(error){
        ErrorStateHandler.handleError(error, ctx);
       }
    }

    @Action(DeleteProfesorAction)
    async deleteProfesor(ctx: StateContext<PersonaModelState>, action: DeleteProfesorAction) {
        await lastValueFrom(this.service.deleteProfesor(action.id));
        ctx.patchState({
            profesores: ctx.getState().profesores.filter(x => x._id !== action.id)
        })
    }

}