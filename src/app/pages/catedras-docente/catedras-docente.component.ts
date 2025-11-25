import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-catedras-docente',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule],
  templateUrl: './catedras-docente.component.html',
  styleUrl: './catedras-docente.component.scss'
})
export class CatedrasDocenteComponent {}
