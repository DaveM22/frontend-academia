import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Plan } from '../../entities/plan';
import { GetPlanAction, GetPlanByIdWithMateriasAction } from '../../store/actions/api/planes.action';
import { PlanState } from '../../store/states/api/plan.state';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Especialidad } from '../../entities/especialidad';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { GetEspecialidadAction } from '../../store/actions/api/especialidad.action';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessagesModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent implements OnInit {
  public planes$: Observable<Plan[]> = this.store.select(PlanState.getPlanes)

  public loading$:Observable<boolean> = this.store.select(PlanState.getLoading);

  public error$:Observable<boolean> = this.store.select(PlanState.getError);

  public errorMessage$:Observable<string> = this.store.select(PlanState.getErrorMessage);

  public plan!:Plan;
  constructor(private store:Store, private router:Router){
    
  }


  ngOnInit(): void {
    this.planes$.subscribe(x => this.planes = x);

    this.store.dispatch(new GetPlanAction());
  }


  showModal(plan:Plan){
    this.plan = plan;

  }

  redirectToMaterias(id:string){
    this.store.dispatch(new GetPlanByIdWithMateriasAction(id)).subscribe(() => this.router.navigate(["/planes/"+id+"/materias"]));
  }

  redirectNuevoPlan(){
    this.router.navigate(["/planes/nuevo"]);
  }

  redirectEditarPlan(id:string){
    this.router.navigate(["/planes/editar/" + id])
  }

  planes!: Plan[];
  title = 'academia';
}
