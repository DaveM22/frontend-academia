import { Plan } from "../../../entities/plan"

export interface PlanModelState{
    showModalDelete:boolean
    planSelected:Plan | null
    context:string | null
}
