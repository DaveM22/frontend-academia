import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionAlumnoListaComponent } from './inscripcion-alumno-lista.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../store/states/api/persona.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { SelectedEspecialidadFilterAction } from '../../store/actions/pages/app.action';
import { AppPageState } from '../../store/states/page/app.state';
import { SelectedPlanFilter, ClearSelectedPlanFilter, ClearSelectedPlanInModal } from '../../store/actions/pages/app.action';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { EspecialidadPageState } from '../../store/states/page/especialidad.state';
import { PlanState } from '../../store/states/api/plan.state';
import { PlanPageState } from '../../store/states/page/plan.page.state';
import { take } from 'rxjs/operators';
import { Alumno } from '../../entities/alumno';
import { TipoPersonaEnum } from '../../util/EnumTipoPersona';
import { PersonaService } from '../../services/persona.service';
import { of } from 'rxjs';
import { GetAlumnosAction, ClearAlumnoListAction } from '../../store/actions/api/persona.action';
import { AlumnoFilter, PlanFilter } from '../../entities/filter';
import { EspecialidadService } from '../../services/especialidad.service';
import { PlanService } from '../../services/plan.service';
import { Especialidad } from '../../entities/especialidad';
import { Plan } from '../../entities/plan';
import { Router } from '@angular/router';
import { ClearMateriasAction } from '../../store/actions/api/materia.action';
import { ClearSelectedPersona } from '../../store/actions/pages/persona.action';

describe('InscripcionAlumnoListaComponent', () => {
  let store: Store;
  let component: InscripcionAlumnoListaComponent;
  let fixture: ComponentFixture<InscripcionAlumnoListaComponent>;

  const mockEspecialidades: Especialidad[] = [
    { _id: '1', descripcion: 'Ingeniería' },
    { _id: '2', descripcion: 'Administración' }
  ];

  const mockPlanes: Plan[] = [
    { _id: 'plan-1', descripcion: 'Plan 1', especialidadId: '1', especialidad: mockEspecialidades[0], materias: [], comisiones: [] },
    { _id: 'plan-2', descripcion: 'Plan 2', especialidadId: '2', especialidad: mockEspecialidades[1], materias: [], comisiones: [] }
  ];

  const mockAlumnos: Alumno[] = [
    {
      _id: 'alumno-1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      telefono: '1234567890',
      direccion: 'Calle 1',
      fechaNacimiento: new Date('1990-01-01'),
      legajo: 1001,
      plan: mockPlanes[0],
      tipoPersona: TipoPersonaEnum.ALUMNO,
      inscripciones: []
    },
    {
      _id: 'alumno-2',
      nombre: 'María',
      apellido: 'González',
      email: 'maria@example.com',
      telefono: '0987654321',
      direccion: 'Calle 2',
      fechaNacimiento: new Date('1990-01-01'),
      legajo: 1002,
      plan: mockPlanes[0],
      tipoPersona: TipoPersonaEnum.ALUMNO,
      inscripciones: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionAlumnoListaComponent],
      providers: [
        provideStore([PersonaState, AppPageState, EspecialidadState, EspecialidadPageState, PlanState, PlanPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        MessageService,
        ScreenSizeService,
        EspecialidadService,
        PlanService,
        PersonaService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(InscripcionAlumnoListaComponent);
    component = fixture.componentInstance;

    // Mock el servicio EspecialidadService para retornar especialidades mockeadas
    const especialidadService = TestBed.inject(EspecialidadService);
    spyOn(especialidadService, 'getEspecialidades').and.returnValue(of(mockEspecialidades));

    // Mock el servicio PlanService para retornar planes filtrados por especialidad
    const planService = TestBed.inject(PlanService);
    spyOn(planService, 'getPlanes').and.callFake((filter: PlanFilter) => {
      const filteredPlanes = mockPlanes.filter(p => p.especialidadId === filter.especialidadId);
      return of(filteredPlanes);
    });

    // Mock el servicio PersonaService para retornar alumnos filtrados por plan
    const personaService = TestBed.inject(PersonaService);
    spyOn(personaService, 'getAlumnos').and.callFake((filter: AlumnoFilter) => {
      const filteredAlumnos = mockAlumnos.filter(a => a.plan._id === filter.planId);
      return of(filteredAlumnos);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar una lista de alumnos', (done) => {
    // Inicializar el componente - esto activa los listeners en ngOnInit
    fixture.detectChanges();

    // Disparar la acción de especialidad seleccionada (Ingeniería)
    // Esto activa el primer subscribe que dispara GetPlanAction
    store.dispatch(new SelectedEspecialidadFilterAction(mockEspecialidades[0]));

    // Esperar a que se carguen los planes de esa especialidad
    setTimeout(() => {
      // Disparar la acción de plan seleccionado
      // Esto activa el segundo subscribe que dispara GetAlumnosAction
      store.dispatch(new SelectedPlanFilter(mockPlanes[0]));

      // Esperar a que se carguen los alumnos de ese plan
      setTimeout(() => {
        fixture.detectChanges();
        
        // Verificar que el estado fue actualizado correctamente con los alumnos mockeados
        const alumnos = store.selectSnapshot(PersonaState.getAlumnos);
        expect(component).toBeTruthy();
        expect(alumnos).toBeDefined();
        expect(Array.isArray(alumnos)).toBe(true);
        expect(alumnos.length).toBe(2);
        expect(alumnos[0]?.nombre).toBe('Juan');
        expect(alumnos[1]?.nombre).toBe('María');
        done();
      }, 300);
    }, 100);
  });

  it('ngOnDestroy debe disparar acciones de limpieza', () => {
    fixture.detectChanges();
    
    // Crear spies para verificar que se disparan las acciones
    const dispatchSpy = spyOn(store, 'dispatch');
    
    // Llamar a ngOnDestroy
    component.ngOnDestroy();
    
    // Verificar que se despacharon todas las acciones de limpieza
    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.any(ClearAlumnoListAction));
    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.any(ClearSelectedPlanFilter));
    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.any(ClearMateriasAction));
    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.any(ClearSelectedPlanInModal));
    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.any(ClearSelectedPersona));
  });

  it('redirectToInscripciones debe navegar a la ruta correcta', () => {
    fixture.detectChanges();
    
    // Crear spy para verificar la navegación
    const routerSpy = spyOn(component['router'], 'navigate');
    
    // Llamar al método con un id
    const testId = 'alumno-123';
    component.redirectToInscripciones(testId);
    
    // Verificar que navega a la ruta correcta
    expect(routerSpy).toHaveBeenCalledWith([`/inscripciones/alumnos/${testId}`]);
  });

  it('updateRowsPerPage debe actualizar rowsPerPage según el ancho de la ventana', () => {
    fixture.detectChanges();
    
    // Test para ancho < 600px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    component['updateRowsPerPage']();
    expect(component.rowsPerPage).toBe(6);

    // Test para ancho < 960px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 700,
    });
    component['updateRowsPerPage']();
    expect(component.rowsPerPage).toBe(5);

    // Test para ancho < 1280px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    component['updateRowsPerPage']();
    expect(component.rowsPerPage).toBe(8);

    // Test para ancho < 1920px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1500,
    });
    component['updateRowsPerPage']();
    expect(component.rowsPerPage).toBe(10);

    // Test para ancho >= 1920px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 2000,
    });
    component['updateRowsPerPage']();
    expect(component.rowsPerPage).toBe(10);
  });
});