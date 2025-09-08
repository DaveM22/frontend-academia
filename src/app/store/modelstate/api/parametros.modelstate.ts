import { Parametro } from "../../../entities/parametro";

export interface ParametroModelState{
    parametros:Parametro[],
    error:boolean;
    loading:boolean;
    errorMessage: string;
    parameterSelected: Parametro | null;
}