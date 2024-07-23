import { Curso } from "./curso";
import { Profesor } from "./profesor";

export class DocenteCurso {
    public _id:string = '';
    public curso:Curso | null = null
    public docente:Profesor | null = null
    public cargo:string = '';
}

export class DocenteCursoDto {
    public _id:string = '';
    public cursoId:string = '';
    public profesorId:string = '';
    public cargo:string = '';
}
