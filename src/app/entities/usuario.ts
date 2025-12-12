import { Persona } from "./persona"

export class Usuario {
    _id:string = ''
    nombreUsuario:string =''
    email:string = ''
    persona:Persona | null = null
    nombreYapellido:string | null = ''
    clave:string | null = ''
    role:string = ''
}
