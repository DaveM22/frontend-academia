import { Curso } from "./curso";
import { Profesor } from "./profesor";

export class DocenteCurso {
    public _id:string = '';
    public curso:Curso | null = null
    public docente:Profesor | null = null
    public cargo:string = '';
}
