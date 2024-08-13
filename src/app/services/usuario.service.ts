import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from '../entities/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  public getUsuarios(){
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`)
  }

  public getByIdUsuario(id:string){
    return this.http.get<Usuario>(`${environment.apiUrl}/usuarios/${id}`)
  }
}
