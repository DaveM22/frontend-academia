import { DocenteCursoFilter } from "../../../entities/filter";

export class GetDocenteCursoAction {
    static type = "[DocenteCurso API] get docentes cursos";
    constructor(public filter:DocenteCursoFilter){}
}