import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelModule],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.scss'
})
export class ProfesorComponent {
}
