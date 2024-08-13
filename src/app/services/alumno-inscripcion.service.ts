import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoInscripcion, AlumnoInscripcionDto } from '../entities/alumno-inscripcion';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AlumnoInscripcionService {

  constructor(private http: HttpClient) { }

  post(inscripcion:AlumnoInscripcionDto){
    return this.http.post<AlumnoInscripcion>(`${environment.apiUrl}/alumnos-inscripciones`, inscripcion);
  }
}
