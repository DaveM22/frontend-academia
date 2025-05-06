import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AppModelState } from "../../modelstate/pages/app.modelstate";
import { ClearDocenteInModal, ClearSelectedComisionInModal, ClearSelectedCursoInModal, ClearSelectedEspecialidadFilter, ClearSelectedMateriaInFilter, ClearSelectedMateriaInModal, ClearSelectedPlanFilter, ClearSelectedPlanInModal, SelectedComisionInModal, SelectedCursoInModal, SelectedDocenteInModal, SelectedEspecialidadFilterAction, SelectedMateriaInFilter, SelectedMateriaForCurso as SelectedMateriaInModal, SelectedPlanFilter, SelectedPlanInModal, SetPersonaId, ShowComisionesModal, ShowCursoModal, ShowDocenteModal, ShowMateriaModal, ShowModalConfirmationAction, ShowPersonaModal, ShowPlanModal, ToggleMenuAction } from "../../actions/pages/app.action";
import { ClearSelectedCursoAction } from "../../actions/pages/curso.action";

@State<AppModelState>({
    name: 'appPage',
    defaults: {
        showModalConfirmation:false,
        personId:'',
        toggle: false,
        selectedEspecialidadFilter: null,
        selectedMateriaFilter:null,
        selectedPlanInModal: null,
        selectedMateriaInModal: null,
        selectedComisionInModal: null,
        selectedCursoInModal: null,
        selectedPlanFilter:null,
        selectedProfesorInModal:null,
        showPlanModal: false,
        showMateriaModal: false,
        showComisionModal: false,
        showCursoModal: false,
        showProfesorModal:false,
        showPersonaModal:false
    }
})

@Injectable()
export class AppPageState {

    @Selector()
    static getToggle(state: AppModelState) {
        return state.toggle;
    }

    @Selector()
    static getSelectedEspecialidad(state: AppModelState) {
        return state.selectedEspecialidadFilter;
    }

    @Selector()
    static getSelectedPlanInFilter(state: AppModelState){
        return state.selectedPlanFilter;
    }

    @Selector()
    static getSelectedMateriaInFilter(state: AppModelState){
        return state.selectedMateriaFilter;
    }

    @Selector()
    static getSelectedPlanInModal(state: AppModelState) {
        return state.selectedPlanInModal;
    }

    @Selector()
    static getSelectedDocenteInModal(state: AppModelState) {
        return state.selectedProfesorInModal;
    }
    

    @Selector()
    static getSelectedMateriaInModal(state:AppModelState){
        return state.selectedMateriaInModal;
    }

    @Selector()
    static getSelectedCursoInModal(state:AppModelState){
        return state.selectedCursoInModal;
    }

    @Selector()
    static getSelectedComisionInModal(state: AppModelState){
        return state.selectedComisionInModal;
    }

    @Selector()
    static getShowModalPlanes(state: AppModelState) {
        return state.showPlanModal;
    }

    @Selector()
    static getShowModalPersonas(state: AppModelState) {
        return state.showPersonaModal;
    }

    @Selector()
    static getShowModalMaterias(state: AppModelState) {
        return state.showMateriaModal;
    }

    @Selector()
    static getShowModalComisiones(state: AppModelState) {
        return state.showComisionModal;
    }

    
    @Selector()
    static getShowModalCursos(state: AppModelState) {
        return state.showCursoModal;
    }

    @Selector()
    static getShowModalDocentes(state: AppModelState) {
        return state.showProfesorModal;
    }

    @Selector()
    static getPersonId(state: AppModelState){
        return state.personId;
    }

    @Selector()
    static showModalConfirmation(state:AppModelState){
        return state.showModalConfirmation;
    }

    @Action(ShowModalConfirmationAction)
    showModalDelete(ctx: StateContext<AppModelState>, action: ShowModalConfirmationAction){
        ctx.patchState({
            showModalConfirmation:action.show
        })
    }

    @Action(SetPersonaId)
    setPersonaId(ctx: StateContext<AppModelState>, action: SetPersonaId){
        ctx.patchState({
            personId: action.personId
        })
    }

    @Action(ToggleMenuAction)
    toggleMenuAction(ctx: StateContext<AppModelState>, action: ToggleMenuAction) {
        ctx.patchState({
            toggle: action.toggle
        })
    }

    @Action(SelectedEspecialidadFilterAction)
    selectedEspecialidadFilter(ctx: StateContext<AppModelState>, action: SelectedEspecialidadFilterAction) {
        ctx.patchState({
            selectedEspecialidadFilter: action.especialidad
        });
    }

    @Action(ClearSelectedEspecialidadFilter)
    clearEspecialidadFilter(ctx: StateContext<AppModelState>, action: ClearSelectedEspecialidadFilter) {
        ctx.patchState({
            selectedEspecialidadFilter: null
        });
    }


