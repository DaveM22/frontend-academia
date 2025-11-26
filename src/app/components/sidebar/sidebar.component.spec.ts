import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { provideStore, Store } from '@ngxs/store';
import { AppPageState } from '../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let store: Store;
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const authServiceMock = {
    isAuthenticated$: of(true),
    user$: of({ name: 'Test' }),
    loginWithRedirect: jasmine.createSpy(),
    logout: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        provideStore([AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
