import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ParametroService } from './parametro.service';

describe('ParametroService', () => {
  let service: ParametroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(ParametroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
