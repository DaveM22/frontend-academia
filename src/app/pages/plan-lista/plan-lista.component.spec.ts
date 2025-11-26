import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanListaComponent } from './plan-lista.component';
import { provideStore, Store } from '@ngxs/store';
import { PlanState } from '../../store/states/api/plan.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PlanListaComponent', () => {
  let store: Store;
  let component: PlanListaComponent;
  let fixture: ComponentFixture<PlanListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanListaComponent],
      providers: [
        provideStore([PlanState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        MessageService,
        ScreenSizeService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});