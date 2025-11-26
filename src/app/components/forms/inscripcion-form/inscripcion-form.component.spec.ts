import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionFormComponent } from './inscripcion-form.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../../store/states/api/persona.state';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { AlumnoInscripcionPageState } from '../../../store/states/page/alumno-inscripcion.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('InscripcionFormComponent', () => {
  let store: Store;
  let component: InscripcionFormComponent;
  let fixture: ComponentFixture<InscripcionFormComponent>;
  
const authServiceMock = {
  isAuthenticated$: of(true),
  user$: of({ name: 'Test' }),
  loginWithRedirect: jasmine.createSpy(),
  logout: jasmine.createSpy(),
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionFormComponent],
      providers: [
        provideStore([PersonaState, PersonaPageState, EspecialidadPageState, AppPageState, AlumnoInscripcionPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService,
        { provide: AuthService, useValue: authServiceMock },
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(InscripcionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
