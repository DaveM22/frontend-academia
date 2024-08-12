import { Alumno } from "../../../entities/alumno"
import { Persona } from "../../../entities/persona"
import { Profesor } from "../../../entities/profesor"

export interface PersonaPageModelState{
    showModalDelete:boolean
    personaSelected:Persona | null
    alumnoSelected: Alumno | null
    profesorSelected: Profesor | null
}
