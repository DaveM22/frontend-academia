import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Observable } from 'rxjs';
import { Plan } from '../../../entities/plan';
import { Store } from '@ngxs/store';
import { PlanState } from '../../../store/states/api/plan.state';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { Materia } from '../../../entities/materia';
import { SelectedMateriaForCurso as SelectedMateriaInMateria, ShowMateriaModal, ShowMateriasModal } from '../../../store/actions/pages/app.action';

@Component({
  selector: 'app-materias-modal',
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, CommonModule, ToolbarModule],
  templateUrl: './materias-modal.component.html',
  styleUrl: './materias-modal.component.scss'
})

export class MateriasModalComponent implements OnInit {

  plan$:Observable<Plan | null> = this.store.select(PlanPageState.getPlanSelected);
  showModal$:Observable<boolean> = this.store.select(AppPageState.getShowModalMaterias);
  materias!:Materia[]
  constructor(private store:Store){

  }
  ngOnInit(): void {
    this.plan$.subscribe(x => {
      if(x !== null){
        this.materias = x.materias;
      }
    });
  }

  toggleOffModal(){
    this.store.dispatch(new ShowMateriaModal(false));
  }

  selectMateria(materia:Materia){
    this.store.dispatch(new SelectedMateriaInMateria(materia));
    this.store.dispatch(new ShowMateriaModal(false));
  }

}
