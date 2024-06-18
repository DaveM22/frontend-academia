import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AppModelState } from "../../modelstate/pages/app.modelstate";
import { ToggleMenuAction } from "../../actions/pages/app.action";

@State<AppModelState>({
    name: 'appPage',
    defaults:{
        toggle:false
    }
  })

  @Injectable()
  export class AppPageState{

    @Selector()
    static getToggle(state: AppModelState){
        return state.toggle;
    }

    @Action(ToggleMenuAction)
    toggleMenuAction(ctx:StateContext<AppModelState>, action:ToggleMenuAction){
        ctx.patchState({
            toggle:action.toggle
        })
    }
  }