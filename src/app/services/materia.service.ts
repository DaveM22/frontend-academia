import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from '../entities/materia';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http:HttpClient) { }

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
