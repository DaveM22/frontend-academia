import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadEditarComponent } from './especialidad-editar.component';
import { provideStore, Store } from '@ngxs/store';
import { EspecialidadState } from '../../store/states/api/especialidad.state';
import { EspecialidadPageState } from '../../store/states/page/especialidad.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('EspecialidadEditarComponent', () => {
  let store: Store;
  let component: EspecialidadEditarComponent;
  let fixture: ComponentFixture<EspecialidadEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadEditarComponent],
      providers: [
        provideStore([EspecialidadState, EspecialidadPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(EspecialidadEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
