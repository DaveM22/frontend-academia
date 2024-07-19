import { TestBed } from '@angular/core/testing';

import { AlumnoInscripcionService } from './alumno-inscripcion.service';

describe('AlumnoInscripcionService', () => {
  let service: AlumnoInscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoInscripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
