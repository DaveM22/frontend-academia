import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Especialidad } from '../../entities/especialidad';
import { GetEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { ShowModalDelete } from '../../store/actions/pages/especialidad.action';
import { AsignarEspecialidadId } from '../../store/actions/pages/navigate.action';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
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
  selector: 'app-especialidad-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, EspecialidadBorrarComponent, MessagesModule, PanelModule, ToastModule, IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './especialidad-lista.component.html',
  styleUrl: './especialidad-lista.component.scss'
})
export class EspecialidadListaComponent implements OnInit {

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
    this.router.navigate(["especialidades/nuevo"]);
  }

  redirectEditEspecialidad(id:string){
    this.router.navigate([`especialidades/editar/${id}`])
  }

  especialidades!: Especialidad[];
  title = 'academia';
}
