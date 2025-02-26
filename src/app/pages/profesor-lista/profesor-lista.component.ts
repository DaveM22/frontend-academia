import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DocenteFilter } from '../../entities/filter';
import { Profesor } from '../../entities/profesor';
import { DeleteProfesorAction, GetProfesoresAction } from '../../store/actions/api/persona.action';
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

@Component({
  selector: 'app-profesor-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule,ConfirmDialogModule, MessagesModule, PanelModule, ToastModule, IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './profesor-lista.component.html',
  styleUrl: './profesor-lista.component.scss',
  providers:[ConfirmationService]
})
export class ProfesorListaComponent implements OnInit {
  profesores$: Observable<Profesor[]> = this.store.select(PersonaState.getProfesores);
  loading$: Observable<boolean> = this.store.select(PersonaState.getLoading);
  error$: Observable<boolean> = this.store.select(PersonaState.getError)
  errorMessage$: Observable<string> = this.store.select(PersonaState.getErrorMessage);
  showConfirmation$: Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  profesorSelected!: Profesor;
  scrollSize: string = 'flex';
  constructor(private store: Store, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private screenService:ScreenSizeService) {}

  ngOnInit(): void {
    let filter = new DocenteFilter();
    this.store.dispatch(new GetProfesoresAction(filter))
    this.showConfirmation$.subscribe(x => {
      if (x && this.profesorSelected) {
        this.confirm();
      }
    })

    this.screenService.screenSize$.subscribe((x:any) => {
      this.scrollSize = x.currentTarget.innerWidth > 992 ? 'flex' : '50vh'
   })
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
    this.router.navigate([`profesores/editar/${id}`]);
  }
}
