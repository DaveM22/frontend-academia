import { Component, Input, OnDestroy } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { PersonaState } from '../../../store/states/api/persona.state';
import { Persona } from '../../../entities/persona';
import { AppPageState } from '../../../store/states/page/app.state';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ClearSelectedEspecialidadFilter, ClearSelectedPlanFilter, SelectedPersonaInModal, ShowPersonaModal, ShowPlanModal } from '../../../store/actions/pages/app.action';
import { CommonModule } from '@angular/common';
import { AlumnoFilter, DocenteFilter, PlanFilter } from '../../../entities/filter';
import { PlanFilterComponent } from '../../filters/plan-filter/plan-filter.component';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadFilterComponent } from '../../filters/especialidad-filter/especialidad-filter.component';
import { EspecialidadComponent } from "../../../pages/especialidad/especialidad.component";
import { SelectModule } from 'primeng/select';
import { Plan } from '../../../entities/plan';
import { PlanState } from '../../../store/states/api/plan.state';
import { Especialidad } from '../../../entities/especialidad';
import { ClearSelectedPersona } from '../../../store/actions/pages/persona.action';
import { GetAlumnosAction, GetProfesoresAction } from '../../../store/actions/api/persona.action';
import { ClearPlanes, GetPlanAction } from '../../../store/actions/api/planes.action';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personas-modal',
  imports: [FormsModule, CommonModule, TableModule, DialogModule, ButtonModule, ToolbarModule, PlanFilterComponent, EspecialidadFilterComponent, EspecialidadFilterComponent, SelectModule],
  templateUrl: './personas-modal.component.html',
  styleUrl: './personas-modal.component.css'
})
export class PersonasModalComponent implements OnDestroy {

  profesores$:Observable<Persona[]> = this.store.select(PersonaState.getProfesores);
  alumnos$:Observable<Persona[]> = this.store.select(PersonaState.getAlumnos);
  showModal$:Observable<boolean> = this.store.select(AppPageState.getShowModalPersonas);
  planes$:Observable<Plan[]> = this.store.select(PlanState.getPlanes);
  especiliadadSelected$: Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  planSelected$:Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInFilter);
  personas:Persona[] = []
  disableTipos:boolean = true;
  tiposUsuarios:object[] = [{name:'Alumno', val:"ALUMNO"}, {name:'Profesor', val:"PROFESOR"}];
  tipoUsuarioSelected!:any

  plan!:Plan;
  constructor(private store:Store){}


  ngOnDestroy(): void {
    this.store.dispatch(new ClearSelectedPersona);
    this.store.dispatch(new ClearSelectedPlanFilter);
    this.store.dispatch(new ClearSelectedEspecialidadFilter);
  }

  ngOnInit(): void {
    this.alumnos$.subscribe(x => {
      if(x){
        this.personas = x;
      }
    })

    this.profesores$.subscribe(x => {
      if(x){
        this.personas = x;
      }
    })

    this.especiliadadSelected$.subscribe(x => {
      if(x){
        let planFilter = new PlanFilter();
        planFilter.especialidadId = x._id;
        this.store.dispatch(new GetPlanAction(planFilter))
      }
      else{
        this.disableTipos = true;
        this.store.dispatch(new ClearSelectedPlanFilter)
        this.personas = [];
      }
    })

    this.planSelected$.subscribe(x => {
      if(x){
        this.plan = x;
        this.disableTipos = false;
      }
      else{
        this.disableTipos = true;
        this.personas = [];
      }
    })
  }

  selectProfesor(per:Persona){
    this.store.dispatch(new SelectedPersonaInModal(per));
    this.store.dispatch(new ShowPlanModal(false));
  }

  onChangeTipo(){
    let tipoUsuario = this.tipoUsuarioSelected;
    if(tipoUsuario === "ALUMNO"){
      let filter = new AlumnoFilter();
      filter.planId = this.plan._id;
      this.store.dispatch(new GetAlumnosAction(filter));
    }
    if(tipoUsuario === "PROFESOR"){
      let filter = new DocenteFilter();
      filter.planId = this.plan._id;
      this.store.dispatch(new GetProfesoresAction(filter));
    }
    this.personas = [];
  }

  onClear(){
    this.store.dispatch(new ClearSelectedPersona);
  }


  toggleOffModal(){
    this.store.dispatch(new ShowPersonaModal(false));
  }
}
