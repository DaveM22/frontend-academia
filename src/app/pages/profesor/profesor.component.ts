import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { PersonaState } from '../../store/states/api/persona.state';
import { Profesor } from '../../entities/profesor';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetProfesoresAction } from '../../store/actions/api/persona.action';
import { Router, RouterModule } from '@angular/router';
import { DocenteFilter } from '../../entities/filter';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelModule],
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
