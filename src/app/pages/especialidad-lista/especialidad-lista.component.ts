import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Especialidad } from '../../entities/especialidad';
import { GetByIdEspecialidadAction, GetEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { ShowModalDelete } from '../../store/actions/pages/especialidad.action';
import { AsignarEspecialidadId } from '../../store/actions/pages/navigate.action';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';
import { ScreenSizeService } from '../../services/screen-size.service.service';

@Component({
  selector: 'app-especialidad-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, EspecialidadBorrarComponent, MessageModule, PanelModule, ToastModule, IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './especialidad-lista.component.html',
  styleUrl: './especialidad-lista.component.scss'
})
export class EspecialidadListaComponent implements OnInit {
  screenSize = { width: 0, height: 0 };

    rowsPerPage = 5;
  public especialidades$: Observable<Especialidad[]> = this.store.select(EspecialidadState.getEspecialidades)

  public loading$:Observable<boolean> = this.store.select(EspecialidadState.getLoading);

  public error$:Observable<boolean> = this.store.select(EspecialidadState.getError);

  public errorMessage$:Observable<string> = this.store.select(EspecialidadState.getErrorMessage);




  public especialidad!:Especialidad;
  scrollSize: string = "flex";
  constructor(private store:Store, private router:Router, private screenService:ScreenSizeService){
    
  }


  ngOnInit(): void {
    this.store.dispatch(new GetEspecialidadAction());
  this.updateRowsPerPage(); 
  }


  showModal(esp:Especialidad){
    this.especialidad = esp;
    this.store.dispatch(new ShowModalDelete(true));
  }

  redirectNewEspecialidad(){
    this.router.navigate(["especialidades/nuevo"]);
  }

  redirectEditEspecialidad(id:string){
    this.store.dispatch(new GetByIdEspecialidadAction(id)).subscribe(() => {
      this.router.navigate([`especialidades/editar/${id}`])
    });

  }

  especialidades!: Especialidad[];
  title = 'academia';


  
  @HostListener('window:resize')
  onResize() {
    this.updateRowsPerPage();
  }

    private updateRowsPerPage() {
    const width = window.innerWidth;
    if (width < 600) {
      this.rowsPerPage = 6;
    } else if (width < 960) {
      this.rowsPerPage = 5;
    } else if (width < 1280) {
      this.rowsPerPage = 8;
    } else if (width < 1920) {
      this.rowsPerPage = 10; 
    } else {
      this.rowsPerPage = 10;
    }
  }

}
