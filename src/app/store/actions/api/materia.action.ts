import { MateriaFilter } from "../../../entities/filter";
import { Materia } from "../../../entities/materia";

export class GetMateriasAction{
    static type = "[Materia API] Get list materias";
    constructor(public filter:MateriaFilter){}
}


export class PostMateriaAction {
    static type = "[Materia API] Post materia";
    constructor(public materia:Materia){}
}

export class PutMateriaAction {
    static type = "[Materia API] Put materia";
    constructor(public materia:Materia){}
}

export class GetByIdMateriaAction{
    static type = "[Materia API] Get by id materia";
    constructor(public id:string){}
}

export class GetByIdForInscripcion{
    static type = "[Materia API] Get by id materia for inscripcion";
    constructor(public filters:MateriaFilter){}
}

export class DeleteMateria {
    static type = "[Materia API] Delete materia";
    constructor(public materia:Materia){}
}