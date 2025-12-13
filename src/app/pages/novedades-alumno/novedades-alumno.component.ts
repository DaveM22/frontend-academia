import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AppPageState } from '../../store/states/page/app.state';
import { NotificacionState } from '../../store/states/api/notificacion.state';
import { GetNotificacionesAlumnoAction, GetNoLeidasCountAlumnoAction, MarcarComoLeidaAlumnoAction } from '../../store/actions/api/notificacion.action';
import { Notificacion } from '../../entities/notificacion';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { MobileSortSelectComponent, SortOption } from '../../components/util/mobile-sort-select/mobile-sort-select.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-novedades-alumno',
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
    ConfirmDialogModule,
    TableModule,
    MobileSortSelectComponent
  ],
  templateUrl: './novedades-alumno.component.html',
  styleUrl: './novedades-alumno.component.scss',
  providers:[ConfirmationService]
})
export class NovedadesAlumnoComponent implements OnInit, OnDestroy {
  @ViewChild('dt2') table!: Table;
  notificaciones$: Observable<Notificacion[]>;
  notificaciones: Notificacion[] = [];
  noLeidasCount$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  errorMessage$: Observable<string>;

  sortOptions: SortOption[] = [
    { label: 'Estado', field: 'leida' },
    { label: 'Título', field: 'titulo' },
    { label: 'Mensaje', field: 'mensaje' },
    { label: 'Fecha', field: 'fechaCreacion' }
  ];

  filtroSearch: string = '';
  filtroTipo: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.notificaciones$ = this.store.select(NotificacionState.getNotificaciones);
    this.noLeidasCount$ = this.store.select(NotificacionState.getNoLeidasCount);
    this.loading$ = this.store.select(NotificacionState.getLoading);
    this.error$ = this.store.select(NotificacionState.getError);
    this.errorMessage$ = this.store.select(NotificacionState.getErrorMessage);
  }

  ngOnInit(): void {
    const alumnoId = this.store.selectSnapshot(AppPageState.getPersonId);
    this.notificaciones$.subscribe(x => this.notificaciones = x ? [...x] : []);
    if (alumnoId) {
      this.loadNotificaciones(alumnoId);
      // Auto-refresh cada 30 segundos
      interval(30000)
        .pipe(
          switchMap(() => {
            this.store.dispatch(new GetNotificacionesAlumnoAction({ alumnoId }));
            
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

  }

  get notificacionesFiltradas(): Observable<Notificacion[]> {
    return new Observable(observer => {
      this.notificaciones$.subscribe(notificaciones => {
        let filtradas = notificaciones;
        
        if (this.filtroSearch) {
          const search = this.filtroSearch.toLowerCase();
          filtradas = filtradas.filter(n => 
            n.titulo.toLowerCase().includes(search) || 
            n.mensaje.toLowerCase().includes(search)
          );
        }
        
        if (this.filtroTipo) {
          filtradas = filtradas.filter(n => n.tipo === this.filtroTipo);
        }
        
        observer.next(filtradas);
      });
    });
  }

  marcarComoLeida(notificacion: Notificacion): void {
    const alumnoId = this.store.selectSnapshot(AppPageState.getPersonId);
    if (alumnoId && !notificacion.leida) {
      this.store.dispatch(new MarcarComoLeidaAlumnoAction({ notificacionId: notificacion._id, alumnoId }));
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

  getEstadoLabel(leida: boolean): string {
    return leida ? 'Leída' : 'No leída';
  }

  getEstadoColor(leida: boolean): 'success' | 'warn' {
    return leida ? 'success' : 'warn';
  }

  onRefresh(): void {
    const alumnoId = this.store.selectSnapshot(AppPageState.getPersonId);
    if (alumnoId) {
      this.loadNotificaciones(alumnoId);
    }
  }
}
