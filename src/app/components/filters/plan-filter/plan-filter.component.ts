import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Plan } from '../../../entities/plan';
import { PlanState } from '../../../store/states/api/plan.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ClearSelectedPlanFilter, SelectedPlanFilter } from '../../../store/actions/pages/app.action';
import { ClearPlanes } from '../../../store/actions/api/planes.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-plan-filter',
  standalone: true,
  imports: [DropdownModule, CommonModule, FormsModule],
  templateUrl: './plan-filter.component.html',
  styleUrl: './plan-filter.component.scss'
})
export class PlanFilterComponent implements OnDestroy  {
  @Input() disable: boolean = false;
  planes$:Observable<Plan[]> = this.store.select(PlanState.getPlanes);
  loading$:Observable<boolean> = this.store.select(PlanState.getLoading);
  plan!:Plan;

  constructor(private store:Store){}



  ngOnDestroy(): void {
    this.store.dispatch(new ClearPlanes());
  }

  onChangeEspecialidad(){
    this.store.dispatch(new SelectedPlanFilter(this.plan));
  }

  onClear(){
    this.store.dispatch(new ClearSelectedPlanFilter);
  }
}
