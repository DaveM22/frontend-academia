import { Component, OnInit } from '@angular/core';
import { Plan } from '../../entities/plan';
import { PlanFormComponent } from '../../components/forms/plan-form/plan-form.component';
import { Store } from '@ngxs/store';
import { GetEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { AsignSelectedPlan } from '../../store/actions/pages/plan.action';

@Component({
  selector: 'app-plan-nuevo',
  standalone: true,
  imports: [PlanFormComponent],
  templateUrl: './plan-nuevo.component.html',
  styleUrl: './plan-nuevo.component.scss'
})
export class PlanNuevoComponent implements OnInit {
  constructor(private store:Store){}
  ngOnInit(): void {
    this.store.dispatch([new GetEspecialidadAction, new AsignSelectedPlan(new Plan())]);

  }
  plan:Plan = new Plan();
}
