import { Curso } from "../../../entities/curso"

export interface CursoPageModelState{
    showModalDelete:boolean
    cursoSelected:Curso | null

}