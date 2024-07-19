import { TestBed } from '@angular/core/testing';

import { DocenteCursoService } from './docente-curso.service';

describe('DocenteCursoService', () => {
  let service: DocenteCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocenteCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
