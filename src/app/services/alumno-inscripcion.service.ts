import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoInscripcion, AlumnoInscripcionDto } from '../entities/alumno-inscripcion';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AlumnoInscripcionService {

  constructor(private http: HttpClient) { }

  post(inscripcion:AlumnoInscripcionDto){
    return this.http.post<AlumnoInscripcion>(`${environment.apiUrl}/alumnos-inscripciones`, inscripcion);
  }

  get(id:string){
    return this.http.get<AlumnoInscripcion>(`${environment.apiUrl}/alumnos-inscripciones/${id}`);
  }

  getByCurso(cursoId:string){
    return this.http.get<AlumnoInscripcion[]>(`${environment.apiUrl}/alumnos-inscripciones/curso/${cursoId}`);
  }

  put(id:string,inscripcion:AlumnoInscripcionDto){
    return this.http.put<AlumnoInscripcion>(`${environment.apiUrl}/alumnos-inscripciones/${id}`, inscripcion);
  }

  delete(id:string){
    return this.http.delete(`${environment.apiUrl}/alumnos-inscripciones/${id}`);
  }
}
