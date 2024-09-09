import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionAlumnoListaComponent } from './inscripcion-alumno-lista.component';

describe('InscripcionAlumnoListaComponent', () => {
  let component: InscripcionAlumnoListaComponent;
  let fixture: ComponentFixture<InscripcionAlumnoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionAlumnoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionAlumnoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
