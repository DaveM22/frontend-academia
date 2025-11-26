import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesComponent } from './inscripciones.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Persona } from '../../entities/persona';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { PersonaState } from '../../store/states/api/persona.state';
import { AppPageState } from '../../store/states/page/app.state';
import { AlumnoInscripcionState } from '../../store/states/api/alumno-incripcion.state';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('InscripcionesComponent', () => {
  let store: Store;
  let component: InscripcionesComponent;
  let fixture: ComponentFixture<InscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesComponent],
      providers: [
        provideStore([PersonaState, PersonaPageState, AlumnoInscripcionState , AppPageState] ),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(InscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
