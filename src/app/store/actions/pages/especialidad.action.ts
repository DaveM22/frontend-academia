import { Especialidad } from "../../../entities/especialidad";

export class ShowModalDelete{
    static type = "[Modal] Show modal delete";
    constructor(public show:boolean){}
}


export class AsignSelectedEspecialidad {
    static type = "[Especialidad Page] asign especialidad selected"
    constructor(public especialidad: Especialidad){}
}

export class ClearSelectedEspecialidad {
    static type = "[Especialidad Page] clear especialidad selected"
}