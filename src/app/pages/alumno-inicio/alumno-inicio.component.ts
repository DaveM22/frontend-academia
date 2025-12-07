import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AppPageState } from '../../store/states/page/app.state';
import { NotificacionState } from '../../store/states/api/notificacion.state';
import { GetNotificacionesAlumnoAction, GetNoLeidasCountAlumnoAction } from '../../store/actions/api/notificacion.action';
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

@Component({
  selector: 'app-alumno-inicio',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MessageModule,
    TagModule,
    BadgeModule,
    CardModule,
    ProgressSpinnerModule,
    TableModule
  ],
  templateUrl: './alumno-inicio.component.html',
  styleUrl: './alumno-inicio.component.scss'
})
export class AlumnoInicioComponent implements OnInit, OnDestroy {
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
  }

  ngOnInit(): void {
    const alumnoId = this.store.selectSnapshot(AppPageState.getPersonId);
    if (alumnoId) {
      this.loadNotificaciones(alumnoId);
      // Auto-refresh cada 30 segundos
      interval(30000)
        .pipe(
          switchMap(() => {
            this.store.dispatch(new GetNotificacionesAlumnoAction({ alumnoId }));
            this.store.dispatch(new GetNoLeidasCountAlumnoAction({ alumnoId }));
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

  loadNotificaciones(alumnoId: string): void {
    this.store.dispatch(new GetNotificacionesAlumnoAction({ alumnoId }));
    this.store.dispatch(new GetNoLeidasCountAlumnoAction({ alumnoId }));
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

  verTodasLasNovedades(): void {
    this.router.navigate(['alumno/novedades']);
  }
}
