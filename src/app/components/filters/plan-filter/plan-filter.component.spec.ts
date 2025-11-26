import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFilterComponent } from './plan-filter.component';
import { provideStore, Store } from '@ngxs/store';
import { PlanState } from '../../../store/states/api/plan.state';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('PlanFilterComponent', () => {
  let store: Store;
  let component: PlanFilterComponent;
  let fixture: ComponentFixture<PlanFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanFilterComponent],
      providers: [
        provideStore([PlanState, PlanPageState, AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
