import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlanFilter } from '../../entities/filter';
import { Plan } from '../../entities/plan';
import { GetPlanAction, GetPlanByIdWithMateriasAction } from '../../store/actions/api/planes.action';
import { PlanState } from '../../store/states/api/plan.state';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';

@Component({
  selector: 'app-plan-lista',
  standalone: true,
  imports: [CommonModule,ToolbarModule,EspecialidadFilterComponent,PlanFilterComponent, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './plan-lista.component.html',
  styleUrl: './plan-lista.component.scss'
})
export class PlanListaComponent implements OnInit {
  public planes$: Observable<Plan[]> = this.store.select(PlanState.getPlanes)

  public loading$:Observable<boolean> = this.store.select(PlanState.getLoading);

  public error$:Observable<boolean> = this.store.select(PlanState.getError);

  public errorMessage$:Observable<string> = this.store.select(PlanState.getErrorMessage);

  public plan!:Plan;
  constructor(private store:Store, private router:Router){
    
  }


  ngOnInit(): void {
    this.planes$.subscribe(x => this.planes = x);
    let filter = new PlanFilter();
    filter.mostrarEspecialidad = true
    this.store.dispatch(new GetPlanAction(filter));
  }


  showModal(plan:Plan){
    this.plan = plan;

  }

  redirectToMaterias(id:string){
    this.store.dispatch(new GetPlanByIdWithMateriasAction(id)).subscribe(() => this.router.navigate(["/planes/"+id+"/materias"]));
  }

  redirectNuevoPlan(){
    this.router.navigate(["planes/nuevo"]);
  }

  redirectEditarPlan(id:string){
    this.router.navigate(["planes/editar/" + id])
  }

  planes!: Plan[];
  title = 'academia';
}
