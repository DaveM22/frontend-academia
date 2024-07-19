import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Plan } from '../../../entities/plan';
import { Store } from '@ngxs/store';
import { GetPlanAction, GetPlanesByEspecialidad } from '../../../store/actions/api/planes.action';
import { Observable } from 'rxjs';
import { PlanState } from '../../../store/states/api/plan.state';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadFilterComponent } from '../../filters/especialidad-filter/especialidad-filter.component';
import { Especialidad } from '../../../entities/especialidad';
import { AppPageState } from '../../../store/states/page/app.state';
import { ClearSelectedEspecialidadFilter, SelectedPlanInModal, ShowPlanModal } from '../../../store/actions/pages/app.action';
import { PlanFilter } from '../../../entities/filter';
@Component({
  selector: 'app-planes-modal',
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, CommonModule, ToolbarModule, EspecialidadFilterComponent],
  templateUrl: './planes-modal.component.html',
  styleUrl: './planes-modal.component.scss'
})
export class PlanesModalComponent implements OnInit {
  planes$:Observable<Plan[]> = this.store.select(PlanState.getPlanes);
  especialidadSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  showModal$:Observable<boolean> = this.store.select(AppPageState.getShowModalPlanes);
  @ViewChild('table', { static: true }) teamTable!: Table;
  dialogVisible = false;
  planes: Plan[] = [];
  filters: PlanFilter = new PlanFilter();
  constructor(private store:Store){}

  ngOnInit(): void {


    this.especialidadSelected$.subscribe(x => {
      if(x !== null){
        this.filters.especialidadId = x!._id;
        this.store.dispatch(new GetPlanAction(this.filters));
      }
    })
  }

 seleccionarPlan(plan:Plan){
  this.store.dispatch(new SelectedPlanInModal(plan));
  this.store.dispatch(new ShowPlanModal(false));
 }

  toggleOffModal(){
    this.store.dispatch(new ClearSelectedEspecialidadFilter());
    this.store.dispatch(new ShowPlanModal(false));
  }
}
