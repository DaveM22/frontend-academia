import { Materia } from "../../../entities/materia";

export class PostMateriaAction {
    static type = "[Materia API] Post materia";
    constructor(public materia:Materia){}
}

export class PUtMateriaAction {
    static type = "[Materia API] Put materia";
    constructor(public materia:Materia){}
}

export class GetByIdMateriaAction{
    static type = "[Materia API] Get by id materia";
    constructor(public id:string){}
}