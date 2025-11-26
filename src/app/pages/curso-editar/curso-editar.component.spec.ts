import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEditarComponent } from './curso-editar.component';
import { provideStore, Store } from '@ngxs/store';
import { CursoPageState } from '../../store/states/page/curso.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('CursoEditarComponent', () => {
  let store: Store;
  let component: CursoEditarComponent;
  let fixture: ComponentFixture<CursoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoEditarComponent],
      providers: [
        provideStore([CursoPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CursoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
