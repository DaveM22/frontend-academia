import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEditarComponent } from './plan-editar.component';
import { provideStore, Store } from '@ngxs/store';
import { PlanPageState } from '../../store/states/page/plan.page.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('PlanEditarComponent', () => {
  let store: Store;
  let component: PlanEditarComponent;
  let fixture: ComponentFixture<PlanEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEditarComponent],
      providers: [
        provideStore([PlanPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
