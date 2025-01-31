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

@Component({
  selector: 'app-inscripcion-alumno-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule],
  templateUrl: './inscripcion-alumno-lista.component.html',
  styleUrl: './inscripcion-alumno-lista.component.scss'
})
export class InscripcionAlumnoListaComponent implements OnInit {
  alumnos$:Observable<Alumno[]> = this.store.select(PersonaState.getAlumnos);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$:Observable<boolean> = this.store.select(PersonaState.getError);
  errorMessage$:Observable<string> = this.store.select(PersonaState.getErrorMessage);
  constructor(private store:Store, private router:Router){}

  ngOnInit(): void {
    this.store.dispatch(new GetAlumnosAction);
  }

  redirectToInscripciones(id:string){
    this.router.navigate([`/inscripciones/alumnos/${id}`]);
  }
}
