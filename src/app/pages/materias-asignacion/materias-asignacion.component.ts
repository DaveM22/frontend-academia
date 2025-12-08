import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Especialidad } from '../../entities/especialidad';
import { PlanFilter, MateriaFilter } from '../../entities/filter';
import { Materia } from '../../entities/materia';
import { ClearMateriasAction, GetMateriasAction } from '../../store/actions/api/materia.action';
import { ClearPlanes, GetPlanAction } from '../../store/actions/api/planes.action';
import { MateriaState } from '../../store/states/api/materia.state';
import { AppPageState } from '../../store/states/page/app.state';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Message, MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';
import { Route, Router } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { ClearSelectedPlan } from '../../store/actions/pages/plan.action';
import { ClearSelectedEspecialidadFilter, ClearSelectedPlanFilter } from '../../store/actions/pages/app.action';
import { Plan } from '../../entities/plan';
import { ClearSelectedPersona } from '../../store/actions/pages/persona.action';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';

@Component({
  selector: 'app-materias-asignacion',
  standalone: true,
  imports: [CommonModule,ToolbarModule,MessageModule,EspecialidadFilterComponent,PlanFilterComponent,BlockUiComponent ,TableModule, ButtonModule, IconFieldModule, InputIconModule, MessageModule, InputTextModule, ProgressSpinnerModule],
  templateUrl: './materias-asignacion.component.html',
  styleUrl: './materias-asignacion.component.scss'
})
export class MateriasAsignacionComponent implements OnDestroy{
  loading$:Observable<boolean | null> = this.store.select(MateriaState.getLoading);
  especialidadSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  planSelected$:Observable<Plan| null> = this.store.select(AppPageState.getSelectedPlanInFilter);
  materias$:Observable<Materia[]> = this.store.select(MateriaState.getMaterias);
  disablePlanDropDown:boolean = true;
  messages: Message[] | undefined;
  materias!: Materia[];
  mostrarTip: boolean = true;
  plan!:Plan | undefined;


  constructor(private store:Store, private route:Router){}


  ngOnInit(): void {
      
      this.especialidadSelected$.subscribe(x => {
          if (x) {
            this.disablePlanDropDown = false;
            let filter = new PlanFilter();
            filter.especialidadId = x!._id;
            this.store.dispatch(new GetPlanAction(filter));
          }
          else {
            this.store.dispatch(new ClearSelectedPlanFilter);
            this.disablePlanDropDown = true;
          }
        });
    
        this.planSelected$.subscribe(x => {
          if (x) {
              this.plan = x;
              let filter = new MateriaFilter();
              filter.planId = this.plan._id;
              this.store.dispatch(new GetMateriasAction(filter))
              this.mostrarTip = false;
          }
          else{
            this.store.dispatch(new ClearSelectedPlanFilter());
          }
        })
    
    
    


  
    this.materias$.subscribe(x => {
      if(x !== null){
        this.materias = x;
      }
    })

  }


  redirectSeleccionarCurso(id:string) {
    this.store.dispatch(new ClearSelectedPlanFilter)
    this.store.dispatch(new ClearMateriasAction());
    this.store.dispatch(new ClearSelectedEspecialidadFilter);
    this.route.navigate([`asignacion-docentes/${id}/seleccionar-curso`]);
  }

  onPlanChanged(value:Plan){
    if(value){
      this.plan = value;
      let filter = new MateriaFilter();
      filter.planId = value._id;
      this.store.dispatch(new GetMateriasAction(filter))
      this.mostrarTip = false;
    }
    else{
      this.plan = undefined;
      this.store.dispatch(new ClearMateriasAction());
    }
  }


  onEspecialidadChanged(value: Especialidad) {
    if(value){
      this.disablePlanDropDown = false;
      let filter = new PlanFilter();
      filter.especialidadId = value._id;
      this.store.dispatch(new GetPlanAction(filter))
      
    }
    else{
      this.plan = undefined;
      this.store.dispatch(new ClearPlanes);
      this.store.dispatch(new ClearSelectedPlanFilter);
      this.store.dispatch(new ClearMateriasAction());
    }

  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearMateriasAction());
    this.store.dispatch(new ClearSelectedPlanFilter);
    this.store.dispatch(new ClearSelectedEspecialidadFilter);
    this.store.dispatch(new ClearSelectedPersona());
  }

}
