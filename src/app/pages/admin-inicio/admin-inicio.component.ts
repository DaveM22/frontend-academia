import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DashboardState } from '../../store/states/api/dashboard.state';
import { GetDashboardTotalesAction } from '../../store/actions/api/dashboard.action';

@Component({
  selector: 'app-admin-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-inicio.component.html',
  styleUrl: './admin-inicio.component.scss'
})
export class AdminInicioComponent implements OnInit {
  public loading$: Observable<boolean> = this.store.select(DashboardState.getLoading);
  public alumnosTotalRegistrados$: Observable<number> = this.store.select(DashboardState.getAlumnosTotalRegistrados);
  public profesoresTotalActivos$: Observable<number> = this.store.select(DashboardState.getProfesoresTotalActivos);
  public cursosCicloActual$: Observable<number> = this.store.select(DashboardState.getCursosCicloActual);
  public inscripcionesProcesadasEsteMes$: Observable<number> = this.store.select(DashboardState.getInscripcionesProcesadasEsteMes);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetDashboardTotalesAction());
  }
}
