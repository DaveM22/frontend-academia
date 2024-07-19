import { Especialidad } from "../../../entities/especialidad";

export interface EspecialidadModelState {
    especialidades: Especialidad[],
    loading: boolean
    error: boolean,
    errorMessage: string
}