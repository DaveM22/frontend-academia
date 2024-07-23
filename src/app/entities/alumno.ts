import { TipoPersonaEnum } from "../util/EnumTipoPersona";
import { AlumnoInscripcion } from "./alumno-inscripcion";
import { Persona, PersonaDto } from "./persona";

export class Alumno extends Persona {
   constructor(){
      super();
      this.tipoPersona = TipoPersonaEnum.ALUMNO
   }
   public inscripciones:AlumnoInscripcion[] = []
}

export class AlumnoDto extends PersonaDto {
   super(){
    this.tipoPersona = TipoPersonaEnum.ALUMNO
   }
}
