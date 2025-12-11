import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AppPageState } from '../../store/states/page/app.state';
import { NotificacionState } from '../../store/states/api/notificacion.state';
import { GetNotificacionesAction, GetNoLeidasCountAction } from '../../store/actions/api/notificacion.action';
import { Notificacion } from '../../entities/notificacion';
import { Router } from '@angular/router';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardProfesorState } from '../../store/states/api/dashboard-profesor.state';
import { GetDashboardProfesorTotalesAction } from '../../store/actions/api/dashboard-profesor.action';

@Component({
  selector: 'app-docente-inicio',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MessageModule,
    TagModule,
    BadgeModule,
    CardModule,
    ProgressSpinnerModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  templateUrl: './docente-inicio.component.html',
  styleUrl: './docente-inicio.component.scss'
})
export class DocenteInicioComponent implements OnInit, OnDestroy {
    // Dashboard totals
    profesorLoading$: Observable<boolean>;
    catedrasAsignadas$: Observable<number>;
    cursosActivos$: Observable<number>;
    inscripcionesEnRevision$: Observable<number>;
  notificaciones$: Observable<Notificacion[]>;
  noLeidasCount$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.notificaciones$ = this.store.select(NotificacionState.getNotificaciones);
    this.noLeidasCount$ = this.store.select(NotificacionState.getNoLeidasCount);
    this.loading$ = this.store.select(NotificacionState.getLoading);
    this.error$ = this.store.select(NotificacionState.getError);

    // Profesor dashboard selectors
    this.profesorLoading$ = this.store.select(DashboardProfesorState.getLoading);
    this.catedrasAsignadas$ = this.store.select(DashboardProfesorState.getCatedrasAsignadas);
    this.cursosActivos$ = this.store.select(DashboardProfesorState.getCursosActivos);
    this.inscripcionesEnRevision$ = this.store.select(DashboardProfesorState.getInscripcionesEnRevision);
  }

  ngOnInit(): void {
    const docenteId = this.store.selectSnapshot(AppPageState.getPersonId);
    if (docenteId) {
      this.loadNotificaciones(docenteId);
      // Load dashboard totals for profesor
      this.store.dispatch(new GetDashboardProfesorTotalesAction(docenteId));
      interval(30000)
        .pipe(
          switchMap(() => {
            this.store.dispatch(new GetNotificacionesAction({ docenteId }));
            this.store.dispatch(new GetNoLeidasCountAction({ docenteId }));
            this.store.dispatch(new GetDashboardProfesorTotalesAction(docenteId));
            return [];
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadNotificaciones(docenteId: string): void {
    this.store.dispatch(new GetNotificacionesAction({ docenteId }));
    this.store.dispatch(new GetNoLeidasCountAction({ docenteId }));
  }

  getTipoColor(tipo: string): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (tipo) {
      case 'ALUMNO_INSCRITO':
        return 'success';
      case 'INSCRIPCION_CANCELADA':
        return 'danger';
      case 'CAMBIO_CALIFICACION':
        return 'warn';
      default:
        return 'info';
    }
  }

  getTipoLabel(tipo: string): string {
    switch (tipo) {
      case 'ALUMNO_INSCRITO':
        return 'Inscrito';
      case 'INSCRIPCION_CANCELADA':
        return 'Cancelada';
      case 'CAMBIO_CALIFICACION':
        return 'Calificación';
      default:
        return tipo;
    }
  }

  verTodasLasNotificaciones(): void {
    this.router.navigate(['docente/notificaciones']);
  }
}
