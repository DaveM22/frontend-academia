import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFormComponent } from './plan-form.component';
import { provideStore, Store } from '@ngxs/store';
import { PlanState } from '../../../store/states/api/plan.state';
import { EspecialidadState } from '../../../store/states/api/especialidad.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PlanPageState } from '../../../store/states/page/plan.page.state';

describe('PlanFormComponent', () => {
  let store: Store;
  let component: PlanFormComponent;
  let fixture: ComponentFixture<PlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanFormComponent],
      providers: [
        provideStore([PlanState, EspecialidadState, PlanPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
