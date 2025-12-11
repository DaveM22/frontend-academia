import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BlockUiGeneralComponent } from '../../components/util/block-ui-general/block-ui-general.component';

@Component({
  selector: 'app-catedras-docente',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, BlockUiGeneralComponent],
  templateUrl: './catedras-docente.component.html',
  styleUrl: './catedras-docente.component.scss'
})
export class CatedrasDocenteComponent {}
