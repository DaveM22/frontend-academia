import { Parametro } from "../../../entities/parametro";

export class GetParametrosAction {
    static type = "[Parametros API] List parameters";
}

export class GetByNombreParametroAction {
    static type = "[Parametros API] Get parametro by name";
    constructor(public nombre: string) { }
}


export class PutParametroAction{
    static type = "[Parametros API] Put parametro";
    constructor(public parametro:Parametro){}
}