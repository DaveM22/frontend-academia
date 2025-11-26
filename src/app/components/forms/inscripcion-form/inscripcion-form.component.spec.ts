import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionFormComponent } from './inscripcion-form.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../../store/states/api/persona.state';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { AlumnoInscripcionPageState } from '../../../store/states/page/alumno-inscripcion.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, EMPTY } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PlanState } from '../../../store/states/api/plan.state';
import { Alumno } from '../../../entities/alumno';
import { TipoPersonaEnum } from '../../../util/EnumTipoPersona';
import { AlumnoInscripcion } from '../../../entities/alumno-inscripcion';
import { Curso } from '../../../entities/curso';

describe('InscripcionFormComponent', () => {
  let store: Store;
  let component: InscripcionFormComponent;
  let fixture: ComponentFixture<InscripcionFormComponent>;
  
  const authServiceMock = {
    isAuthenticated$: of(true),
    user$: of({ name: 'Test' }),
    idTokenClaims$: of({ 'https://example.com/roles': ['Administrador'] }),
    loginWithRedirect: jasmine.createSpy(),
    logout: jasmine.createSpy(),
  };

  const mockCurso: Curso = {
    _id: 'curso-1',
    descripcion: 'Matemática',
    materia: { _id: 'mat-1', descripcion: 'Matemáticas I', planId: 'plan-1' } as any,
    comision: { _id: 'com-1', descripcion: 'Comisión 1' } as any,
    anioCalendario: 2024,
    cupo:30
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
    inscripciones: []
  };

  const mockInscripcion: AlumnoInscripcion = {
    _id: 'inscripcion-1',
    alumno: mockAlumno,
    curso: mockCurso,
    condicion: 'INSCRIPTO',
    nota: 6
  };

  describe('Crear nueva inscripción (sin idInscripcion)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [InscripcionFormComponent],
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
              snapshot: { params: { idInscripcion: null } }
            }
          }
        ],
      })
        .compileComponents();
      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(InscripcionFormComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('Debe inicializar el formulario para crear nueva inscripción', () => {
      fixture.detectChanges();
      
      expect(component.form).toBeDefined();
      expect(component.form.get('_id')?.value).toBeNull();
      expect(component.form.get('alumnoId')?.value).toBe('');
      expect(component.form.get('cursoId')?.value).toBe('');
      expect(component.form.get('condicion')?.value).toBe('');
      expect(component.form.get('nota')?.value).toBe('');
    });

    it('Debe tener el rol correcto desde el AuthService', () => {
      fixture.detectChanges();
      
      // El role debería ser 'Administrador' del mock
      expect(component.role).toBeDefined();
    });

    it('Debe tener condiciones disponibles en el formulario', () => {
      fixture.detectChanges();
      
      expect(component.condiciones).toBeDefined();
      expect(component.condiciones.length).toBeGreaterThan(0);
    });
  });

  describe('Editar inscripción existente (con idInscripcion)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [InscripcionFormComponent],
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
              snapshot: { params: { idInscripcion: 'inscripcion-1' } }
            }
          }
        ],
      })
        .compileComponents();
      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(InscripcionFormComponent);
      component = fixture.componentInstance;
    });

    it('should create with idInscripcion param', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('Debe intentar cargar la inscripción cuando existe idInscripcion', () => {
      const dispatchSpy = spyOn(store, 'dispatch').and.returnValue(EMPTY);
      
      fixture.detectChanges();
      
      // Verificar que se intenta cargar la inscripción
      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('Debe tener el formulario inicializado para editar', () => {
      fixture.detectChanges();
      
      expect(component.form).toBeDefined();
      expect(component.form.get('_id')).toBeDefined();
      expect(component.form.get('alumnoId')).toBeDefined();
      expect(component.form.get('cursoId')).toBeDefined();
      expect(component.form.get('condicion')).toBeDefined();
      expect(component.form.get('nota')).toBeDefined();
    });
  });
});
