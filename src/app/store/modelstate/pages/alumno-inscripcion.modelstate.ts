import { AlumnoInscripcion } from "../../../entities/alumno-inscripcion"

export interface AlumnoInscripcionPageModelState{
    showModalDelete:boolean
    alumnoInscripcionSelected:AlumnoInscripcion | null
}