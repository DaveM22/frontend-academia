import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Comision } from '../../entities/comision';
import { Store } from '@ngxs/store';
import { Router, RouterModule } from '@angular/router';
import { ComisionState } from '../../store/states/api/comision.state';
import { GetComision as GetComisionAction } from '../../store/actions/api/comision.action';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ComisionFilter } from '../../entities/filter';
import { CardModule } from 'primeng/card';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { AppPageState } from '../../store/states/page/app.state';
import { BlockUiGeneralComponent } from '../../components/util/block-ui-general/block-ui-general.component';

@Component({
  selector: 'app-comision',
  standalone: true,
  imports: [CommonModule, PanelModule, RouterModule, CardModule, BlockUiGeneralComponent],
  templateUrl: './comision.component.html',
  styleUrl: './comision.component.scss'
})
export class ComisionComponent {
  public loading$:Observable<boolean> = this.store.select(AppPageState.getFormLoading);

  constructor(private store:Store){}
}
