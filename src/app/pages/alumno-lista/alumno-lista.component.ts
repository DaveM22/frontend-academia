import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { GetAlumnosAction } from '../../store/actions/api/persona.action';
import { PersonaState } from '../../store/states/api/persona.state';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';

@Component({
  selector: 'app-alumno-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, EspecialidadBorrarComponent, MessagesModule, PanelModule, ToastModule, IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './alumno-lista.component.html',
  styleUrl: './alumno-lista.component.scss'
})
export class AlumnoListaComponent implements OnInit {
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
