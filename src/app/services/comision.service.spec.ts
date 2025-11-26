import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ComisionService } from './comision.service';

describe('ComisionService', () => {
  let service: ComisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(ComisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
