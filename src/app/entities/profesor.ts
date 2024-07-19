import { TipoPersonaEnum } from "../util/EnumTipoPersona";
import { Persona, PersonaDto } from "./persona";

export class Profesor extends Persona {
}

export class ProfesorDto extends PersonaDto {
    super() {
        this.tipoPersona = TipoPersonaEnum.PROFESOR
    }
}
