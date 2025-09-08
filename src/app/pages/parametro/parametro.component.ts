import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';
import { AppPageState } from '../../store/states/page/app.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-parametro',
  imports: [RouterModule, CommonModule, PanelModule, CardModule, BlockUiComponent],
  templateUrl: './parametro.component.html',
  styleUrl: './parametro.component.scss',
  standalone: true
})
export class ParametroComponent {
  public loading$:Observable<boolean> = this.store.select(AppPageState.getFormLoading);

  constructor(private store:Store){}
}
