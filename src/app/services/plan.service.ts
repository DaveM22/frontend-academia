import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../entities/plan';
import { PlanDto } from '../dtos/plan.dto';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient) { 
    
  }

  
  public getPlanes() : Observable<Plan[]>{
    return this.http.get<Plan[]>(`${environment.apiUrl}/plan`);
  }

  public getPlanById(idplan:string){
    return this.http.get<Plan>(`${environment.apiUrl}/plan/${idplan}`);
  }

  public getPlanByIdMaterias(idplan:string) : Observable<Plan>{
    return this.http.get<Plan>(`${environment.apiUrl}/plan/${idplan}/materias`);
  }

  public postPlan(plan:PlanDto){
    return this.http.post<Plan>(`${environment.apiUrl}/plan/`, plan);
  }

  public putPlan(plan:PlanDto){
    return this.http.put<Plan>(`${environment.apiUrl}/plan/${plan._id}`, plan)
  }
}
