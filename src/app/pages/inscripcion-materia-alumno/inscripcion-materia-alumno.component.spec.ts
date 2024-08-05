import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionMateriaAlumnoComponent } from './inscripcion-materia-alumno.component';

describe('InscripcionMateriaAlumnoComponent', () => {
  let component: InscripcionMateriaAlumnoComponent;
  let fixture: ComponentFixture<InscripcionMateriaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionMateriaAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionMateriaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
