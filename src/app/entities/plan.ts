import { Comision } from "./comision";
import { Especialidad } from "./especialidad"
import { Materia } from "./materia";

export class Plan {
    _id:string = ''
    descripcion:string = ''
    especialidadId:string = ''
    especialidad:Especialidad = new Especialidad();
    materias:Materia[] = [];
    comisiones:Comision[] = [];
}

