import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocenteCursoFilter } from '../entities/filter';
import { DocenteCurso, DocenteCursoDto } from '../entities/docente-curso';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class DocenteCursoService {

  constructor(private http:HttpClient) { }

  public get(filter:DocenteCursoFilter){
    let params = new HttpParams();
    if(filter.cursoId !== ''){
      params = params.set('cursoId', filter.cursoId);
    }
    return this.http.get<DocenteCurso[]>(`${environment.apiUrl}/docentes-cursos`, {params: params})

  }

  public post(docenteCurso:DocenteCursoDto){
    return this.http.post<DocenteCurso>(`${environment.apiUrl}/docentes-cursos`, docenteCurso)
  }
}
