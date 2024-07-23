import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Profesor } from '../../../entities/profesor';
import { Observable } from 'rxjs';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { Store } from '@ngxs/store';
import { AppPageState } from '../../../store/states/page/app.state';
import { PersonaState } from '../../../store/states/api/persona.state';
import { SelectedDocenteInModal, ShowDocenteModal } from '../../../store/actions/pages/app.action';
import { GetProfesoresAction } from '../../../store/actions/api/persona.action';
import { DocenteFilter } from '../../../entities/filter';

@Component({
  selector: 'app-docente-modal',
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, CommonModule],
  templateUrl: './docente-modal.component.html',
  styleUrl: './docente-modal.component.scss'
})
export class DocenteModalComponent implements OnInit {
  @Input({required: true}) cursoId!:string;
  @Input({ required: true}) planId!:string;
  profesores:Observable<Profesor[]> = this.store.select(PersonaState.getProfesores);
  showModal$:Observable<boolean> = this.store.select(AppPageState.getShowModalDocentes);


  constructor(private store:Store){}



  ngOnInit(): void {
    let filter = new DocenteFilter();
    filter.cursoId = this.cursoId
    filter.planId = this.planId;
    console.log(this.planId);
    this.store.dispatch(new GetProfesoresAction(filter));
  }

  selectProfesor(profesor:Profesor){
    this.store.dispatch(new SelectedDocenteInModal(profesor));
    this.store.dispatch(new ShowDocenteModal(false));
  }


  toggleOffModal(){
    this.store.dispatch(new ShowDocenteModal(false));
  }
}
