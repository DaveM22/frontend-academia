import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';
import { Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { Especialidad } from '../../entities/especialidad';
import { AppPageState } from '../../store/states/page/app.state';
import { GetPlanAction, GetPlanByIdWithMateriasAction } from '../../store/actions/api/planes.action';
import { MateriaFilter, PlanFilter } from '../../entities/filter';
import { GetMateriasAction } from '../../store/actions/api/materia.action';
import { Materia } from '../../entities/materia';
import { MateriaState } from '../../store/states/api/materia.state';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-asignacion-profesor',
  standalone: true,
  imports: [RouterModule, PanelModule, CardModule],
  templateUrl: './asignacion-profesor.component.html',
  styleUrl: './asignacion-profesor.component.scss'
})
export class AsignacionProfesorComponent implements OnInit {

  especialidadSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  planSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedPlanInFilter);
  materias$:Observable<Materia[]> = this.store.select(MateriaState.getMaterias);
  disablePlanDropDown:boolean = true;



  constructor(private store:Store){}

  ngOnInit(): void {
    this.especialidadSelected$.subscribe(x => {
      if(x !== null){
        this.disablePlanDropDown = false;
        let filter = new PlanFilter();
        filter.especialidadId = x._id;
        this.store.dispatch(new GetPlanAction(filter))
      }
      else{
        this.disablePlanDropDown = true;
      }
    })

    this.planSelected$.subscribe(x => {
      if(x !== null){
        let filter = new MateriaFilter();
        filter.planId = x._id;
        this.store.dispatch(new GetMateriasAction(filter))
      }
    })
  }



}
