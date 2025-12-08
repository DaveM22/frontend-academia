import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-aviso-carga-notas',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './aviso-carga-notas.component.html',
  styleUrl: './aviso-carga-notas.component.scss'
})
export class AvisoCargaNotasComponent {
  constructor(private router: Router) {}

  volverAInscriptos() {
    this.router.navigate(['docente/cursos-asignados']);
  }
}
