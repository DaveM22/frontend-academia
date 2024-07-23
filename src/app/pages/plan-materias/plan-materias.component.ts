import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { PlanState } from '../../store/states/api/plan.state';
import { Plan } from '../../entities/plan';
import { GetByIdPlanAction, GetPlanByIdWithMateriasAction } from '../../store/actions/api/planes.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from '../../entities/materia';
import { ButtonModule } from 'primeng/button';
import { PlanFilter } from '../../entities/filter';
import { PlanPageState } from '../../store/states/page/plan.page.state';

@Component({
  selector: 'app-plan-materias',
  standalone: true,
  imports: [TableModule, CommonModule, MessagesModule, ButtonModule],
  templateUrl: './plan-materias.component.html',
  styleUrl: './plan-materias.component.scss'
})
export class PlanMateriasComponent implements OnInit {
  error$:Observable<boolean> = this.store.select(PlanState.getError);
  errorMessage$:Observable<string> = this.store.select(PlanState.getErrorMessage);
  loading$:Observable<boolean> = this.store.select(PlanState.getLoading);
  planSelected$:Observable<Plan | null> = this.store.select(PlanPageState.getPlanSelected);
  plan!:Plan;
  materias:Materia[]=[]
  header!:string;
  id!:string;
  constructor(private store:Store,private activadedRoute:ActivatedRoute, private router:Router){

  }
  ngOnInit(): void {
    this.id = this.activadedRoute.snapshot.params['id'];
    const filter = new PlanFilter();
    filter.incluirMaterias = true;
    this.store.dispatch(new GetByIdPlanAction(this.id, filter));
    this.planSelected$.subscribe(x => {
      if(x !== null){
        this.plan = x;
        this.materias = this.plan.materias;
        this.header = this.plan.descripcion;
      }
    })

  }

  redirectMateriaNuevo(){
    this.router.navigate([`/planes/${this.id}/materias/nuevo`]);
  }

  redirectMateriaEditar(materiaId:number){
    this.router.navigate([`/planes/${this.id}/materias/editar/${materiaId}`]);
  }

  redirectPlanes(){
    this.router.navigate(['/planes/lista']);
  }

}
