import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comision, ComisionDto } from '../entities/comision';
import { ComisionFilter } from '../entities/filter';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComisionService {

  constructor(private http:HttpClient) { }

  get(filters:ComisionFilter){
        let params = new HttpParams();
        params = params.set('mostrarPlan', filters.mostrarPlan)
        if(filters.planId !== ''){
          params = params.set('planId', filters.planId)
        }
    return this.http.get<Comision[]>(`${environment.apiUrl}/comisiones`, { params: params });
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

  delete(id:string){
    return this.http.delete(`${environment.apiUrl}/comisiones/${id}`);
  }
}
