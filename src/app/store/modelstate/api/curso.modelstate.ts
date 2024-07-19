import { Curso } from "../../../entities/curso"

export interface CursoModelState{
    cursos:Curso[],
    loading:boolean
    error:boolean,
    errorMessage:string
}