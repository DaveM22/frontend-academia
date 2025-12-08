import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { Store } from '@ngxs/store';
import { PersonaState } from '../../store/states/api/persona.state';
import { GetAlumnoByIdAction, GetAlumnosAction } from '../../store/actions/api/persona.action';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { Route, Router, RouterModule } from '@angular/router';
import { EspecialidadFilterComponent } from "../../components/filters/especialidad-filter/especialidad-filter.component";
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { AlumnoFilter } from '../../entities/filter';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';

@Component({
  selector: 'app-inscripcion-alumno',
  standalone: true,
  imports: [CommonModule, PanelModule, RouterModule, CardModule],
  templateUrl: './inscripcion-alumno.component.html',
  styleUrl: './inscripcion-alumno.component.scss'
})
export class InscripcionAlumnoComponent implements OnInit {
  alumnos$:Observable<Alumno[]> = this.store.select(PersonaState.getAlumnos);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$:Observable<boolean> = this.store.select(PersonaState.getError);
  errorMessage$:Observable<string> = this.store.select(PersonaState.getErrorMessage);
  constructor(private store:Store, private router:Router){}

  ngOnInit(): void {
  }

  redirectToInscripciones(id:string){
    this.router.navigate([`/inscripciones/${id}`]);
  }

}
