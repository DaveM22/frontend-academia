import { Alumno } from "../../../entities/alumno"
import { Persona } from "../../../entities/persona"

export interface PersonaPageModelState{
    showModalDelete:boolean
    personaSelected:Persona | null
    alumnoSelected: Alumno | null
}
