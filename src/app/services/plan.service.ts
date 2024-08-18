import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../entities/plan';
import { PlanDto } from '../dtos/plan.dto';
import { PlanFilter } from '../entities/filter';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient) { 
    
  }

  
  public getPlanes(filter:PlanFilter) : Observable<Plan[]>{
    let params = new HttpParams();
    params = params.set('mostrarEspecialidad', filter.mostrarEspecialidad)
    if(filter.especialidadId !== ''){
      params = params.set('especialidadId', filter.especialidadId)
    }
    return this.http.get<Plan[]>(`${environment.apiUrl}/planes`, { params: params});
  }

  public getPlanById(idplan:string, filter:PlanFilter){
    return this.http.get<Plan>(`${environment.apiUrl}/planes/${idplan}?incluirMaterias=${filter.incluirMaterias}`);
  }

  public getPlanesByEspecialidad(idEspecialidad:string) {
    return this.http.get<Plan[]>(`${environment.apiUrl}/planes/especialidad/${idEspecialidad}`);
  }

  public getPlanByIdForCurso(idplan:string) : Observable<Plan>{
    return this.http.get<Plan>(`${environment.apiUrl}/planes/${idplan}/materias/comisiones`);
  }

  public getPlanByIdMaterias(idplan:string) : Observable<Plan>{
    return this.http.get<Plan>(`${environment.apiUrl}/planes/${idplan}/materias`);
  }

  public postPlan(plan:PlanDto){
    return this.http.post<Plan>(`${environment.apiUrl}/planes/`, plan);
  }

  public putPlan(plan:PlanDto){
    return this.http.put<Plan>(`${environment.apiUrl}/planes/${plan._id}`, plan)
  }
}
