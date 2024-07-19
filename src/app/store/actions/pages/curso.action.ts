import { Curso } from "../../../entities/curso"

export class AsignSelectedCursoAction {
    static type = "[Curso Page] asign curso selected"
    constructor(public Curso: Curso){}
}

export class ClearSelectedCursoAction {
    static type = "[Curso Page] clear curso selected"
}