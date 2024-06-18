import { Comision } from "../../../entities/comision";

export class AsignComisionAction{
    static type = "[Comision Page] Asign comision";
    constructor(public comision:Comision){}
}

export class ClearComisionAction{
    static type = "[Comision Page] Clear comision selected";
}