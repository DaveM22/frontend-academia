import { AlumnoInscripcion } from "../../../entities/alumno-inscripcion";

export class AsignAlumnoInscripcionAction{
    static type = "[AlumnoInscripcion Page] Asign alumno inscripcion";
    constructor(public inscripcion:AlumnoInscripcion){}
}

export class ClearAlumnoInscripcionAction{
    static type = "[AlumnoInscripcion Page] Clear alumno inscripcion selected";
}