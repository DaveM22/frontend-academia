import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesComponent } from './inscripciones.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { Persona } from '../../entities/persona';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { PersonaState } from '../../store/states/api/persona.state';
import { AppPageState } from '../../store/states/page/app.state';
import { AlumnoInscripcionState } from '../../store/states/api/alumno-incripcion.state';
import { MessageService, ConfirmationService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Alumno } from '../../entities/alumno';
import { TipoPersonaEnum } from '../../util/EnumTipoPersona';
import { AlumnoInscripcion } from '../../entities/alumno-inscripcion';
import { Curso } from '../../entities/curso';
import { PersonaService } from '../../services/persona.service';
import { AlumnoInscripcionService } from '../../services/alumno-inscripcion.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('InscripcionesComponent', () => {
  let store: Store;
  let component: InscripcionesComponent;
  let fixture: ComponentFixture<InscripcionesComponent>;

  // Mock data
  const mockCurso: Curso = {
    _id: 'curso-1',
    descripcion: 'Matemática',
    materia: { _id: 'mat-1', descripcion: 'Matemáticas I', planId: 'plan-1' } as any,
    comision: { _id: 'com-1', descripcion: 'Comisión 1' } as any,
    anioCalendario: 2024,
    cupo:30
  };

  const mockInscripcion: AlumnoInscripcion = {
    _id: 'inscripcion-1',
    alumno: { _id: 'alumno-1' } as any,
    curso: mockCurso,
    condicion: 'INSCRIPTO',
    nota: 6
  };

  const mockAlumno: Alumno = {
    _id: 'alumno-1',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@example.com',
    telefono: '1234567890',
    direccion: 'Calle 1',
    fechaNacimiento: new Date('1990-01-01'),
    legajo: 1001,
    plan: { _id: 'plan-1', descripcion: 'Plan 1', especialidadId: '1', especialidad: null, materias: [], comisiones: [] } as any,
    tipoPersona: TipoPersonaEnum.ALUMNO,
    inscripciones: [mockInscripcion]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesComponent],
      providers: [
        provideStore([PersonaState, PersonaPageState, AlumnoInscripcionState, AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService,
        ConfirmationService,
        PersonaService,
        AlumnoInscripcionService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 'alumno-1' } }
          }
        }
      ],
    })
      .compileComponents();
    
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(InscripcionesComponent);
    component = fixture.componentInstance;

    // Mock PersonaService
    const personaService = TestBed.inject(PersonaService);
    spyOn(personaService, 'getByIdAlumno').and.returnValue(of(mockAlumno));

    // Mock AlumnoInscripcionService
    const inscripcionService = TestBed.inject(AlumnoInscripcionService);
    spyOn(inscripcionService, 'get').and.returnValue(of(mockInscripcion));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar las inscripciones del alumno en ngOnInit', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.alumno).toBeDefined();
      expect(component.alumno._id).toBe('alumno-1');
      expect(component.alumno.nombre).toBe('Juan');
      expect(component.inscripciones).toBeDefined();
      expect(component.inscripciones.length).toBe(1);
      expect(component.inscripciones[0]?.curso?.descripcion).toBe('Matemática');
      done();
    }, 300);
  });

  it('updateRowsPerPage debe actualizar rowsPerPage según el ancho de ventana', () => {
    fixture.detectChanges();

    // Test para ancho < 600px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    component.updateRowsPerPage();
    expect(component.rowsPerPage).toBe(6);

    // Test para ancho < 960px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 700,
    });
    component.updateRowsPerPage();
    expect(component.rowsPerPage).toBe(5);

    // Test para ancho < 1280px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    component.updateRowsPerPage();
    expect(component.rowsPerPage).toBe(8);

    // Test para ancho >= 1280px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1500,
    });
    component.updateRowsPerPage();
    expect(component.rowsPerPage).toBe(10);
  });

  it('redirectToNuevaInscripcion debe navegar a la ruta correcta', () => {
    fixture.detectChanges();
    component.alumno = mockAlumno;

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.redirectToNuevaInscripcion();

    expect(navigateSpy).toHaveBeenCalledWith([`inscripciones/alumnos/alumno-1/nuevo`]);
  });

  it('redirectToInscripcionesalumnos debe navegar a la lista de inscripciones', (done) => {
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.redirectToInscripcionesalumnos();

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith([`inscripciones/alumnos/lista`]);
      done();
    }, 300);
  });

  it('redirectActualizarInscripcion debe navegar a editar inscripción', (done) => {
    fixture.detectChanges();
    component.alumno = mockAlumno;

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    const inscripcionId = 'inscripcion-1';
    component.redirectActualizarInscripcion(inscripcionId);

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith([`inscripciones/alumnos/alumno-1/inscripcion/editar/inscripcion-1`]);
      done();
    }, 300);
  });

  it('ngOnDestroy debe disparar ClearMateriasAction', () => {
    fixture.detectChanges();

    const dispatchSpy = spyOn(store, 'dispatch');

    component.ngOnDestroy();

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
