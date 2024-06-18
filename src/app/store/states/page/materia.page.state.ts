import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MateriaPageModelState } from "../../modelstate/pages/materia.modelstate";
import { AsignMateriaAction, ClearMateriaAction } from "../../actions/pages/materia.action";

@State<MateriaPageModelState>({
    name: 'materiasPage',
    defaults: {
        materiaSelected: null,
        error:false
    }
})

@Injectable()
export class MateriaPageState {

    @Selector()
    static getMateriaSelected(state: MateriaPageModelState) {
        return state.materiaSelected;
    }

    @Action(AsignMateriaAction)
    asignMateriaAction(ctx:StateContext<MateriaPageModelState>, action:AsignMateriaAction){
        return ctx.patchState({
            materiaSelected: action.materia
        })
    }

    @Action(ClearMateriaAction)
    clearMateriaAction(ctx:StateContext<MateriaPageModelState>, action:ClearMateriaAction){
        return ctx.patchState({
            materiaSelected: null
        })
    }
}