import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionNuevoComponent } from './inscripcion-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageClasses } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('InscripcionNuevoComponent', () => {
  let store: Store;
  let component: InscripcionNuevoComponent;
  let fixture: ComponentFixture<InscripcionNuevoComponent>;
  const authServiceMock = {
  isAuthenticated$: of(true),
  user$: of({ name: 'Test' }),
  loginWithRedirect: jasmine.createSpy(),
  logout: jasmine.createSpy(),
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionNuevoComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService,
        { provide: AuthService, useValue: authServiceMock },
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(InscripcionNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
