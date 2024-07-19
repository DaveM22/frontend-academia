import { Injectable } from "@angular/core";
import { NavigationModelState } from "../../modelstate/pages/navigation.modelstate";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AsignarEspecialidadId } from "../../actions/pages/navigate.action";

@State<NavigationModelState>({
    name: 'navigation',
    defaults: {
        especialidadId:''
    }
})

@Injectable()
export class NavigationState {

    
    @Action(AsignarEspecialidadId)
    asignarEspecialidadId(ctx:StateContext<NavigationModelState>, action: AsignarEspecialidadId){
        ctx.patchState({
            especialidadId:action.id
        })
    }


}