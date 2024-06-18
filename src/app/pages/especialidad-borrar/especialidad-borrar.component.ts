import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { EspecialidadPageState } from '../../store/states/page/especialidad.state';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { ShowModalDelete } from '../../store/actions/pages/especialidad.action';
import { DeleteEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { Especialidad } from '../../entities/especialidad';
@Component({
  selector: 'especialidad-borrar-modal',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule,  CommonModule],
  templateUrl: './especialidad-borrar.component.html',
  styleUrl: './especialidad-borrar.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class EspecialidadBorrarComponent implements OnInit {
  @Input() especialidad!:Especialidad
  show$:Observable<boolean> = this.store.select(EspecialidadPageState.getShowModalDelete);
  constructor(private store:Store, private confirmationService: ConfirmationService){

  }


  ngOnInit(): void {
    this.show$.subscribe(x => {
      if(x){
        this.confirm();
      }
    })
  }

  

  confirm() {

    this.confirmationService.confirm({
      header: 'Borrar especialidad',
      message: '¿Desea eleminar la especialidad?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.store.dispatch(new DeleteEspecialidadAction(this.especialidad._id));
          this.store.dispatch(new ShowModalDelete(false))
        },
        reject: () => {
          this.store.dispatch(new ShowModalDelete(false))
        }
    });
}
  
}
