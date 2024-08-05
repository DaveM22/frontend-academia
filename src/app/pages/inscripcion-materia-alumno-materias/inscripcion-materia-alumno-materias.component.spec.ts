import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionMateriaAlumnoMateriasComponent } from './inscripcion-materia-alumno-materias.component';

describe('InscripcionMateriaAlumnoMateriasComponent', () => {
  let component: InscripcionMateriaAlumnoMateriasComponent;
  let fixture: ComponentFixture<InscripcionMateriaAlumnoMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionMateriaAlumnoMateriasComponent]
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
