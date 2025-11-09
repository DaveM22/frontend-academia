import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngxs/store';
import { environment } from '../../../environments/environment';
import { RolesUsuario } from '../../entities/enums';
import { combineLatest, take, filter } from 'rxjs';
import { AlumnoMenuComponent } from '../alumno-menu/alumno-menu.component';
import { DocenteMenuComponent } from '../docente-menu/docente-menu.component';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';

@Component({
  selector: 'app-applayout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AlumnoMenuComponent, DocenteMenuComponent, AdminMenuComponent],
  templateUrl: './applayout.component.html',
  styleUrl: './applayout.component.scss'
})
export class ApplayoutComponent implements OnInit {
  isAlumno: boolean = false;
  isDocente: boolean = false;

  constructor(
    private auth: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  private checkUserRole() {
    combineLatest([
      this.auth.isAuthenticated$,
      this.auth.idTokenClaims$
    ]).pipe(
      take(1),
      filter(([isLogged, claims]) => isLogged && claims !== null)
    ).subscribe(([isLogged, claims]) => {
      if (claims) {
        const rol = claims[environment.roleLogin][0];
        this.isAlumno = rol === RolesUsuario.Alumno.toString();
        this.isDocente = rol === RolesUsuario.Docente.toString();
      }
    });
  }
}
