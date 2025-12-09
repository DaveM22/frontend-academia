import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-aviso-carga-notas',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './aviso-carga-notas.component.html',
  styleUrl: './aviso-carga-notas.component.scss'
})
export class AvisoCargaNotasComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  volverAInscriptos() {
    const cursoId = this.route.snapshot.queryParamMap.get('cursoId');
    if (cursoId) {
      this.router.navigate([`docente/cursos-inscripciones/${cursoId}`]);
    } else {
      this.router.navigate(['docente/cursos-asignados']);
    }
  }
}
