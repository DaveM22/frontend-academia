import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionNuevoComponent } from './comision-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ComisionPageState } from '../../store/states/page/comision.state';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PlanState } from '../../store/states/api/plan.state';

describe('ComisionNuevoComponent', () => {
  let store: Store;
  let component: ComisionNuevoComponent;
  let fixture: ComponentFixture<ComisionNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionNuevoComponent],
      providers: [
        provideStore([PlanState, ComisionPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ComisionNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
