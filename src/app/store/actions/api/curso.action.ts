import { CursoDto } from "../../../entities/curso";
import { CursoFilter } from "../../../entities/filter";

export class GetCursoAction{
    static type = "[Cursos API] List of Cursos";
    constructor(public filters:CursoFilter){}
}

export class PostCursoAction {
    static type = "[Cursos API] Post Cursos";
    constructor(public curso:CursoDto){}
}

export class PutCursoAction{
    static type = "[Cursos API] Put cursos";
    constructor(public curso:CursoDto){}
}

export class DeleteCursoAction{
    static type = "[Cursos API] Delete cursos";
    constructor(public id:string){}
}

export class GetByIdCursoAction{
    static type = "[Cursos API] Get by id curso";
    constructor(public id:string){}
}

export class ClearCursos{
    static type = "[Curso API] Clear cursos locally";
}

export class GenerateReport {
    static type = "[Curso API] Generate reporte de cursos";
    constructor(public id:string){}
}

