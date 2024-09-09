import { Comision } from "../../../entities/comision";
import { Curso } from "../../../entities/curso";
import { Especialidad } from "../../../entities/especialidad";
import { Materia } from "../../../entities/materia";
import { Plan } from "../../../entities/plan";
import { Profesor } from "../../../entities/profesor";

export interface AppModelState{
    showModalConfirmation:boolean,
    personId:string,
    toggle:boolean,
    selectedEspecialidadFilter:Especialidad | null,
    selectedPlanFilter:Plan | null,
    selectedMateriaFilter:Materia | null,
    selectedPlanInModal:Plan | null,
    selectedMateriaInModal:Materia | null,
    selectedComisionInModal:Comision | null,
    selectedCursoInModal:Curso | null,
    selectedProfesorInModal:Profesor | null,
    showPlanModal:boolean,
    showMateriaModal:boolean,
    showComisionModal:boolean,
    showCursoModal:boolean,
    showProfesorModal:boolean
}