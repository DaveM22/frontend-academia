import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadNuevoComponent } from './especialidad-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EspecialidadPageState } from '../../store/states/page/especialidad.state';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('EspecialidadNuevoComponent', () => {
  let store: Store;
  let component: EspecialidadNuevoComponent;
  let fixture: ComponentFixture<EspecialidadNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadNuevoComponent],
      providers: [
        provideStore([EspecialidadPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(EspecialidadNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
