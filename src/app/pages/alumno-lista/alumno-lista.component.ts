import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Alumno } from '../../entities/alumno';
import { DeleteAlumnoAction, GetAlumnoByIdAction, GetAlumnosAction } from '../../store/actions/api/persona.action';
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
import { AppPageState } from '../../store/states/page/app.state';
import { ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { AlumnoFilter } from '../../entities/filter';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-alumno-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule,ConfirmDialogModule, MessagesModule, PanelModule, ToastModule, IconFieldModule, InputTextModule, InputIconModule, DialogModule],
  templateUrl: './alumno-lista.component.html',
  styleUrl: './alumno-lista.component.scss',
  providers:[ConfirmationService]
})
export class AlumnoListaComponent implements OnInit {
  screenSize = { width: 0, height: 0 };
  rowsPerPage = 5;
  alumnos$:Observable<Alumno[]> = this.store.select(PersonaState.getAlumnos);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$:Observable<boolean> = this.store.select(PersonaState.getError)
  errorMessage$:Observable<string> = this.store.select(PersonaState.getErrorMessage);
  showConfirmation$:Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  alumnoSelected!:Alumno
  scrollSize:string = "flex";
  displayAlumnoInfo: boolean = false;
  selectedAlumno: Alumno | null = null;
  constructor(private store:Store, private router:Router, private confirmationService:ConfirmationService, private messageService:MessageService, private screenService:ScreenSizeService){}


  redirecToNuevoAlumno(){
    this.router.navigate(["/alumnos/nuevo"]);
  }

  redirectToEditarAlumno(id:string){
    let filter = new AlumnoFilter();
    filter.incluirInscripciones = false;
    this.store.dispatch(new GetAlumnoByIdAction(id, filter)).subscribe(() => {
      this.router.navigate([`/alumnos/editar/${id}`]);
    })

  }

  ngOnInit(): void {
    this.store.dispatch(new GetAlumnosAction(new AlumnoFilter()));
    this.updateRowsPerPage();
    this.showConfirmation$.subscribe(x => {
      if(x  && this.alumnoSelected){
        this.confirm();
      }
    })

    this.screenService.screenSize$.subscribe((x:any) => {
       this.scrollSize = x.currentTarget.innerWidth > 992 ? 'flex' : '50vh'
    })
  }

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

  confirm() {

    this.confirmationService.confirm({
      header: 'Borrar alumno',
      message: `¿Desea eliminar el siguiente alumno: Legajo:${this.alumnoSelected.legajo} ${this.alumnoSelected.nombre} ${this.alumnoSelected.apellido}  ?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.store.dispatch(new DeleteAlumnoAction(this.alumnoSelected._id))
          .subscribe(() => {
            this.store.dispatch(new ShowModalConfirmationAction(false))
            this.messageService.add({ severity: 'success', summary: 'Borrar comisión', detail: `Se ha borrado el alumno: Legajo:${this.alumnoSelected.legajo} ${this.alumnoSelected.nombre} ${this.alumnoSelected.apellido}` });
          })       
        },
        reject: () => {
          this.store.dispatch(new ShowModalConfirmationAction(false))
        }
    });
}

  modalConfirmar(alumno:Alumno){
    this.alumnoSelected = alumno;
    this.store.dispatch(new ShowModalConfirmationAction(true));
  }

  showAlumnoInfo(alumno: Alumno) {
    this.selectedAlumno = alumno;
    this.displayAlumnoInfo = true;
  }

}
