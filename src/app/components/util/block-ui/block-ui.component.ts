import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { BlockUI } from 'primeng/blockui';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Observable } from 'rxjs';
import { AppPageState } from '../../../store/states/page/app.state';
import { Store } from '@ngxs/store';
import { BlockableUI } from 'primeng/api';

@Component({
  selector: 'app-block-ui',
  standalone:true,
  imports: [BlockUI, ProgressSpinner, CommonModule],
  templateUrl: './block-ui.component.html',
  styleUrl: './block-ui.component.css'
})
export class BlockUiComponent {

   @Input() target!: BlockableUI;

  constructor(private store:Store){

  }
  public loading$:Observable<boolean> = this.store.select(AppPageState.getFormLoading);
}
