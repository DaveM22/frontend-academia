import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionProfesorComponent } from './asignacion-profesor.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('AsignacionProfesorComponent', () => {
  let store: Store;
  let component: AsignacionProfesorComponent;
  let fixture: ComponentFixture<AsignacionProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionProfesorComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AsignacionProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
