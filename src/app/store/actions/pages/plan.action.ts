import { Plan } from "../../../entities/plan";

export class ShowModalDelete{
    static type = "[Modal] Show modal delete";
    constructor(public show:boolean){}
}

export class AsignSelectedPlan {
    static type = "[Plan Page] asign plan selected"
    constructor(public plan: Plan, public context?:string | null){}
}

export class ClearSelectedPlan {
    static type = "[Plan Page] clear plan selected"
}