import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Comision } from '../../../entities/comision';
import { Plan } from '../../../entities/plan';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { Store } from '@ngxs/store';
import { AppPageState } from '../../../store/states/page/app.state';
import { SelectedComisionInModal, ShowComisionesModal, ShowMateriaModal } from '../../../store/actions/pages/app.action';
import { Materia } from '../../../entities/materia';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comisiones-modal',
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, CommonModule],
  templateUrl: './comisiones-modal.component.html',
  styleUrl: './comisiones-modal.component.scss'
})
export class ComisionesModalComponent {
  plan$:Observable<Plan | null> = this.store.select(PlanPageState.getPlanSelected);
  showModal$:Observable<boolean> = this.store.select(AppPageState.getShowModalComisiones);
  comisiones!:Comision[]

  constructor(private store:Store){}

  ngOnInit(): void {
    this.plan$.subscribe(x => {
      if(x !== null){
        this.comisiones = x.comisiones;
      }
    });
  }

  toggleOffModal(){
    this.store.dispatch(new ShowComisionesModal(false));
  }

  selectComision(comision:Comision){
    this.store.dispatch(new SelectedComisionInModal(comision));
    this.store.dispatch(new ShowComisionesModal(false));
  }

}
