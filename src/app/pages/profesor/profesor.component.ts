import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PersonaState } from '../../store/states/api/persona.state';
import { Profesor } from '../../entities/profesor';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetAlumnosAction, GetProfesoresAction } from '../../store/actions/api/persona.action';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessagesModule, PanelModule, IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.scss'
})
export class ProfesorComponent implements OnInit {
  profesores$:Observable<Profesor[]> = this.store.select(PersonaState.getProfesores);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$:Observable<boolean> = this.store.select(PersonaState.getError)
  errorMessage$:Observable<string> = this.store.select(PersonaState.getErrorMessage);

  constructor(private store:Store, private router:Router){

  }

  ngOnInit(): void {
    this.store.dispatch(new GetProfesoresAction);
  }


  redirecToNuevoProfesor(){
    this.router.navigate([`/personas/profesores/nuevo`]);
  }

  redirectToEditarProfesor(id:string){
    this.router.navigate([`/personas/profesores/editar/${id}`]);
  }
}
