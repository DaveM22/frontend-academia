import { Comision } from "./comision";
import { Materia } from "./materia";

export class Curso {
    public _id: string = ''
    public anioCalendario:number = 0;
    public cupo:number = 0;
    public descripcion: string = '';
    public materia: Materia | null = null;
    public comision: Comision | null = null;
}

export class CursoDto {
    public _id: string = ''
    public anioCalendario:number = 0;
    public cupo:number = 0;
    public descripcion: string = '';
    public materiaId: string = '';
    public comisionId: string = '';
}
