import { Plan } from "../../../entities/plan"

export interface PlanModelState{
    planes:Plan[],
    planSelected:Plan | null
    loading:boolean
    error:boolean,
    errorMessage:string
}