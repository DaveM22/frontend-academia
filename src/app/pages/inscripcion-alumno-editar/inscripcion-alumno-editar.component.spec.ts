import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionAlumnoEditarComponent } from './inscripcion-alumno-editar.component';

describe('InscripcionAlumnoEditarComponent', () => {
  let component: InscripcionAlumnoEditarComponent;
  let fixture: ComponentFixture<InscripcionAlumnoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionAlumnoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionAlumnoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
