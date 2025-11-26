import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionAlumnoEditarComponent } from './inscripcion-alumno-editar.component';
import { provideStore, Store } from '@ngxs/store';
import { AlumnoInscripcionPageState } from '../../store/states/page/alumno-inscripcion.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('InscripcionAlumnoEditarComponent', () => {
  let store: Store;
  let component: InscripcionAlumnoEditarComponent;
  let fixture: ComponentFixture<InscripcionAlumnoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionAlumnoEditarComponent],
      providers:[
        provideStore([AlumnoInscripcionPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ]
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(InscripcionAlumnoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
