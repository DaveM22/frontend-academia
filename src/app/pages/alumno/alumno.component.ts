import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { PersonaState } from '../../store/states/api/persona.state';
import { Alumno } from '../../entities/alumno';
import { Router } from '@angular/router';
import { GetAlumnosAction } from '../../store/actions/api/persona.action';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessagesModule, PanelModule, InputTextModule, InputIconModule, IconFieldModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.scss'
})
export class AlumnoComponent implements OnInit {
  alumnos$:Observable<Alumno[]> = this.store.select(PersonaState.getAlumnos);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$:Observable<boolean> = this.store.select(PersonaState.getError)
  errorMessage$:Observable<string> = this.store.select(PersonaState.getErrorMessage);

  constructor(private store:Store, private router:Router){}


  redirecToNuevoAlumno(){
    this.router.navigate(["/personas/alumnos/nuevo"]);
  }

  redirectToEditarAlumno(id:string){
    this.router.navigate([`/personas/alumnos/editar/${id}`]);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAlumnosAction);
  }

}
