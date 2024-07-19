import { Comision } from "../../../entities/comision"

export interface ComisionPageModelState{
    showModalDelete:boolean
    comisionSelected:Comision | null

}