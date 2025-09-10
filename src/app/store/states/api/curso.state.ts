import { Injectable } from "@angular/core";
import { CursoModelState } from "../../modelstate/api/curso.modelstate";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CursoService } from "../../../services/curso.service";
import { ClearCursos, DeleteCursoAction, GenerateReport, GetByIdCursoAction, GetCursoAction, PostCursoAction, PutCursoAction } from "../../actions/api/curso.action";
import { lastValueFrom } from "rxjs";
import { ErrorStateHandler } from "../../../util/ErrorStateHandler";
import { AsignSelectedCursoAction } from "../../actions/pages/curso.action";
import saveAs from "file-saver";

@State<CursoModelState>({
    name: 'cursos',
    defaults: {
        cursos: [],
        loading: true,
        error: false,
        errorMessage: '',
    }
})

@Injectable()
export class CursoState {

    @Selector()
    static getCursos(state: CursoModelState) {
        return state.cursos;
    }

    @Selector()
    static getLoading(state: CursoModelState) {
        return state.loading;
    }

    @Selector()
    static getError(state: CursoModelState) {
        return state.error;
    }

    @Selector()
    static getErrorMessage(state: CursoModelState) {
        return state.errorMessage;
    }

    constructor(private service: CursoService) { }

    @Action(GetCursoAction)
    async getEspecialidadAction(ctx: StateContext<CursoModelState>, action: GetCursoAction) {
        ctx.patchState({ loading: true, error: false })
        try {
            const response = await lastValueFrom(this.service.getCursos(action.filters));

            ctx.patchState({
                cursos: [...response],
                loading: false,
                error: false
            })
        }
        catch (error: any) {
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.patchState({ loading: false })
        }

    }

    @Action(DeleteCursoAction)
    async deleteEspecialidadAction(ctx: StateContext<CursoModelState>, action: DeleteCursoAction) {
        await lastValueFrom(this.service.delete(action.id));
        ctx.patchState({
            cursos: ctx.getState().cursos.filter(x => x._id !== action.id)
        })
    }

    @Action(PostCursoAction)
    async postEspecialidadAction(ctx: StateContext<CursoModelState>, action: PostCursoAction) {
        const response = await lastValueFrom(await this.service.post(action.curso));
        const list = ctx.getState().cursos;
        ctx.patchState({
            cursos: [...list, response]
        })
    }

    @Action(GetByIdCursoAction)
    async getByIdEspecialidad(ctx: StateContext<CursoModelState>, action: GetByIdCursoAction) {
        const response = await lastValueFrom(this.service.getById(action.id));
        console.log(response);
        ctx.dispatch(new AsignSelectedCursoAction(response));
    }

    @Action(PutCursoAction)
    async putEspecialidad(ctx: StateContext<CursoModelState>, action: PutCursoAction) {
        const response = await lastValueFrom(await this.service.put(action.curso));
        const state = ctx.getState();
        const updatedEspecialidades = ctx.getState().cursos.map(item =>
            item._id === response._id ? response : item
        );

        ctx.patchState({
            cursos: updatedEspecialidades
        })

    }



    @Action(ClearCursos)
    clearPlanes(ctx: StateContext<CursoModelState>, action: ClearCursos) {
        ctx.patchState({
            cursos: []
        })
    }

    @Action(GenerateReport)
    async generateReport(ctx: StateContext<CursoModelState>, action: GenerateReport) {

        ctx.patchState({ loading: true, error: false });
        try {
            const response = await lastValueFrom(this.service.generateReport(action.id));
         
            const blob = new Blob([response.body as ArrayBuffer], { type: 'application/pdf' });
            saveAs(blob, 'reporte-curso.pdf');
        }
        catch (error: any) {
   console.log(error)
            ErrorStateHandler.handleError(error, ctx);
        }
        finally {
            ctx.patchState({ loading: false })
        }

    }

}