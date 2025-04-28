import { Component, OnInit } from '@angular/core';
import { PersonaState } from '../../store/states/api/persona.state';
import { Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { Store } from '@ngxs/store';

import { GetAlumnosAction } from '../../store/actions/api/persona.action';
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

@Component({
  selector: 'app-inscripcion-alumno-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule,EspecialidadFilterComponent, PlanFilterComponent],
  templateUrl: './inscripcion-alumno-lista.component.html',
  styleUrl: './inscripcion-alumno-lista.component.scss'
})
export class InscripcionAlumnoListaComponent implements OnInit {
  alumnos$:Observable<Alumno[]> = this.store.select(PersonaState.getAlumnos);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$:Observable<boolean> = this.store.select(PersonaState.getError);
    especialidadSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);
    planSelected$:Observable<Plan | null> = this.store.select(AppPageState.getSelectedPlanInFilter);
    disablePlanDropDown:boolean = true;
  errorMessage$:Observable<string> = this.store.select(PersonaState.getErrorMessage);
  constructor(private store:Store, private router:Router){}

  ngOnInit(): void {

        this.especialidadSelected$.subscribe(x => {
          if(x){
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
          if(x){
            const filter = new AlumnoFilter();
            filter.planId = x._id;
            this.store.dispatch(new GetAlumnosAction(filter));
          }
        })
  }

  redirectToInscripciones(id:string){
    this.router.navigate([`/inscripciones/alumnos/${id}`]);
  }
}
