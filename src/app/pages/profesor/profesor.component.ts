import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BlockUiComponent } from '../../components/util/block-ui/block-ui.component';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelModule, CardModule, BlockUiComponent],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.scss'
})
export class ProfesorComponent {
}
