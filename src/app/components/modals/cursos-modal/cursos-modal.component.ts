import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../../../entities/curso';
import { CursoPageState } from '../../../store/states/page/curso.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { Store } from '@ngxs/store';
import { CursoState } from '../../../store/states/api/curso.state';
import { EspecialidadFilterComponent } from '../../filters/especialidad-filter/especialidad-filter.component';
import { CursoFilter } from '../../../entities/filter';
import { GetCursoAction } from '../../../store/actions/api/curso.action';
import { Especialidad } from '../../../entities/especialidad';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { PlanFilterComponent } from '../../filters/plan-filter/plan-filter.component';
import { SelectedCursoInModal, ShowCursoModal } from '../../../store/actions/pages/app.action';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-cursos-modal',
  standalone: true,
  imports: [EspecialidadFilterComponent, PlanFilterComponent, ToolbarModule,TableModule, DialogModule, ButtonModule, CommonModule],
  templateUrl: './cursos-modal.component.html',
  styleUrl: './cursos-modal.component.scss'
})
export class CursosModalComponent implements OnInit {
  cursos$:Observable<Curso[]> = this.store.select(CursoState.getCursos);

  showModal$:Observable<boolean> = this.store.select(AppPageState.getShowModalCursos);
  especialidadSelected$:Observable<Especialidad | null> = this.store.select(AppPageState.getSelectedEspecialidad);

  curso!:Curso[]

  constructor(private store:Store){}
  ngOnInit(): void {
    let filter = new CursoFilter();
    filter.planId = '';
    // this.store.dispatch(new GetCursoAction(filter));
  }


  selectCurso(curso:Curso){
    this.store.dispatch(new SelectedCursoInModal(curso));
    this.store.dispatch(new ShowCursoModal(false));
  }

  toggleOffModal(){
    this.store.dispatch(new ShowCursoModal(false));
  }
}
