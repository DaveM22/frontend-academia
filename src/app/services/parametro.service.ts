import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parametro } from '../entities/parametro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http:HttpClient) { }

  
  public getall(): Observable<Parametro[]> {
    return this.http.get<Parametro[]>(`${environment.apiUrl}/parametros`);
  }

  public edit(parametro: Parametro): Observable<Parametro> {
    return this.http.put<Parametro>(`${environment.apiUrl}/parametros/${parametro._id}`, parametro);
  }

  public getByNombre(nombre: string): Observable<Parametro> {
    return this.http.get<Parametro>(`${environment.apiUrl}/parametros/${nombre}`);
  }

}
