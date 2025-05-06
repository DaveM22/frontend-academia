import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { Alumno } from '../../entities/alumno';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, IconFieldModule, InputIconModule, MessagesModule, InputTextModule, ConfirmDialogModule],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss',
  providers:[ConfirmationService]
})
export class InscripcionesComponent implements OnInit  {
  alumno$:Observable<Alumno | null> = this.store.select(PersonaPageState.getAlumnoSelected);
  loading$:Observable<boolean> = this.store.select(PersonaState.getLoading) || this.store.select(AlumnoInscripcionState.getLoading);
  alumno!:Alumno;
  inscripciones:AlumnoInscripcion[]=[]
  showConfirmation$:Observable<boolean> = this.store.select(AppPageState.showModalConfirmation)
  constructor(private store:Store,private route:Router, private router:ActivatedRoute, private messageService:MessageService, private confirmationService: ConfirmationService){}
  inscripcionSelected!:AlumnoInscripcion
  
  ngOnInit(): void {
    let filter = new AlumnoFilter();
    filter.incluirInscripciones = true;
    this.store.dispatch(new GetAlumnoByIdAction(this.router.snapshot.params['id'], filter));

    this.alumno$.subscribe(x => {

      if(x !== null){
        this.alumno = x;
        this.inscripciones = this.alumno.inscripciones;
        this.loading$.subscribe(x => false);
      }
    })

    
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

  redirectToNuevaInscripcion(){
    this.route.navigate([`inscripciones/alumnos/${this.alumno._id}/nuevo`]);
  }

  redirectToInscripcionesalumnos(){
    this.route.navigate([`inscripciones/alumnos/lista`]);
  }

  redirectActualizarInscripcion(inscripcionId:string){
    this.store.dispatch(new UpdateManualLoading(true)).subscribe(() => {
      this.store.dispatch(new GetOneAlumnoInscripcionAction(inscripcionId)).subscribe(() => {
        this.store.dispatch(new UpdateManualLoading(false)).subscribe(() => {
          this.route.navigate([`inscripciones/alumnos/${this.alumno._id}/inscripcion/editar/${inscripcionId}`]);
        })
      });
    })

  }

  

}
