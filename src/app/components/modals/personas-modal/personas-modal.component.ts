import { Component, Input, OnDestroy } from '@angular/core';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { PersonaState } from '../../../store/states/api/persona.state';
import { Persona } from '../../../entities/persona';
import { AppPageState } from '../../../store/states/page/app.state';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ClearSelectedEspecialidadFilter, ClearSelectedPlanFilter, SelectedEspecialidadFilterAction, SelectedPersonaInModalAction, SelectedPlanFilter, ShowPersonaModal, ShowPlanModal } from '../../../store/actions/pages/app.action';
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
import { ClearAlumnoListAction, ClearProfesorListAction, GetAlumnosAction, GetProfesoresAction } from '../../../store/actions/api/persona.action';
import { ClearPlanes, GetPlanAction } from '../../../store/actions/api/planes.action';
import { FormsModule } from '@angular/forms';
import { ClearSelectedEspecialidad } from '../../../store/actions/pages/especialidad.action';

@Component({
  selector: 'app-personas-modal',
  imports: [FormsModule, CommonModule, TableModule, DialogModule, ButtonModule, ToolbarModule, PlanFilterComponent, EspecialidadFilterComponent, EspecialidadFilterComponent, SelectModule],
  templateUrl: './personas-modal.component.html',
  styleUrl: './personas-modal.component.css'
})
export class PersonasModalComponent implements OnDestroy {

  profesores$: Observable<Persona[]> = this.store.select(PersonaState.getProfesores);
  alumnos$: Observable<Persona[]> = this.store.select(PersonaState.getAlumnos);
  showModal$: Observable<boolean> = this.store.select(AppPageState.getShowModalPersonas);
  planes$: Observable<Plan[]> = this.store.select(PlanState.getPlanes);
  especiliadadSelected$: Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  planSelected$: Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInFilter);
  personas: Persona[] = []
  disableTipos: boolean = true;
  tiposUsuarios: object[] = [{ name: 'Alumno', val: "ALUMNO" }, { name: 'Profesor', val: "PROFESOR" }];
  tipoUsuarioSelected!: any
  disablePlanDropDown: boolean = true;
  especialidad: Especialidad | null = null;
  plan: Plan | null = null;
  constructor(private store: Store) { }


  ngOnDestroy(): void {
    this.store.dispatch(new ClearSelectedPersona);
    this.store.dispatch(new ClearSelectedPlanFilter);
    this.store.dispatch(new ClearSelectedEspecialidadFilter);
    this.store.dispatch(new ClearAlumnoListAction);
    this.store.dispatch(new ClearProfesorListAction);
  }

  async ngOnInit(): Promise<void> {
    const especialidad = await firstValueFrom(this.especiliadadSelected$.pipe(filter(x => x !== null)));
    if (especialidad) {
      this.disablePlanDropDown = false;
      let filter = new PlanFilter();
      filter.especialidadId = especialidad!._id;
      this.store.dispatch(new GetPlanAction(filter))
    }
    else {
      this.store.dispatch(new ClearSelectedPlanFilter);
      this.disablePlanDropDown = true;
    }

    this.plan = await firstValueFrom(this.planSelected$.pipe(filter(x => x !== null)));
    if (this.plan) {
      const filter = new AlumnoFilter();
      filter.planId = this.plan!._id;
      this.store.dispatch(new GetAlumnosAction(filter));
      this.disableTipos = false;
    }


  }

  selectProfesor(per: Persona) {
    this.store.dispatch(new SelectedPersonaInModalAction(per));
    this.store.dispatch(new ShowPersonaModal(false));
  }

  async onChangeTipo(): Promise<void> {
    let tipoUsuario = this.tipoUsuarioSelected;
    if (tipoUsuario === "ALUMNO") {
      let filter = new AlumnoFilter();
      filter.planId = this.plan!._id;
      this.store.dispatch(new GetAlumnosAction(filter));
    }
    if (tipoUsuario === "PROFESOR") {
      let filter = new DocenteFilter();
      filter.planId = this.plan!._id;
      this.store.dispatch(new GetProfesoresAction(filter));
    }
    this.personas = await firstValueFrom(this.profesores$.pipe(filter(x => x !== null)));
    this.personas = await firstValueFrom(this.alumnos$.pipe(filter(x => x !== null)));
  }

  onClear() {
    this.store.dispatch(new ClearSelectedPersona);
  }

  onEspecialidadChanged(value: Especialidad) {
    this.store.dispatch(new SelectedEspecialidadFilterAction(value))
  }

  onPlanChanged(value: Plan) {
    this.store.dispatch(new SelectedPlanFilter(value));

  }

  onClose(){
    this.toggleOffModal();
  }

  toggleOffModal() {
    this.personas = []
    this.disablePlanDropDown = true;
    this.especialidad = null;
    this.plan = null;
    this.store.dispatch(new ClearSelectedEspecialidad);
    this.store.dispatch(new ClearSelectedPersona);
    this.store.dispatch(new ClearSelectedPlanFilter);
    this.store.dispatch(new ClearSelectedEspecialidadFilter);
    this.store.dispatch(new ClearAlumnoListAction);
    this.store.dispatch(new ClearProfesorListAction);
    this.store.dispatch(new ShowPersonaModal(false));
  }
}
