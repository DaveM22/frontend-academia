import { Usuario } from "../../../entities/usuario";

export interface UsuarioModelState{
    usuarios:Usuario[]
    loading:boolean,
    error:boolean,
    errorMessage:string
}