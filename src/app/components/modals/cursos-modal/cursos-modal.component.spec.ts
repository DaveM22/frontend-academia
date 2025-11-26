import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosModalComponent } from './cursos-modal.component';
import { provideStore, Store } from '@ngxs/store';
import { CursoPageState } from '../../../store/states/page/curso.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { CursoState } from '../../../store/states/api/curso.state';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { PersonaPageState } from '../../../store/states/page/persona.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('CursosModalComponent', () => {
  let store: Store;
  let component: CursosModalComponent;
  let fixture: ComponentFixture<CursosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosModalComponent],
      providers: [
        provideStore([CursoPageState, AppPageState, CursoState, EspecialidadPageState, PersonaPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CursosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
