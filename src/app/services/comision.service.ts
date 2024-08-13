import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comision, ComisionDto } from '../entities/comision';
import { ComisionFilter } from '../entities/filter';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ComisionService {

  constructor(private http:HttpClient) { }

  get(filters:ComisionFilter){
    return this.http.get<Comision[]>(`${environment.apiUrl}/comisiones?mostrarPlan=${filters.mostrarPlan}`);
  }

  getById(id:string){
    return this.http.get<Comision>(`${environment.apiUrl}/comisiones/${id}`);
  }
  
  post(comision:ComisionDto){
    return this.http.post<Comision>(`${environment.apiUrl}/comisiones`, comision);
  }

  put(comision:ComisionDto){
    return this.http.put<Comision>(`${environment.apiUrl}/comisiones/${comision._id}`, comision);
  }
}
