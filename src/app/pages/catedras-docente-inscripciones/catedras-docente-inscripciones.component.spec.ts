import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedrasDocenteInscripcionesComponent } from './catedras-docente-inscripciones.component';

describe('CatedrasDocenteInscripcionesComponent', () => {
  let component: CatedrasDocenteInscripcionesComponent;
  let fixture: ComponentFixture<CatedrasDocenteInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedrasDocenteInscripcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedrasDocenteInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
