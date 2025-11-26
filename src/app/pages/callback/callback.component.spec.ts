import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackComponent } from './callback.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

describe('CallbackComponent', () => {
  let store: Store;
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  const authServiceMock = {
    isAuthenticated$: of(true),
    user$: of({ name: 'Test' }),
    loginWithRedirect: jasmine.createSpy(),
    logout: jasmine.createSpy(),
    handleRedirectCallback: jasmine.createSpy().and.returnValue(Promise.resolve()),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallbackComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
          { provide: AuthService, useValue: authServiceMock },
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
