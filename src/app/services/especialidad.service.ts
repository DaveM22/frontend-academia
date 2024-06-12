import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../entities/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private http:HttpClient) { }

  public getEspecialidades() : Observable<Especialidad[]>{
    return this.http.get<Especialidad[]>("http://localhost:3000/api/especialidad");
  }
}
