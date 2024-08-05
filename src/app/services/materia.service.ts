import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from '../entities/materia';
import { environment } from '../../enviroment';
import { MateriaFilter } from '../entities/filter';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http:HttpClient) { }

  public getMateria(filter:MateriaFilter){
    let params = new HttpParams();
    if(filter.planId !== ''){
      params = params.set('planId', filter.planId);
    }
    return this.http.get<Materia[]>(`${environment.apiUrl}/materias`, {params : params});
  }

  public getForInscripcion(filter:MateriaFilter){
    let params = new HttpParams();
    if(filter.planId !== ''){
      params = params.set('planId', filter.planId);
    }
    return this.http.get<Materia[]>(`${environment.apiUrl}/materias/disponibles/${filter.alumnnoId}`, {params : params});
  }

  public postMateria(materia:Materia) {
    return this.http.post<Materia>(`${environment.apiUrl}/materias`, materia);
  }

  public putMateria(materia: Materia){
    const data = {descripcion: materia.descripcion, hsSemanales:materia.hsSemanales, hsTotales: materia.hsTotales}
    return this.http.put<Materia>(`${environment.apiUrl}/materias/${materia._id}`, data);
  }

  public getById(id:string){
    return this.http.get<Materia>(`${environment.apiUrl}/materias/${id}`);
  }


}
