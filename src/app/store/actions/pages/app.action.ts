import { Comision } from "../../../entities/comision";
import { Curso } from "../../../entities/curso";
import { Especialidad } from "../../../entities/especialidad";
import { Materia } from "../../../entities/materia";
import { Persona } from "../../../entities/persona";
import { Plan } from "../../../entities/plan";
import { Profesor } from "../../../entities/profesor";


export class ShowModalConfirmationAction{
    static type = "[Modal] Show modal confirmation";
    constructor(public show:boolean){}
}


export class SetPersonaId{
    static type = "[APP] Set personId ";
    constructor(public personId:string){}
}

export class ToggleMenuAction {
    static type = "[Page] Toggle button";
    constructor(public toggle: boolean) { }
}

export class ShowDocenteModal{
    static type = "[Page] Show docente modal";
    constructor(public show:boolean){}
}

export class ShowPlanModal {
    static type = "[Page] Show plan modal";
    constructor(public show: boolean) { }
}

export class ShowMateriasModal{
    static type = "[Page] Show materias modal";
    constructor(public show:boolean){}
}

export class ShowComisionesModal{
    static type = "[Page] Show comisiones modal";
    constructor(public show:boolean){}
}

export class ShowMateriaModal {
    static type = "[Page] Show materias modal";
    constructor(public show: boolean) { }
}

export class ShowCursoModal {
    static type = "[Page] Show cursos modal";
    constructor(public show: boolean) { }
}

export class SelectedEspecialidadFilterAction {
    static type = "[Page] Especialidad Selected";
    constructor(public especialidad: Especialidad) { }
}

export class ClearSelectedEspecialidadFilter {
    static type = "[Page] Clear Especialidad Selected";
    constructor() { }
}

export class SelectedPlanFilter {
    static type = "[Page] Plan selected";
    constructor(public plan:Plan){}
}

export class ClearSelectedPlanFilter {
    static type = "[Page] Clear Plan selected";
}

export class SelectedDocenteInModal{
    static type = "[Page] Docente selected";
    constructor(public docente:Profesor){}
}

export class ClearDocenteInModal{
    static type = "[Page] Docente selected";
    constructor(public docente:Profesor){}
}

export class SelectedPlanInModal {
    static type = "[Page] Plan selected";
    constructor(public plan: Plan) { }
}

export class ClearSelectedPlanInModal {
    static type = "[Page] Clear plan selected";
}

export class SelectedMateriaForCurso {
    static type = "[Page] Materia selected for curso";
    constructor(public materia: Materia) { }
}

export class ClearSelectedMateriaInModal {
    static type = "[Page] Clear materia selected";
}

export class SelectedComisionInModal{
    static type = "[Page] Comision selected";
    constructor(public comision:Comision){}
}

export class ClearSelectedComisionInModal{
    static type = "[Page] Clear comision selected";
}

export class SelectedCursoInModal{
    static type = "[Page] Curso selected";
    constructor(public curso:Curso){}
}

export class ClearSelectedCursoInModal{
    static type = "[Page] Clear curso selected";
}

export class SelectedMateriaInFilter{
    static type = "[Page] Materia selected";
    constructor(public materia:Materia){}
}

export class ClearSelectedMateriaInFilter{
    static type = "[Page] Clear materia selected";
}

export class ShowPersonaModal {
    static type = "[Page] Show persona modal";
    constructor(public show:boolean){}
}


export class SelectedPersonaInModal{
    static typer = "[Page] Persona selected in modal";
    constructor(public persona:Persona){}
}

export class ClearPersonaInModal{
    static type = "[Page] clear persona selected in filter";
    constructor(){}
}

export class LoadingForm {
    static type = "[Page] Loading form state";
    constructor(public loading:boolean){}
}

export class GeneralLoadingAction {
    static type = "[Page] General loading state";
    constructor(public loading:boolean){} 
}
