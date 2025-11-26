import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoAlumnosComponent } from './curso-alumnos.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('CursoAlumnosComponent', () => {
  let store: Store;
  let component: CursoAlumnosComponent;
  let fixture: ComponentFixture<CursoAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoAlumnosComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CursoAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
