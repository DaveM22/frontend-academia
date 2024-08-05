import { Usuario } from "../../../entities/usuario"

export class AsignSelectedUsuario {
    static type = "[Usuario Page] asign usuario selected"
    constructor(public usuario: Usuario){}
}

export class ClearSelectedUsuario {
    static type = "[Usuario Page] clear usuario selected"
}