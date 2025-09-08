import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { BlockableUI } from 'primeng/api';
import { Observable } from 'rxjs';
import { AppPageState } from '../../../store/states/page/app.state';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-ui-general',
  imports: [CommonModule,BlockUIModule, ProgressSpinnerModule],
  templateUrl: './block-ui-general.component.html',
  styleUrl: './block-ui-general.component.css',
  standalone: true
})
export class BlockUiGeneralComponent {

   @Input() target!: BlockableUI;

  constructor(private store:Store){

  }
  public loading$:Observable<boolean> = this.store.select(AppPageState.getGeneralLoading);
}
