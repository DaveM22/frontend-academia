import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesCursosNuevoComponent } from './docentes-cursos-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('DocentesCursosNuevoComponent', () => {
  let store: Store;
  let component: DocentesCursosNuevoComponent;
  let fixture: ComponentFixture<DocentesCursosNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocentesCursosNuevoComponent],
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
    fixture = TestBed.createComponent(DocentesCursosNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
