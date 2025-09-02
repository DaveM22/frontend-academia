import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { EspecialidadFilterComponent } from '../../components/filters/especialidad-filter/especialidad-filter.component';
import { PlanFilterComponent } from '../../components/filters/plan-filter/plan-filter.component';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { AlumnoFilter } from '../../entities/filter';
import { GetAlumnoByIdAction } from '../../store/actions/api/persona.action';
import { AppPageState } from '../../store/states/page/app.state';
import { Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { Persona } from '../../entities/persona';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { PanelModule } from 'primeng/panel';
import { PersonaState } from '../../store/states/api/persona.state';

@Component({
  selector: 'app-catedras-alumno',
  standalone: true,
  imports: [CommonModule,ToolbarModule,PanelModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './catedras-alumno.component.html',
  styleUrl: './catedras-alumno.component.scss'
})
export class CatedrasAlumnoComponent implements OnInit {
  persona$:Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  personaid$:Observable<string> = this.store.select(AppPageState.getPersonId);
  persona!:Alumno;
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading)
  inscripciones:AlumnoInscripcion[] = [];
  constructor(private store:Store){}

  ngOnInit(): void {
    this.personaid$.subscribe(x => {
      if(x !== ''){
        let personId = x;
        let filters = new AlumnoFilter();
        filters.incluirInscripciones = true;
    
         this.store.dispatch(new GetAlumnoByIdAction(personId,filters))
      }
    })

    this.persona$.subscribe(x => {
      if(x !== null){
        this.persona = x;
        this.inscripciones = this.persona.inscripciones;
      }
    })

  }

}
