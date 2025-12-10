import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesDocenteComponent } from './notificaciones-docente.component';
import { NotificacionState } from '../../store/states/api/notificacion.state';
import { AppPageState } from '../../store/states/page/app.state';
import { provideStore } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NotificacionService } from '../../services/notificacion.service';
import { of } from 'rxjs';

describe('NotificacionesDocenteComponent', () => {
  let component: NotificacionesDocenteComponent;
  let fixture: ComponentFixture<NotificacionesDocenteComponent>;

  beforeEach(async () => {
    const notificacionServiceMock = {
      getByDocente: (_: string) => of([]),
      getNoLeidas: (_: string) => of([]),
      getNoLeidasCount: (_: string) => of(0),
      marcarComoLeida: (_: string) => of(void 0),
      // alumno endpoints not used here but add to satisfy state
      getByAlumno: (_: string) => of([]),
      getNoLeidasCountAlumno: (_: string) => of(0),
    } as Partial<NotificacionService> as NotificacionService;

    await TestBed.configureTestingModule({
      imports: [NotificacionesDocenteComponent],
      providers: [
        provideStore([NotificacionState, AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        MessageService,
        ConfirmationService,
        { provide: NotificacionService, useValue: notificacionServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
