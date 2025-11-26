import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMateriasComponent } from './plan-materias.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PlanMateriasComponent', () => {
  let store: Store;
  let component: PlanMateriasComponent;
  let fixture: ComponentFixture<PlanMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMateriasComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlanMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
