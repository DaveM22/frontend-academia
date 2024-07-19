import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../entities/alumno';
import { environment } from '../../enviroment';
import { Profesor } from '../entities/profesor';
import { Persona, PersonaDto } from '../entities/persona';
import { AlumnoFilter } from '../entities/filter';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) { }

  getAlumnos(){
    return this.http.get<Alumno[]>(`${environment.apiUrl}/personas/alumnos`);
  }

  getProfesores(){
    return this.http.get<Profesor[]>(`${environment.apiUrl}/personas/profesores`);
  }

  getByIdAlumno(id:string, filter:AlumnoFilter){
    let params = new HttpParams();
    params = params.set('incluirInscripciones',filter.incluirInscripciones);
    return this.http.get<Alumno>(`${environment.apiUrl}/personas/alumnos/${id}`, {params: params});
  }

  getByIdProfesor(id:string){
    return this.http.get<Profesor>(`${environment.apiUrl}/personas/profesores/${id}`);
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
