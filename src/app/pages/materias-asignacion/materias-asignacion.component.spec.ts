import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasAsignacionComponent } from './materias-asignacion.component';
import { provideStore, Store } from '@ngxs/store';
import { MateriaState } from '../../store/states/api/materia.state';
import { AppPageState } from '../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('MateriasAsignacionComponent', () => {
  let store: Store;
  let component: MateriasAsignacionComponent;
  let fixture: ComponentFixture<MateriasAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasAsignacionComponent],
      providers: [provideStore([MateriaState, AppPageState]),
      provideHttpClient(withInterceptorsFromDi()),
     provideNoopAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MateriasAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
