import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoFormComponent } from './curso-form.component';
import { provideStore, Store } from '@ngxs/store';
import { PlanPageState } from '../../../store/states/page/plan.page.state';
import { CursoPageState } from '../../../store/states/page/curso.state';
import { AppPageState } from '../../../store/states/page/app.state';
import { ComisionState } from '../../../store/states/api/comision.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('CursoFormComponent', () => {
  let store: Store;
  let component: CursoFormComponent;
  let fixture: ComponentFixture<CursoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoFormComponent],
      providers: [
        provideStore([PlanPageState, CursoPageState, AppPageState, ComisionState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
