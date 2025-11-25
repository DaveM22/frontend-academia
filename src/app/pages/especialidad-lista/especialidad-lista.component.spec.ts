import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecialidadListaComponent } from './especialidad-lista.component';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Especialidad } from '../../entities/especialidad';
import { GetByIdEspecialidadAction, GetEspecialidadAction } from '../../store/actions/api/especialidad.action';
import { ShowModalDelete } from '../../store/actions/pages/especialidad.action';
import { LoadingForm } from '../../store/actions/pages/app.action';
import { ScreenSizeService } from '../../services/screen-size.service.service';

class StoreMock {
  dispatch = jasmine.createSpy('dispatch').and.returnValue(of(void 0));
  especialidades$ = new BehaviorSubject<Especialidad[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<boolean>(false);
  errorMsg$ = new BehaviorSubject<string>('');
  
  select = jasmine.createSpy('select').and.callFake((selector: any) => {
    const name = selector?.name || '';
    if (name.includes('getEspecialidades')) return this.especialidades$;
    if (name.includes('getLoading')) return this.loading$;
    if (name.includes('getError')) return this.error$;
    if (name.includes('getErrorMessage')) return this.errorMsg$;
    return new BehaviorSubject<any>(null);
  });
}

class ScreenSizeServiceMock {
  getScreenSize = jasmine.createSpy('getScreenSize').and.returnValue({ width: 1024, height: 768 });
}

describe('EspecialidadListaComponent', () => {
  let component: EspecialidadListaComponent;
  let fixture: ComponentFixture<EspecialidadListaComponent>;
  let store: StoreMock;
  let router: jasmine.SpyObj<Router>;
  let screenService: ScreenSizeServiceMock;

  beforeEach(async () => {
    store = new StoreMock();
    router = jasmine.createSpyObj('Router', ['navigate']);
    screenService = new ScreenSizeServiceMock();

    await TestBed.configureTestingModule({
      imports: [EspecialidadListaComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
        { provide: ScreenSizeService, useValue: screenService }
      ]
    })
      .overrideComponent(EspecialidadListaComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(EspecialidadListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debe despachar GetEspecialidadAction al inicializar', () => {
      expect(store.dispatch).toHaveBeenCalled();
      const calls = store.dispatch.calls.all();
      const getEspAction = calls.find(c => c.args[0] instanceof GetEspecialidadAction);
      expect(getEspAction).toBeTruthy();
    });

    it('debe llamar updateRowsPerPage y updateScrollSize al inicializar', () => {
      spyOn<any>(component, 'updateRowsPerPage');
      spyOn<any>(component, 'updateScrollSize');
      
      component.ngOnInit();
      
      expect((component as any).updateRowsPerPage).toHaveBeenCalled();
      expect((component as any).updateScrollSize).toHaveBeenCalled();
    });
  });

  describe('updateRowsPerPage', () => {
    it('debe establecer rowsPerPage=6 cuando width < 600', () => {
      Object.defineProperty(window, 'innerWidth', { value: 500, configurable: true });
      (component as any).updateRowsPerPage();
      expect(component.rowsPerPage).toBe(6);
    });

    it('debe establecer rowsPerPage=5 cuando 600 <= width < 960', () => {
      Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true });
      (component as any).updateRowsPerPage();
      expect(component.rowsPerPage).toBe(5);
    });

    it('debe establecer rowsPerPage=8 cuando 960 <= width < 1280', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1100, configurable: true });
      (component as any).updateRowsPerPage();
      expect(component.rowsPerPage).toBe(8);
    });

    it('debe establecer rowsPerPage=10 cuando width >= 1280', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1500, configurable: true });
      (component as any).updateRowsPerPage();
      expect(component.rowsPerPage).toBe(10);
    });
  });

  describe('updateScrollSize', () => {
    it('debe calcular scrollSize basado en altura cuando width >= 1024', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1200, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true });
      
      (component as any).updateScrollSize();
      
      expect(component.scrollSize).toBe('500px'); // 900 - 400
    });

    it('debe usar "60vh" cuando width < 1024', () => {
      Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true });
      
      (component as any).updateScrollSize();
      
      expect(component.scrollSize).toBe('60vh');
    });
  });

  describe('showModal', () => {
    it('debe asignar la especialidad y despachar ShowModalDelete(true)', () => {
      const esp: Especialidad = { _id: 'E1', descripcion: 'Ingeniería', plan: [] } as any;
      store.dispatch.calls.reset();
      
      component.showModal(esp);
      
      expect(component.especialidad).toBe(esp);
      expect(store.dispatch).toHaveBeenCalled();
      const action = store.dispatch.calls.mostRecent().args[0];
      expect(action instanceof ShowModalDelete).toBeTrue();
      expect((action as ShowModalDelete).show).toBeTrue();
    });
  });

  describe('redirectNewEspecialidad', () => {
    it('debe navegar a especialidades/nuevo', () => {
      component.redirectNewEspecialidad();
      
      expect(router.navigate).toHaveBeenCalledWith(['especialidades/nuevo']);
    });
  });

  describe('redirectEditEspecialidad', () => {
    it('debe despachar LoadingForm, GetByIdEspecialidadAction y navegar al editar', () => {
      const especialidadId = 'ESP-123';
      store.dispatch.calls.reset();
      
      component.redirectEditEspecialidad(especialidadId);
      
      // Verificar que se despacharon las acciones de loading
      const calls = store.dispatch.calls.all();
      expect(calls.length).toBeGreaterThanOrEqual(2);
      
      // Primera llamada: LoadingForm(true)
      const loadingTrue = calls.find(c => {
        const action = c.args[0];
        return action instanceof LoadingForm && action.loading === true;
      });
      expect(loadingTrue).toBeTruthy();
      
      // Segunda llamada: GetByIdEspecialidadAction
      const getByIdAction = calls.find(c => c.args[0] instanceof GetByIdEspecialidadAction);
      expect(getByIdAction).toBeTruthy();
      expect((getByIdAction!.args[0] as GetByIdEspecialidadAction).id).toBe(especialidadId);
      
      // En el subscribe se despacha LoadingForm(false) y se navega
      // Como nuestro mock retorna of(void 0), el subscribe se ejecuta inmediatamente
      const loadingFalse = calls.find(c => {
        const action = c.args[0];
        return action instanceof LoadingForm && action.loading === false;
      });
      expect(loadingFalse).toBeTruthy();
      
      expect(router.navigate).toHaveBeenCalledWith([`especialidades/editar/${especialidadId}`]);
    });
  });

  describe('onResize', () => {
    it('debe llamar updateRowsPerPage y updateScrollSize en resize', () => {
      spyOn<any>(component, 'updateRowsPerPage');
      spyOn<any>(component, 'updateScrollSize');
      
      component.onResize();
      
      expect((component as any).updateRowsPerPage).toHaveBeenCalled();
      expect((component as any).updateScrollSize).toHaveBeenCalled();
    });
  });
});

