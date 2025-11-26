import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasModalComponent } from './personas-modal.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../../store/states/api/persona.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { PlanState } from '../../../store/states/api/plan.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PersonasModalComponent', () => {
  let store: Store;
  let component: PersonasModalComponent;
  let fixture: ComponentFixture<PersonasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasModalComponent],
      providers: [
        provideStore([PersonaState, AppPageState, PlanState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PersonasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
