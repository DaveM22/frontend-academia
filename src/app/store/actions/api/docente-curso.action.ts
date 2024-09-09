import { DocenteCurso, DocenteCursoDto } from "../../../entities/docente-curso";
import { DocenteCursoFilter } from "../../../entities/filter";

export class GetDocenteCursoAction {
    static type = "[DocenteCurso API] get docentes cursos";
    constructor(public filter:DocenteCursoFilter){}
}

export class PostDocenteCursoAction{
    static type = "[DocenteCurso API] post docente cursos";
    constructor(public docenteCurso:DocenteCursoDto){}
}

export class DeleteDocenteCursoAction{
    static type = "[DocenteCurso API] delete docente cursos";
    constructor(public id:string){}
}