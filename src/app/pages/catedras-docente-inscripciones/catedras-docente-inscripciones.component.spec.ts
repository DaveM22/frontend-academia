import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedrasDocenteInscripcionesComponent } from './catedras-docente-inscripciones.component';
import { provideStates, provideStore, Store } from '@ngxs/store';
import { ParametroState } from '../../store/states/api/parametro.state';
import { AlumnoInscripcionState } from '../../store/states/api/alumno-incripcion.state';
import { CursoPageState } from '../../store/states/page/curso.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CursoState } from '../../store/states/api/curso.state';
import { provideRouter } from '@angular/router';

describe('CatedrasDocenteInscripcionesComponent', () => {
  let store: Store;
  let component: CatedrasDocenteInscripcionesComponent;
  let fixture: ComponentFixture<CatedrasDocenteInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedrasDocenteInscripcionesComponent],
      providers:[
        provideStore([ParametroState, AlumnoInscripcionState, CursoPageState, CursoState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedrasDocenteInscripcionesComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
