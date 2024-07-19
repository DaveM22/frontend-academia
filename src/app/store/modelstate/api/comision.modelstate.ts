import { Comision } from "../../../entities/comision"

export interface ComisionModelState {
    comisiones:Comision[],
    loading:boolean
    error:boolean,
    errorMessage:string
}