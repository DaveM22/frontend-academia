import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../../entities/plan';
import { PlanPageState } from '../../store/states/page/plan.page.state';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetByIdPlanAction } from '../../store/actions/api/planes.action';
import { CommonModule } from '@angular/common';
import { PlanFormComponent } from '../../components/forms/plan-form/plan-form.component';

@Component({
  selector: 'app-plan-editar',
  standalone: true,
  imports: [CommonModule,PlanFormComponent],
  templateUrl: './plan-editar.component.html',
  styleUrl: './plan-editar.component.scss'
})
export class PlanEditarComponent {

  plan$:Observable<Plan | null> = this.store.select(PlanPageState.getPlanSelected);
  plan!:Plan;
  constructor(private store:Store, private router:ActivatedRoute){
    
  }


  ngOnInit(): void {
    this.plan$.subscribe(x => {
      this.plan = x!;
    })
    this.store.dispatch(new GetByIdPlanAction(this.router.snapshot.params['id']));
  }

}
