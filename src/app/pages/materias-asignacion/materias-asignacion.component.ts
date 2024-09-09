import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Especialidad } from '../../entities/especialidad';
import { PlanFilter, MateriaFilter } from '../../entities/filter';
import { Materia } from '../../entities/materia';
import { GetMateriasAction } from '../../store/actions/api/materia.action';
import { GetPlanAction } from '../../store/actions/api/planes.action';
import { MateriaState } from '../../store/states/api/materia.state';
import { AppPageState } from '../../store/states/page/app.state';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Messages, MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';
import { Route, Router } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-materias-asignacion',
  standalone: true,
  imports: [CommonModule,ToolbarModule,MessagesModule,EspecialidadFilterComponent,PlanFilterComponent, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './materias-asignacion.component.html',
  styleUrl: './materias-asignacion.component.scss'
})
export class MateriasAsignacionComponent {

  especialidadSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  planSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedPlanInFilter);
  materias$:Observable<Materia[]> = this.store.select(MateriaState.getMaterias);
  disablePlanDropDown:boolean = true;
  messages: Messages[] | undefined;
  materias!: Materia[];


  constructor(private store:Store, private route:Router){}

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

    this.materias$.subscribe(x => {
      if(x){
        this.materias = x;
      }
    })



    this.planSelected$.subscribe(x => {
      if(x){
        let filter = new MateriaFilter();
        filter.planId = x._id;
        this.store.dispatch(new GetMateriasAction(filter))
      }
      else{
        this.materias = [];
      }
    })
  }


  redirectSeleccionarCurso(id:string) {
    this.route.navigate([`asignacion-docentes/${id}/seleccionar-curso`]);
  }

}
