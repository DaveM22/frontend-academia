import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DocenteCursoModelState } from "../../modelstate/api/docente-curso.modelstate";
import { DeleteDocenteCursoAction, GetDocenteCursoAction, PostDocenteCursoAction } from "../../actions/api/docente-curso.action";
import { lastValueFrom } from "rxjs";
import { DocenteCursoService } from "../../../services/docente-curso.service";
import { LoadingForm } from "../../actions/pages/app.action";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";

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
    static getDocentesCursos(state: DocenteCursoModelState) {
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

    constructor(private service: DocenteCursoService) { }


    @Action(GetDocenteCursoAction)
    async getDocenteCurso(ctx: StateContext<DocenteCursoModelState>, action: GetDocenteCursoAction) {
        ctx.patchState({ error: false, loading: true })
        try {
            const response = await lastValueFrom(this.service.get(action.filter))
            ctx.patchState({
                docentes_cursos: response
            })
        }
        catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.patchState({
                loading: false
            })
        }
    }

    @Action(PostDocenteCursoAction)
    async postDocenteCurso(ctx: StateContext<DocenteCursoModelState>, action: PostDocenteCursoAction) {
        ctx.patchState({ error: false, loading: true })
        ctx.dispatch(new LoadingForm(true))
        try {
            const response = await lastValueFrom(this.service.post(action.docenteCurso))
            const list = ctx.getState().docentes_cursos;
            ctx.patchState({
                docentes_cursos: [...list, response]
            })
        }
        catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.dispatch(new LoadingForm(false))
            ctx.patchState({
                loading: false
            })
        }
    }

    @Action(DeleteDocenteCursoAction)
    async deleteDocenteCurso(ctx: StateContext<DocenteCursoModelState>, action: DeleteDocenteCursoAction) {
        try {
            await lastValueFrom(this.service.delete(action.id))
            ctx.patchState({
                docentes_cursos: ctx.getState().docentes_cursos.filter(x => x._id !== action.id)
            })
        }
        catch (error) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.patchState({
                loading: false
            })
        }
    }
}