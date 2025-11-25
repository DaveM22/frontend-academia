import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Plan } from '../../../entities/plan';
import { PlanState } from '../../../store/states/api/plan.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ClearSelectedPlanFilter, SelectedPlanFilter } from '../../../store/actions/pages/app.action';
import { ClearPlanes } from '../../../store/actions/api/planes.action';
import { CommonModule } from '@angular/common';
import { FormsModule, UntypedFormArray } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { ClearMateriaAction } from '../../../store/actions/pages/materia.action';
import { ClearAlumnoListAction } from '../../../store/actions/api/persona.action';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { AppPageState } from '../../../store/states/page/app.state';

@Component({
  selector: 'app-plan-filter',
  standalone: true,
  imports: [SelectModule, CommonModule, FormsModule],
  templateUrl: './plan-filter.component.html',
  styleUrl: './plan-filter.component.scss'
})
export class PlanFilterComponent implements OnInit, OnDestroy  {
  @Input() disable: boolean = false;
  planes$:Observable<Plan[]> = this.store.select(PlanState.getPlanes);
  planSelected$: Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInFilter);
  loading$:Observable<boolean> = this.store.select(PlanState.getLoading);
    @Output() selectionChange = new EventEmitter<Plan | null>();
   plan!:Plan | null;

  constructor(private store:Store){}
  ngOnInit(): void {
    this.planSelected$.subscribe(x => {
      if(x){

        this.plan = x;
      }
      else{
        this.plan = x;
        this.onClear();
      }

    })
  }



  ngOnDestroy(): void {
    this.store.dispatch(new ClearPlanes());
  }

  onChangePlan(){
    this.selectionChange.emit(this.plan)
  }

  onClear(){
    console.log(this.plan)
    this.store.dispatch(new ClearSelectedPlanFilter);
    this.store.dispatch(new ClearAlumnoListAction);
    this.store.dispatch(new ClearMateriaAction);
  }
}
