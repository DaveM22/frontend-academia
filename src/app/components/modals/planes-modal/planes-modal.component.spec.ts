import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesModalComponent } from './planes-modal.component';
import { provideStore, Store } from '@ngxs/store';
import { PlanState } from '../../../store/states/api/plan.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('PlanesModalComponent', () => {
  let store: Store;
  let component: PlanesModalComponent;
  let fixture: ComponentFixture<PlanesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesModalComponent],
      providers: [
        provideStore([PlanState, AppPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
