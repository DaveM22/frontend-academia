import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AlumnoInscripcionService } from './alumno-inscripcion.service';

describe('AlumnoInscripcionService', () => {
  let service: AlumnoInscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(AlumnoInscripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
