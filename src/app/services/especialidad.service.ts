import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../entities/especialidad';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private http: HttpClient) { }

  public getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${environment.apiUrl}/especialidades`);
  }

  public deleteEspecialidad(id: string) {
    return this.http.delete(`${environment.apiUrl}/especialidades/${id}`);
  }

  public postEspecialidad(especialidad: Especialidad) {
    return this.http.post<Especialidad>(`${environment.apiUrl}/especialidades`, especialidad);
  }

  public getByIdEspecialidad(id: string) {
    return this.http.get<Especialidad>(`${environment.apiUrl}/especialidades/${id}`);
  }

  public putEspecialidad(especialidad: Especialidad) {
    return this.http.put<Especialidad>(`${environment.apiUrl}/especialidades/${especialidad._id}`, especialidad);
  }

}
