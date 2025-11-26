import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { Alumno } from '../../entities/alumno';
import { Store } from '@ngxs/store';
import { firstValueFrom, Observable, filter } from 'rxjs';
import { Persona } from '../../entities/persona';
import { PersonaState } from '../../store/states/api/persona.state';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { GetAlumnoByIdAction, GetAlumnoByIdWithInscripcionesAction, UpdateManualLoading } from '../../store/actions/api/persona.action';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoFilter } from '../../entities/filter';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DeleteAlumnoInscripcionAction, GetOneAlumnoInscripcionAction } from '../../store/actions/api/alumno-inscripcion.action';
import { AppPageState } from '../../store/states/page/app.state';
import { ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
import { AlumnoInscripcionState } from '../../store/states/api/alumno-incripcion.state';
import { ClearMateriaAction } from '../../store/actions/pages/materia.action';
import { ClearMateriasAction } from '../../store/actions/api/materia.action';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule, ConfirmDialogModule, ProgressSpinnerModule],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss',
  providers: [ConfirmationService]
})
export class InscripcionesComponent implements OnInit, OnDestroy {
  alumno$: Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  loading$: Observable<boolean> = this.store.select(PersonaState.getLoading) || this.store.select(AlumnoInscripcionState.getLoading);
  alumno!: Alumno;
  inscripciones: AlumnoInscripcion[] = []
  showConfirmation$: Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  rowsPerPage: number = 6;

  constructor(private store: Store, private route: Router, private router: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateRowsPerPage();
  }

  updateRowsPerPage() {
    const width = window.innerWidth;
    if (width < 600) {
      this.rowsPerPage = 6;
    } else if (width < 960) {
      this.rowsPerPage = 5;
    } else if (width < 1280) {
      this.rowsPerPage = 8;
    } else {
      this.rowsPerPage = 10;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearMateriasAction);
  }
  inscripcionSelected!: AlumnoInscripcion

  async ngOnInit(): Promise<void> {
    this.updateRowsPerPage();
    let filterAlumno = new AlumnoFilter();
    filterAlumno.incluirInscripciones = true;
    this.store.dispatch(new UpdateManualLoading(true));
    await firstValueFrom(this.store.dispatch(new GetAlumnoByIdAction(this.router.snapshot.params['id'], filterAlumno)));

    const alumno = await firstValueFrom(this.alumno$.pipe(filter(a => a !== null)));
    this.alumno = alumno;
    this.inscripciones = this.alumno.inscripciones;

    this.store.dispatch(new UpdateManualLoading(false));


  }


  confirm() {
    this.confirmationService.confirm({
      header: 'Borrar curso',
      message: `¿ Desea eliminar el siguiente curso: ${this!} ?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(new DeleteAlumnoInscripcionAction(this.inscripcionSelected._id))
          .subscribe(() => {
            this.store.dispatch(new ShowModalConfirmationAction(false))
            this.messageService.add({ severity: 'success', summary: 'Borrar curso', detail: `Se ha borrado el curso: ${this.inscripcionSelected.curso!.descripcion}` });
          })
      },
      reject: () => {
        this.store.dispatch(new ShowModalConfirmationAction(false))
      }
    });
  }

  redirectToNuevaInscripcion() {
    this.route.navigate([`inscripciones/alumnos/${this.alumno._id}/nuevo`]);

  }

  redirectToInscripcionesalumnos() {
    this.store.dispatch(new UpdateManualLoading(true)).subscribe(() => {
      this.store.dispatch(new UpdateManualLoading(false)).subscribe(() => {
        this.route.navigate([`inscripciones/alumnos/lista`]);
      })
    })
  }

  redirectActualizarInscripcion(inscripcionId: string) {
    this.store.dispatch(new UpdateManualLoading(true)).subscribe(() => {
      this.store.dispatch(new GetOneAlumnoInscripcionAction(inscripcionId)).subscribe(() => {
        this.store.dispatch(new UpdateManualLoading(false)).subscribe(() => {
          this.route.navigate([`inscripciones/alumnos/${this.alumno._id}/inscripcion/editar/${inscripcionId}`]);
        })
      });
    })

  }



}
