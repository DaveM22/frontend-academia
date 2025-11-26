import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadFormComponent } from './especialidad-form.component';
import { provideStore, Store } from '@ngxs/store';
import { EspecialidadState } from '../../../store/states/api/especialidad.state';
import { EspecialidadPageState } from '../../../store/states/page/especialidad.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('EspecialidadFormComponent', () => {
  let store: Store;
  let component: EspecialidadFormComponent;
  let fixture: ComponentFixture<EspecialidadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadFormComponent],
      providers: [
        provideStore([EspecialidadState, EspecialidadPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(EspecialidadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
