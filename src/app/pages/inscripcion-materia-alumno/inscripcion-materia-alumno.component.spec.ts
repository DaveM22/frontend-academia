import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionMateriaAlumnoComponent } from './inscripcion-materia-alumno.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('InscripcionMateriaAlumnoComponent', () => {
  let store: Store;
  let component: InscripcionMateriaAlumnoComponent;
  let fixture: ComponentFixture<InscripcionMateriaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionMateriaAlumnoComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(InscripcionMateriaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
