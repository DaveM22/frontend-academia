import { Alumno } from "../../../entities/alumno";
import { AlumnoFilter } from "../../../entities/filter";
import { PersonaDto } from "../../../entities/persona";

export class GetAlumnosAction{
    static type = "[Persona API] List alumnos";
}

export class GetProfesoresAction{
    static type = "[Persona API] List profesores";
}

export class GetAlumnoByIdAction{
    static type = "[Persona API] Get one alumno";
    constructor(public id:string,  public filter:AlumnoFilter){}
}

export class GetAlumnoByIdWithInscripcionesAction{
    static type = "[Persona API] Get one alumno with inscripciones";
    constructor(public id:string, public filter:AlumnoFilter){}
}

export class GetProfesorByIdAction{
    static type = "[Persona API] Get one profesor";
    constructor(public id:string){}
}

export class PostAlumnoAction{
    static type = "[Persona API Alumno] Post alumno";
    constructor(public alumno:PersonaDto){}
}

export class PostProfesorAction{
    static type = "[Persona API Alumno] Post profesor";
    constructor(public profesor:PersonaDto){}
}

export class PutAlumnoAction{
    static type = "[Persona API Alumno] Put alumno";
    constructor(public alumno:PersonaDto){}
}

export class PutProfesorAction{
    static type = "[Persona API Profesor] Put profesor";
    constructor(public profesor:PersonaDto){}
}

