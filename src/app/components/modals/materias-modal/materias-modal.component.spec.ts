import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasModalComponent } from './materias-modal.component';
import { provideStore, Store } from '@ngxs/store';
import { PlanState } from '../../../store/states/api/plan.state';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('MateriasModalComponent', () => {
  let store: Store;
  let component: MateriasModalComponent;
  let fixture: ComponentFixture<MateriasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasModalComponent],
      providers: [
        provideStore([PlanState, PlanPageState, AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(MateriasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
