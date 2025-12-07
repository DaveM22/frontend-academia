import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AppPageState } from '../../store/states/page/app.state';
import { NotificacionState } from '../../store/states/api/notificacion.state';
import { GetNotificacionesAction, GetNoLeidasCountAction, MarcarComoLeidaAction } from '../../store/actions/api/notificacion.action';
import { Notificacion } from '../../entities/notificacion';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-notificaciones-docente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    MessageModule,
    TagModule,
    BadgeModule,
    TooltipModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    ProgressSpinnerModule,
    ConfirmDialogModule
  ],
  templateUrl: './notificaciones-docente.component.html',
  styleUrl: './notificaciones-docente.component.scss',
  providers:[ConfirmationService]
})
export class NotificacionesDocenteComponent implements OnInit, OnDestroy {
  notificaciones$: Observable<Notificacion[]>;
  noLeidas$: Observable<Notificacion[]>;
  noLeidasCount$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  errorMessage$: Observable<string>;

  filtroSearch: string = '';
  filtroTipo: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.notificaciones$ = this.store.select(NotificacionState.getNotificaciones);
    this.noLeidas$ = this.store.select(NotificacionState.getNoLeidas);
    this.noLeidasCount$ = this.store.select(NotificacionState.getNoLeidasCount);
    this.loading$ = this.store.select(NotificacionState.getLoading);
    this.error$ = this.store.select(NotificacionState.getError);
    this.errorMessage$ = this.store.select(NotificacionState.getErrorMessage);
  }

  ngOnInit(): void {
    const docenteId = this.store.selectSnapshot(AppPageState.getPersonId);
    if (docenteId) {
      this.loadNotificaciones(docenteId);
      // Auto-refresh cada 30 segundos
      interval(30000)
        .pipe(
          switchMap(() => {
            this.store.dispatch(new GetNotificacionesAction({ docenteId }));
            this.store.dispatch(new GetNoLeidasCountAction({ docenteId }));
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

  onRefresh(): void {
    const docenteId = this.store.selectSnapshot(AppPageState.getPersonId);
    if (docenteId) {
      this.loadNotificaciones(docenteId);
    }
  }

  marcarComoLeida(notificacion: Notificacion): void {
    const docenteId = this.store.selectSnapshot(AppPageState.getPersonId);
    if (docenteId && !notificacion.leida) {
      this.store.dispatch(new MarcarComoLeidaAction({ notificacionId: notificacion._id, docenteId }));
    }
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
    const labels: { [key: string]: string } = {
      'ALUMNO_INSCRITO': 'Alumno Inscrito',
      'INSCRIPCION_CANCELADA': 'Inscripción Cancelada',
      'CAMBIO_CALIFICACION': 'Cambio de Calificación'
    };
    return labels[tipo] || tipo;
  }

  getEstadoLabel(leida: boolean): string {
    return leida ? 'Leída' : 'No leída';
  }

  getEstadoColor(leida: boolean): 'success' | 'warn' {
    return leida ? 'success' : 'warn';
  }
}
