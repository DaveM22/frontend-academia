import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesAlumnoComponent } from './novedades-alumno.component';
import { NotificacionState } from '../../store/states/api/notificacion.state';
import { AppPageState } from '../../store/states/page/app.state';
import { provideStore } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NotificacionService } from '../../services/notificacion.service';
import { of } from 'rxjs';

describe('NovedadesAlumnoComponent', () => {
  let component: NovedadesAlumnoComponent;
  let fixture: ComponentFixture<NovedadesAlumnoComponent>;

  beforeEach(async () => {
    const notificacionServiceMock = {
      getByAlumno: (_: string) => of([]),
      getNoLeidasCountAlumno: (_: string) => of(0),
      marcarComoLeida: (_: string) => of(void 0),
      getByDocente: (_: string) => of([]),
      getNoLeidas: (_: string) => of([]),
      getNoLeidasCount: (_: string) => of(0),
    } as Partial<NotificacionService> as NotificacionService;
    await TestBed.configureTestingModule({
      imports: [NovedadesAlumnoComponent ],
      providers: [
        provideStore([NotificacionState, AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        MessageService,
        { provide: NotificacionService, useValue: notificacionServiceMock }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovedadesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
