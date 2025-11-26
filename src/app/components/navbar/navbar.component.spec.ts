import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { provideStore, Store } from '@ngxs/store';
import { AppPageState } from '../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('NavbarComponent', () => {
  let store: Store;
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const authServiceMock = {
    isAuthenticated$: of(true),
    user$: of({ name: 'Test' }),
    idTokenClaims$: of({ picture: 'test.jpg', name: 'Test User', 'https://example.com/roles': ['admin'] }),
    loginWithRedirect: jasmine.createSpy(),
    logout: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideStore([AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        { provide: AuthService, useValue: authServiceMock }
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
