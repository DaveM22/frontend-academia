import { Alumno } from "../../../entities/alumno"
import { AlumnoInscripcion } from "../../../entities/alumno-inscripcion"
import { Profesor } from "../../../entities/profesor"

export interface PersonaModelState {
    alumnos: Alumno[],
    profesores: Profesor[],
    loading: boolean
    error: boolean,
    errorMessage: string
}