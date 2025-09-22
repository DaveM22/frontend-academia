import { Usuario } from "../../../entities/usuario";

export class GetUsuarioListaAction{
    static type = "[Usuario Api] Get Usuario list";
    constructor(){}
}

export class GetByIdUsuarioAction{
    static type = "[Usuario Api] Get by id Usuario";
    constructor(public id:string){}
}

export class PostUsuarioAction {
    static type = "[Usuario API] Post Usuario";
    constructor(public usr:Usuario){}
}

export class DeleteUsuarioAction {
    static type = "[Usuario API] Delete usuario";
    constructor(public id:string){}
}

export class PutUsuarioAction {
    static type = "[Usuario API] Put Usuario";
    constructor(public usr:Usuario){}
}