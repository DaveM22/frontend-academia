import { DocenteCurso } from "../../../entities/docente-curso";

export interface DocenteCursoModelState {
    docentes_cursos:DocenteCurso[]
    loading:boolean;
    error:boolean
    errorMessage:string
}