import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { RolService } from './rol.service';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

describe('RolService', () => {
  let service: RolService;

  const authServiceMock = {
    isAuthenticated$: of(true),
    user$: of({ name: 'Test' }),
    loginWithRedirect: jasmine.createSpy(),
    logout: jasmine.createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    service = TestBed.inject(RolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
