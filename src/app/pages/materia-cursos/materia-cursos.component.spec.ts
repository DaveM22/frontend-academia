import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaCursosComponent } from './materia-cursos.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CursoState } from '../../store/states/api/curso.state';

describe('MateriaCursosComponent', () => {
  let store: Store;
  let component: MateriaCursosComponent;
  let fixture: ComponentFixture<MateriaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaCursosComponent],
      providers: [
        provideStore([CursoState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(MateriaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
