import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PersonaState } from '../../store/states/api/persona.state';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { Store } from '@ngxs/store';

import { ClearAlumnoListAction, GetAlumnosAction } from '../../store/actions/api/persona.action';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { AlumnoFilter, PlanFilter } from '../../entities/filter';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';
import { Especialidad } from '../../entities/especialidad';
import { Plan } from '../../entities/plan';
import { AppPageState } from '../../store/states/page/app.state';
import { GetPlanAction } from '../../store/actions/api/planes.action';
import { ClearSelectedPersona } from '../../store/actions/pages/persona.action';
import { ClearSelectedPlanFilter, ClearSelectedPlanInModal, SelectedEspecialidadFilterAction, SelectedPlanFilter } from '../../store/actions/pages/app.action';
import { AsignSelectedPlan } from '../../store/actions/pages/plan.action';
import { ClearMateriasAction } from '../../store/actions/api/materia.action';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MateriaState } from '../../store/states/api/materia.state';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';

@Component({
  selector: 'app-inscripcion-alumno-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule,BlockUiComponent, MessageModule, InputIconModule, MessagesModule, InputTextModule, EspecialidadFilterComponent, PlanFilterComponent, ProgressSpinnerModule],
  templateUrl: './inscripcion-alumno-lista.component.html',
  styleUrl: './inscripcion-alumno-lista.component.scss'
})
export class InscripcionAlumnoListaComponent implements OnInit, OnDestroy {
  rowsPerPage = 5;
  alumnos$: Observable<Alumno[]> = this.store.select(PersonaState.getAlumnos);
  loading$: Observable<boolean> = this.store.select(AppPageState.getFormLoading);
  error$: Observable<boolean> = this.store.select(PersonaState.getError);
  materias$: Observable<any> = this.store.select(MateriaState.getMaterias);
  especialidadSelected$: Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
  planSelected$: Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInFilter);
  disablePlanDropDown: boolean = true;
  errorMessage$: Observable<string> = this.store.select(PersonaState.getErrorMessage);
  mostrarTip: boolean = true;
  constructor(private store: Store, private router: Router) { }


  ngOnInit(): void {
    this.updateRowsPerPage();
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
        let filter = new AlumnoFilter();
        filter.planId = x._id;
        this.store.dispatch(new GetAlumnosAction(filter));
      }
      else{
        this.store.dispatch(new ClearSelectedPlanFilter());
      }
    })


  }

  @HostListener('window:resize')
  onResize() {
    this.updateRowsPerPage();
  }

  private updateRowsPerPage() {
    const width = window.innerWidth;
    if (width < 600) {
      this.rowsPerPage = 6;
    } else if (width < 960) {
      this.rowsPerPage = 5;
    } else if (width < 1280) {
      this.rowsPerPage = 8;
    } else if (width < 1920) {
      this.rowsPerPage = 10;
    } else {
      this.rowsPerPage = 10;
    }
  }


  redirectToInscripciones(id: string) {
    this.router.navigate([`/inscripciones/alumnos/${id}`]);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearAlumnoListAction);
    this.store.dispatch(new ClearSelectedPlanFilter);
    this.store.dispatch(new ClearMateriasAction);
    this.store.dispatch(new ClearSelectedPlanInModal);
    this.store.dispatch(new ClearSelectedPersona);
  }
}
