import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DocenteFilter } from '../../entities/filter';
import { Profesor } from '../../entities/profesor';
import { GetProfesoresAction } from '../../store/actions/api/persona.action';
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
  selector: 'app-profesor-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, EspecialidadBorrarComponent, MessagesModule, PanelModule, ToastModule, IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './profesor-lista.component.html',
  styleUrl: './profesor-lista.component.scss'
})
export class ProfesorListaComponent implements OnInit {
  profesores$:Observable<Profesor[]> = this.store.select(PersonaState.getProfesores);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$:Observable<boolean> = this.store.select(PersonaState.getError)
  errorMessage$:Observable<string> = this.store.select(PersonaState.getErrorMessage);

  constructor(private store:Store, private router:Router){

  }

  ngOnInit(): void {
    let filter = new DocenteFilter();
    this.store.dispatch(new GetProfesoresAction(filter));
  }


  redirecToNuevoProfesor(){
    this.router.navigate([`/personas/profesores/nuevo`]);
  }

  redirectToEditarProfesor(id:string){
    this.router.navigate([`/personas/profesores/editar/${id}`]);
  }
}
