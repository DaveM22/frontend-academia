import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../entities/alumno';
import { Profesor } from '../entities/profesor';
import { Persona, PersonaDto } from '../entities/persona';
import { AlumnoFilter, DocenteFilter } from '../entities/filter';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) { }

  getAlumnos(){
    return this.http.get<Alumno[]>(`${environment.apiUrl}/personas/alumnos`);
  }

  getProfesores(filters:DocenteFilter){
    let params = new HttpParams();
    if(filters.cursoId){
      params = params.set('cursoId', filters.cursoId);
    }
    if(filters.planId){
      params = params.set('planId', filters.planId);
    }
    return this.http.get<Profesor[]>(`${environment.apiUrl}/personas/profesores`, {params:params});
  }

  getByIdAlumno(id:string, filter:AlumnoFilter){
    let params = new HttpParams();
    params = params.set('incluirInscripciones',filter.incluirInscripciones);
    return this.http.get<Alumno>(`${environment.apiUrl}/personas/alumnos/${id}`, {params: params});
  }

  getByIdProfesor(id:string, filter:DocenteFilter){
    let params = new HttpParams();
    params = params.set('incluirAsignaciones',filter.incluirAsignaciones);
    return this.http.get<Profesor>(`${environment.apiUrl}/personas/profesores/${id}`, {params: params});
  }

  getByIdAlumnoInscripciones(id:string){
    return this.http.get<Alumno>(`${environment.apiUrl}/personas/alumnos/inscripciones/${id}`);
  }

  postAlumno(alumno:PersonaDto){
    return this.http.post<Alumno>(`${environment.apiUrl}/personas/alumnos`, alumno);
  }

  postProfesor(profesor:PersonaDto){
    return this.http.post<Profesor>(`${environment.apiUrl}/personas/profesores`, profesor);
  }

  putAlumno(alumno:PersonaDto){
    return this.http.put<Alumno>(`${environment.apiUrl}/personas/alumnos/${alumno._id}`, alumno);
  }

  putProfesor(profesor:PersonaDto){
    return this.http.put<Profesor>(`${environment.apiUrl}/personas/profesores/${profesor._id}`, profesor);
  }
}
