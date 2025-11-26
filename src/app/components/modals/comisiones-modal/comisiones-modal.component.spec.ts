import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesModalComponent } from './comisiones-modal.component';
import { provideStore, Store } from '@ngxs/store';
import { ComisionState } from '../../../store/states/api/comision.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { PlanState } from '../../../store/states/api/plan.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ComisionesModalComponent', () => {
  let store:Store
  let component: ComisionesModalComponent;
  let fixture: ComponentFixture<ComisionesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionesModalComponent],
      providers:[
        provideStore([
          PlanState,
          AppPageState
        ]),
        provideHttpClient(withInterceptorsFromDi())
      ]
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ComisionesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
