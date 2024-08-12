import { TipoPersonaEnum } from "../util/EnumTipoPersona";
import { DocenteCurso } from "./docente-curso";
import { Persona, PersonaDto } from "./persona";

export class Profesor extends Persona {
    cursos_asignados:DocenteCurso[] = [];
}

export class ProfesorDto extends PersonaDto {
    super() {
        this.tipoPersona = TipoPersonaEnum.PROFESOR
    }
}
