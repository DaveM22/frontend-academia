import { Alumno } from "../../../entities/alumno"
import { Persona } from "../../../entities/persona";
export class ShowModalDelete{
    static type = "[Modal] Show modal delete";
    constructor(public show:boolean){}
}

export class AsignSelectedPersona {
    static type = "[Persona Page] asign persona selected"
    constructor(public persona: Persona){}
}

export class ClearSelectedPersona {
    static type = "[Persona Page] clear persona selected"
}

export class AsignSelectedAlumno{
    static type = "[Persona Page] asign alumno selected"
    constructor(public alumno: Alumno){}
}

export class ClearSelectedAlumno {
    static type = "[Persona Page] clear alumno selected"
}