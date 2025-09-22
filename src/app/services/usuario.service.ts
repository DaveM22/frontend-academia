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
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`);
  }

  public getByIdUsuario(id:string){
    return this.http.get<Usuario>(`${environment.apiUrl}/usuarios/${id}`);
  }

  public postUsuario(usr:Usuario){
    return this.http.post<Usuario>(`${environment.apiUrl}/usuarios`, usr);
  }

  public putUsuario(usr:Usuario){
    return this.http.put<Usuario>(`${environment.apiUrl}/usuarios/${usr._id}`, usr);
  }

  public deleteUsuario(id:string){
    return this.http.delete<Usuario>(`${environment.apiUrl}/usuarios/${id}`)
  }
}
