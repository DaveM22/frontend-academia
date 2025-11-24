import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { EspecialidadPageState } from '../../store/states/page/especialidad.state';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { ShowModalDelete } from '../../store/actions/pages/especialidad.action';
import { DeleteEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { Especialidad } from '../../entities/especialidad';
import { ShowModalConfirmationAction } from '../../store/actions/pages/app.action';
@Component({
  selector: 'especialidad-borrar-modal',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule,  CommonModule],
  templateUrl: './especialidad-borrar.component.html',
  styleUrl: './especialidad-borrar.component.scss',
  providers: [ConfirmationService]
})
export class EspecialidadBorrarComponent implements OnInit {
  @Input() especialidad!:Especialidad
  error$:Observable<boolean> = this.store.select(EspecialidadState.getError);
  show$:Observable<boolean> = this.store.select(EspecialidadPageState.getShowModalDelete);
  error:boolean = false
  constructor(private store:Store, private confirmationService: ConfirmationService, private  messageService:MessageService) {}

  ngOnInit(): void {
    this.error$.subscribe(x => {
      this.error = x;
    })

    this.show$.subscribe(x => {
      if(x){
        this.confirm();
      }
    })
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Borrar especialidad',
      message: '¿Desea eliminar la especialidad?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      acceptLabel:'Borrar',
      rejectLabel:'Cancelar',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.accept();
        },
        reject: () => {
          this.reject();
        }
    });
}

accept(){
  this.store.dispatch(new DeleteEspecialidadAction(this.especialidad._id))
  .subscribe(() => {
    console.log(!this.error)
    if(!this.error){
      this.store.dispatch(new ShowModalConfirmationAction(false))
      this.messageService.add({ severity: 'success', summary: 'Borrar especialidad', detail: `Se ha borrado la especialidad: ${this.especialidad.descripcion}` });
    }
    this.store.dispatch(new ShowModalDelete(false))
  })
}

reject(){
  this.store.dispatch(new ShowModalDelete(false))
}

onhide(){
  this.store.dispatch(new ShowModalDelete(false))
}
  
}
