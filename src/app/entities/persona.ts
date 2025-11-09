import { TipoPersonaEnum } from "../util/EnumTipoPersona";
import { Plan } from "./plan";

export class Persona {
    public _id:string = '';
    public nombre:string = '';
    public apellido:string = '';
    public email:string = '';
    public telefono:string = '';
    public direccion:string = '';
    public fechaNacimiento:Date = new Date();
    public legajo:number = 0;
    public plan!:Plan;
    public tipoPersona!: TipoPersonaEnum
}

export class PersonaDto {
    public _id:string = '';
    public nombre:string = '';
    public apellido:string = '';
    public email:string = '';
    public telefono:string = '';
    public fechaNacimiento:string = '';
    public legajo:number = 0;
    public plan:string = '';
    public tipoPersona!: TipoPersonaEnum
}
