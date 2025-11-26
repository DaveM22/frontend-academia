import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNuevoComponent } from './plan-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PlanPageState } from '../../store/states/page/plan.page.state';
import { EspecialidadPageState } from '../../store/states/page/especialidad.state';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PlanNuevoComponent', () => {
  let store: Store;
  let component: PlanNuevoComponent;
  let fixture: ComponentFixture<PlanNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanNuevoComponent],
      providers: [
        provideStore([PlanPageState, EspecialidadPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
