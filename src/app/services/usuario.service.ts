import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { Usuario } from '../entities/usuario';

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
