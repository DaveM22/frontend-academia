import { Materia } from "../../../entities/materia";

export interface MateriaPageModelState{
    materiaSelected:Materia | null
    error:boolean;
}