import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaFormComponent } from './persona-form.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../../store/states/api/persona.state';
import { PlanState } from '../../../store/states/api/plan.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PersonaFormComponent', () => {
  let store: Store;
  let component: PersonaFormComponent;
  let fixture: ComponentFixture<PersonaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaFormComponent],
      providers: [
        provideStore([PersonaState, PlanState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PersonaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
