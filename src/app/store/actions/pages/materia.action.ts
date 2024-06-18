import { Materia } from "../../../entities/materia";

export class AsignMateriaAction{
    static type = "[Materia Page] Asign materia";
    constructor(public materia:Materia){}
}

export class ClearMateriaAction{
    static type = "[Materia Page] Clear materia selected";
}