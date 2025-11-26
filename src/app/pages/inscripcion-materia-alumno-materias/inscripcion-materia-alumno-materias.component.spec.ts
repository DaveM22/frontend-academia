import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionMateriaAlumnoMateriasComponent } from './inscripcion-materia-alumno-materias.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { AppPageState } from '../../store/states/page/app.state';
import { MateriaState } from '../../store/states/api/materia.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InscripcionMateriaAlumnoMateriasComponent', () => {
  let store: Store;
  let component: InscripcionMateriaAlumnoMateriasComponent;
  let fixture: ComponentFixture<InscripcionMateriaAlumnoMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionMateriaAlumnoMateriasComponent],
      providers:[
        provideStore([PersonaPageState, AppPageState, MateriaState]),
        provideHttpClient(withInterceptorsFromDi()),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionMateriaAlumnoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
