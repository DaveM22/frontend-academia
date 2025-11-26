import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMateriasNuevoComponent } from './plan-materias-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { MateriaPageState } from '../../store/states/page/materia.page.state';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PlanMateriasNuevoComponent', () => {
  let store: Store;
  let component: PlanMateriasNuevoComponent;
  let fixture: ComponentFixture<PlanMateriasNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMateriasNuevoComponent],
      providers: [
        provideStore([EspecialidadState, MateriaPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanMateriasNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
