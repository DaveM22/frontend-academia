import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplayoutComponent } from './applayout.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

describe('ApplayoutComponent', () => {
  const authServiceMock = {
  isAuthenticated$: of(true),
  user$: of({ name: 'Test' }),
  loginWithRedirect: jasmine.createSpy(),
  logout: jasmine.createSpy(),
};
  let store: Store;
  let component: ApplayoutComponent;
  let fixture: ComponentFixture<ApplayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplayoutComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ApplayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
