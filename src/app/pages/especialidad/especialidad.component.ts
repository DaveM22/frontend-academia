import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Especialidad } from '../../entities/especialidad';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { GetEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { ButtonModule } from 'primeng/button';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';
import { ShowModalDelete } from '../../store/actions/pages/especialidad.action';
import { MessagesModule } from 'primeng/messages';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, EspecialidadBorrarComponent, MessagesModule, PanelModule, ToastModule],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.scss'
})
export class EspecialidadComponent implements OnInit {

  public especialidades$: Observable<Especialidad[]> = this.store.select(EspecialidadState.getEspecialidades)

  public loading$:Observable<boolean> = this.store.select(EspecialidadState.getLoading);

  public error$:Observable<boolean> = this.store.select(EspecialidadState.getError);

  public errorMessage$:Observable<string> = this.store.select(EspecialidadState.getErrorMessage);

  public especialidad!:Especialidad;
  constructor(private store:Store, private router:Router){
    
  }


  ngOnInit(): void {
    this.store.dispatch(new GetEspecialidadAction());
    this.especialidades$.subscribe(x => {

    })
  }


  showModal(esp:Especialidad){
    this.especialidad = esp;
    this.store.dispatch(new ShowModalDelete(true));
  }

  redirectNewEspecialidad(){
    this.router.navigate(["/especialidades/nuevo"]);
  }

  redirectEditEspecialidad(id:string){
    this.router.navigate(["/especialidades/editar/" + id])
  }

  especialidades!: Especialidad[];
  title = 'academia';
}
