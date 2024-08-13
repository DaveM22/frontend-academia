import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso, CursoDto } from '../entities/curso';
import { Observable } from 'rxjs';
import { CursoFilter } from '../entities/filter';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }


  public getCursos(filters: CursoFilter): Observable<Curso[]> {

    let params = new HttpParams();

    if (filters.planId !== '') {
      params = params.append('planId', filters.planId)
    }

    if (filters.materiaId !== '') {
      params = params.append('materiaId', filters.materiaId)
    }

    if (filters.comisionId !== '') {
      params = params.append('comisionId', filters.comisionId)
    }

    params = params.set('mostrarComision', filters.mostrarComision);
    params = params.set('mostrarMateria', filters.mostrarMateria)

    return this.http.get<Curso[]>(`${environment.apiUrl}/cursos`, { params: params });
  }

  public deleteEspecialidad(id: string) {
    return this.http.delete(`${environment.apiUrl}/cursos/${id}`);
  }

  public postEspecialidad(especialidad: CursoDto) {
    return this.http.post<Curso>(`${environment.apiUrl}/cursos`, especialidad);
  }

  public getByIdEspecialidad(id: string) {
    return this.http.get<Curso>(`${environment.apiUrl}/cursos/${id}`);
  }

  public putEspecialidad(especialidad: CursoDto) {
    return this.http.put<Curso>(`${environment.apiUrl}/cursos/${especialidad._id}`, especialidad);
  }

}

