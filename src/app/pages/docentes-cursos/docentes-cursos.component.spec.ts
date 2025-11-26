import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesCursosComponent } from './docentes-cursos.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DocenteCursoState } from '../../store/states/api/docente-curso.state';
import { CursoPageState } from '../../store/states/page/curso.state';
import { AppPageState } from '../../store/states/page/app.state';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('DocentesCursosComponent', () => {
  let store: Store;
  let component: DocentesCursosComponent;
  let fixture: ComponentFixture<DocentesCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocentesCursosComponent],
      providers: [
        provideStore([DocenteCursoState, CursoPageState, AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DocentesCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