    @Action(SelectedPlanFilter)
    selectedPlanFilter(ctx: StateContext<AppModelState>, action: SelectedPlanFilter) {
        ctx.patchState({
            selectedPlanFilter: action.plan
        });
    }

    @Action(ClearSelectedPlanFilter)
    clearPlanFilter(ctx: StateContext<AppModelState>, action: ClearSelectedPlanFilter) {
        ctx.patchState({
            selectedPlanFilter: null
        });
    }

    @Action(SelectedMateriaInFilter)
    selectedMateriaFilter(ctx: StateContext<AppModelState>, action: SelectedMateriaInFilter) {
        ctx.patchState({
            selectedMateriaFilter: action.materia
        });
    }

    @Action(ClearSelectedMateriaInFilter)
    clearMateriaFilter(ctx: StateContext<AppModelState>, action: ClearSelectedMateriaInFilter) {
        ctx.patchState({
            selectedMateriaFilter: null
        });
    }




    @Action(SelectedPlanInModal)
    selectedPlanInModal(ctx: StateContext<AppModelState>, action: SelectedPlanInModal) {
        ctx.patchState({
            selectedPlanInModal: action.plan
        })
    }


    @Action(ClearSelectedPlanInModal)
    clearSelectedPlanInModal(ctx: StateContext<AppModelState>, action: ClearSelectedPlanInModal) {
        ctx.patchState({
            selectedPlanInModal: null
        })
    }

    @Action(SelectedMateriaInModal)
    selectedMateriaInModal(ctx: StateContext<AppModelState>, action: SelectedMateriaInModal) {
        ctx.patchState({
            selectedMateriaInModal: action.materia
        })
    }

    @Action(ClearSelectedMateriaInModal)
    clearSelectedMateriaInModal(ctx: StateContext<AppModelState>, action: ClearSelectedMateriaInModal) {
        ctx.patchState({
            selectedMateriaInModal: null
        })
    }

    @Action(SelectedComisionInModal)
    selectedComisionInModal(ctx: StateContext<AppModelState>, action: SelectedComisionInModal) {
        ctx.patchState({
            selectedComisionInModal: action.comision
        })
    }

    @Action(ClearSelectedComisionInModal)
    clearSelectedComisionInModal(ctx: StateContext<AppModelState>, action: ClearSelectedMateriaInModal) {
        ctx.patchState({
            selectedComisionInModal: null
        })
    }

    @Action(SelectedCursoInModal)
    selectedCursoInModal(ctx: StateContext<AppModelState>, action: SelectedCursoInModal) {
        ctx.patchState({
            selectedCursoInModal: action.curso
        })
    }

    @Action(ClearSelectedCursoInModal)
    clearSelectedCursoInModal(ctx: StateContext<AppModelState>, action: ClearSelectedCursoInModal) {
        ctx.patchState({
            selectedCursoInModal: null
        })
    }

    @Action(ShowPlanModal)
    showPlanModal(ctx: StateContext<AppModelState>, action: ShowPlanModal) {
        ctx.patchState({
            showPlanModal: action.show
        })
    }

    @Action(ShowMateriaModal)
    showMateriaModal(ctx: StateContext<AppModelState>, action: ShowMateriaModal) {
        ctx.patchState({
            showMateriaModal: action.show
        })
    }

    @Action(ShowPersonaModal)
    showPersonaModal(ctx: StateContext<AppModelState>, action: ShowPersonaModal) {
        ctx.patchState({
            showPersonaModal:action.show
        })
    }

    @Action(ShowComisionesModal)
    showComisionesModal(ctx: StateContext<AppModelState>, action: ShowComisionesModal) {
        ctx.patchState({
            showComisionModal:action.show
        })
    }

    @Action(ShowCursoModal)
    showCursosModal(ctx: StateContext<AppModelState>, action: ShowCursoModal) {
        ctx.patchState({
            showCursoModal:action.show
        })
    }

    @Action(ShowDocenteModal)
    showDocenteModal(ctx: StateContext<AppModelState>, action: ShowDocenteModal) {
        ctx.patchState({
            showProfesorModal:action.show
        })
    }

    @Action(SelectedDocenteInModal)
    selectedDocenteInModal(ctx: StateContext<AppModelState>, action: SelectedDocenteInModal){
        ctx.patchState({
            selectedProfesorInModal: action.docente
        })
    }

    @Action(ClearDocenteInModal)
    clearDocenteInModal(ctx: StateContext<AppModelState>, action: ClearDocenteInModal){
        ctx.patchState({
            selectedProfesorInModal:null
        })
    }


}