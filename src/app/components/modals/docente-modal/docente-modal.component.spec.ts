import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteModalComponent } from './docente-modal.component';
import { provideStore, Store } from '@ngxs/store';
import { AppPageState } from '../../../store/states/page/app.state';
import { PersonaState } from '../../../store/states/api/persona.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('DocenteModalComponent', () => {
  let store: Store;
  let component: DocenteModalComponent;
  let fixture: ComponentFixture<DocenteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteModalComponent],
      providers:[
        provideStore([AppPageState, PersonaState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        MessageService
      ]
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DocenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
