import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMateriasEditarComponent } from './plan-materias-editar.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('PlanMateriasEditarComponent', () => {
  let store: Store;
  let component: PlanMateriasEditarComponent;
  let fixture: ComponentFixture<PlanMateriasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMateriasEditarComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanMateriasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
