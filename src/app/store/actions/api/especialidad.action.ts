import { Especialidad } from "../../../entities/especialidad";

export class GetEspecialidadAction{
    static type = "[Especialidad API] List especialidad";
}

export class PostEspecialidadAction {
    static type = "[Especialidad API] Post especialidad";
    constructor(public especialidad:Especialidad){}
}

export class PutEspecialidadAction{
    static type = "[Especialidad API] Put especialidad";
    constructor(public especialdiad:Especialidad){}
}

export class DeleteEspecialidadAction{
    static type = "[Especialidad API] Delete especialidad";
    constructor(public id:string){}
}

export class GetByIdEspecialidadAction{
    static type = "[Especialidad API] Get by id especialidad";
    constructor(public id:string){}
}