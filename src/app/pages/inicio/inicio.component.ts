import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';
import { AdminInicioComponent } from '../admin-inicio/admin-inicio.component';
import { DocenteInicioComponent } from '../docente-inicio/docente-inicio.component';
import { AlumnoInicioComponent } from '../alumno-inicio/alumno-inicio.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, AdminInicioComponent, DocenteInicioComponent, AlumnoInicioComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  role: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.idTokenClaims$.subscribe((claims) => {
      const roles = (claims?.[environment.roleLogin] as string[]) || [];
      this.role = roles[0] || '';
    });
  }
}
