import { AlumnoInscripcion, AlumnoInscripcionDto } from "../../../entities/alumno-inscripcion";

export class PostAlumnoInscripcionAction{
    static type = "[AlumnoInscripcion Api] Post alumno inscripcion";
    constructor(public inscripcion:AlumnoInscripcionDto){}
}

export class GetOneAlumnoInscripcionAction{
    static type = "[AlumnoInscripcion Api] Get one alumno inscripción";
    constructor(public id:string){}
}

export class PutAlumnoInscripcionAction {
    static type = "[Comision API] Put alumno inscripcion";
    constructor(public id:string,public alumnoInscripcion:AlumnoInscripcionDto){}
}

export class DeleteAlumnoInscripcionAction{
    static type = "[AlumnoInscripcion API] Delete alumno inscripcion";
    constructor(public id:string){}
}