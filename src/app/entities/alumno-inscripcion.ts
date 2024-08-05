import { Alumno } from "./alumno"
import { Curso } from "./curso"

export class AlumnoInscripcion {
    public nota:number = 0
    public alumno:Alumno | null = null
    public curso: Curso | null = null
    public condicion:string = ''
}

export class AlumnoInscripcionDto {
    public nota:number = 0
    public alumnoId:string = ''
    public cursoId: string = ''
    public condicion:string = ''
}
