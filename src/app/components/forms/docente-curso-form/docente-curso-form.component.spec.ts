import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteCursoFormComponent } from './docente-curso-form.component';
import { provideStore, Store } from '@ngxs/store';
import { CursoPageState } from '../../../store/states/page/curso.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('DocenteCursoFormComponent', () => {
  let store: Store;
  let component: DocenteCursoFormComponent;
  let fixture: ComponentFixture<DocenteCursoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteCursoFormComponent],
      providers: [
        provideStore([CursoPageState, AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DocenteCursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
