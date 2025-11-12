import { ErrorHandler, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PersonaModelState } from "../../modelstate/api/persona.modelstate";
import { PersonaService } from "../../../services/persona.service";
import { ClearAlumnoListAction, ClearProfesorListAction, DeleteAlumnoAction, DeleteProfesorAction, GetAlumnoByIdAction, GetAlumnoByIdWithInscripcionesAction, GetAlumnosAction, GetProfesorByIdAction, GetProfesoresAction, PostAlumnoAction, PostProfesorAction, PutAlumnoAction, PutProfesorAction, UpdateManualLoading as UpdateManualLoadingAction } from "../../actions/api/persona.action";
import { lastValueFrom } from "rxjs";
import { AsignSelectedAlumno, AsignSelectedPersona, AsignSelectedProfesor } from "../../actions/pages/persona.action";
import { MessageService } from "primeng/api";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";
import { LoadingForm } from "../../actions/pages/app.action";

@State<PersonaModelState>({
    name: 'personas',
    defaults: {
        alumnos: [],
        profesores: [],
        loading: false,
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
        ctx.patchState({
            loading: true,
            error: false
        })
        try {
            const response = await lastValueFrom(this.service.getAlumnos(action.filters));
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
        ctx.patchState({
            loading: true,
            error: false
        })
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
        ctx.patchState({
            loading: true,
            error: false
        })
        try {
            const response = await lastValueFrom(this.service.getByIdProfesor(action.id, action.filter));
            ctx.dispatch(new AsignSelectedProfesor(response));
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

    @Action(GetProfesoresAction)
    async getProfesores(ctx: StateContext<PersonaModelState>, action: GetProfesoresAction) {
        ctx.patchState({
            loading: true
        })
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
        ctx.patchState({ error: false })
        ctx.dispatch(new LoadingForm(true));
        try {
            const response = await lastValueFrom(this.service.postAlumno(action.alumno));
            const list = ctx.getState().alumnos;
            ctx.patchState({
                alumnos: [...list, response]
            })
        }
        catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.dispatch(new LoadingForm(false));
        }
    }

    @Action(PutAlumnoAction)
    async putAlumno(ctx: StateContext<PersonaModelState>, action: PutAlumnoAction) {
        ctx.patchState({ error: false })
        ctx.dispatch(new LoadingForm(true));
        try {
            const response = await lastValueFrom(this.service.putAlumno(action.alumno));
            const updatedAlumnos = ctx.getState().alumnos.map(item =>
                item._id === response._id ? response : item
            );
            ctx.patchState({
                alumnos: updatedAlumnos
            })
        }
        catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.dispatch(new LoadingForm(false));
        }
    }

    @Action(PostProfesorAction)
    async postProfesorAction(ctx: StateContext<PersonaModelState>, action: PostProfesorAction) {
        ctx.dispatch(new LoadingForm(true));
        try {
            const response = await lastValueFrom(this.service.postProfesor(action.profesor));
            const list = ctx.getState().profesores;
            ctx.patchState({
                profesores: [...list, response]
            })
        } catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.dispatch(new LoadingForm(false));
        }
    }

    @Action(PutProfesorAction)
    async putProfesor(ctx: StateContext<PersonaModelState>, action: PutProfesorAction) {
        ctx.dispatch(new LoadingForm(true));
        try {
            const response = await lastValueFrom(this.service.putProfesor(action.profesor));
            const updatedProfesores = ctx.getState().profesores.map(item =>
                item._id === response._id ? response : item
            );
            ctx.patchState({
                profesores: updatedProfesores
            })
        } catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.dispatch(new LoadingForm(false));
        }
    }

    @Action(DeleteAlumnoAction)
    async deleteAlumno(ctx: StateContext<PersonaModelState>, action: DeleteAlumnoAction) {
        try {
            await lastValueFrom(this.service.deleteAlumno(action.id));
            ctx.patchState({
                alumnos: ctx.getState().alumnos.filter(x => x._id !== action.id)
            })
        }
        catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
    }

    @Action(DeleteProfesorAction)
    async deleteProfesor(ctx: StateContext<PersonaModelState>, action: DeleteProfesorAction) {
        try {
            await lastValueFrom(this.service.deleteProfesor(action.id));
            ctx.patchState({
                profesores: ctx.getState().profesores.filter(x => x._id !== action.id)
            })
        }
        catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
    }

    @Action(UpdateManualLoadingAction)
    async updateLoading(ctx: StateContext<PersonaModelState>, action: UpdateManualLoadingAction) {
        ctx.patchState({
            loading: action.loading
        })
    }

    @Action(ClearAlumnoListAction)
    async clearAlumno(ctx: StateContext<PersonaModelState>, action: ClearAlumnoListAction) {
        ctx.patchState({
            alumnos: []
        })
    }

    @Action(ClearProfesorListAction)
    async clearProfesor(ctx: StateContext<PersonaModelState>, action: ClearProfesorListAction) {
        ctx.patchState({
            profesores: []
        })
    }

}