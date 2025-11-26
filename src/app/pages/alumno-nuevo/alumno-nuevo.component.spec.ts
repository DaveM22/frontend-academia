import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoNuevoComponent } from './alumno-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('AlumnoNuevoComponent', () => {
  let store: Store;
  let component: AlumnoNuevoComponent;
  let fixture: ComponentFixture<AlumnoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoNuevoComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AlumnoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
