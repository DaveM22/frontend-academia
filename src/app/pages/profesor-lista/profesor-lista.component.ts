import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DocenteFilter } from '../../entities/filter';
import { Profesor } from '../../entities/profesor';
import { DeleteProfesorAction, GetProfesorByIdAction, GetProfesoresAction } from '../../store/actions/api/persona.action';
import { PersonaState } from '../../store/states/api/persona.state';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { EspecialidadBorrarComponent } from '../especialidad-borrar/especialidad-borrar.component';
import { AppPageState } from '../../store/states/page/app.state';
import { LoadingForm, ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-profesor-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule,ConfirmDialogModule, MessageModule, PanelModule, IconFieldModule, InputTextModule, InputIconModule, DialogModule],
  templateUrl: './profesor-lista.component.html',
  styleUrl: './profesor-lista.component.scss',
  providers:[ConfirmationService]
})
export class ProfesorListaComponent implements OnInit {
  rowsPerPage = 5;
  profesores$: Observable<Profesor[]> = this.store.select(PersonaState.getProfesores);
  loading$: Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$: Observable<boolean> = this.store.select(PersonaState.getError)
  errorMessage$: Observable<string> = this.store.select(PersonaState.getErrorMessage);
  showConfirmation$: Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  profesorSelected!: Profesor;
  scrollSize: string = 'flex';
  displayProfesorInfo: boolean = false;
  selectedProfesor: Profesor | null = null;
  constructor(private store: Store, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private screenService:ScreenSizeService) {}

  ngOnInit(): void {
    let filter = new DocenteFilter();
    this.store.dispatch(new GetProfesoresAction(filter))
    this.updateRowsPerPage();
    this.showConfirmation$.subscribe(x => {
      if (x && this.profesorSelected) {
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
      header: 'Borrar profesor',
      message: `¿Desea eliminar el siguiente profesor: Legajo:${this.profesorSelected.legajo} ${this.profesorSelected.nombre} ${this.profesorSelected.apellido}  ?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(new DeleteProfesorAction(this.profesorSelected._id))
          .subscribe(() => {
            this.store.dispatch(new ShowModalConfirmationAction(false))
            this.messageService.add({ severity: 'success', summary: 'Borrar profesor', detail: `Se ha borrado el profesor: Legajo:${this.profesorSelected.legajo} ${this.profesorSelected.nombre} ${this.profesorSelected.apellido}` });
          })
      },
      reject: () => {
        this.store.dispatch(new ShowModalConfirmationAction(false))
      }
    });
  }

  modalConfirmar(profesor:Profesor){
    this.profesorSelected = profesor;
    this.store.dispatch(new ShowModalConfirmationAction(true));
  }

  redirecToNuevoProfesor() {
    this.router.navigate([`profesores/nuevo`]);
  }

  redirectToEditarProfesor(id: string) {
     this.store.dispatch(new LoadingForm(true));
     const docenteFilter = new DocenteFilter();
     this.store.dispatch(new GetProfesorByIdAction(id, docenteFilter)).subscribe(() => {
          this.store.dispatch(new LoadingForm(false));
          this.router.navigate([`profesores/editar/${id}`]);
     });
  }

  showProfesorInfo(profesor: Profesor) {
    this.selectedProfesor = profesor;
    this.displayProfesorInfo = true;
  }
}
