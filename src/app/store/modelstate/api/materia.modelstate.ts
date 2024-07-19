import { Materia } from "../../../entities/materia";

export interface MateriaModelState{
    materias:Materia[],
    error:boolean;
    loading:boolean;
}