import { AlumnoInscripcion, AlumnoInscripcionDto } from "../../../entities/alumno-inscripcion";

export class PostAlumnoInscripcion{
    static type = "[AlumnoInscripcion Api] Post alumno inscripcion";
    constructor(public inscripcion:AlumnoInscripcionDto){}
}