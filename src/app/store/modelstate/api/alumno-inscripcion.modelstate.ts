import { AlumnoInscripcion } from "../../../entities/alumno-inscripcion";

export interface AlumnoInscripcionModelState {
    inscripciones:AlumnoInscripcion[]
    loading:boolean;
    error:boolean
}