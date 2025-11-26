import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionNuevoComponent } from './inscripcion-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { MessageClasses } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PersonaState } from '../../store/states/api/persona.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { EspecialidadPageState } from '../../store/states/page/especialidad.state';
import { AppPageState } from '../../store/states/page/app.state';
import { AlumnoInscripcionPageState } from '../../store/states/page/alumno-inscripcion.state';
import { PlanState } from '../../store/states/api/plan.state';

describe('InscripcionNuevoComponent', () => {
  let store: Store;
  let component: InscripcionNuevoComponent;
  let fixture: ComponentFixture<InscripcionNuevoComponent>;
  const authServiceMock = {
    isAuthenticated$: of(true),
    user$: of({ name: 'Test' }),
    idTokenClaims$: of({ 'https://example.com/roles': ['Administrador'] }),
    loginWithRedirect: jasmine.createSpy(),
    logout: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionNuevoComponent],
      providers: [
        provideStore([PersonaState, PersonaPageState, EspecialidadPageState, AppPageState, AlumnoInscripcionPageState, PlanState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService,
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { idAlumno: 'alumno-1' } }
          }
        }
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(InscripcionNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
