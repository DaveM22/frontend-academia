import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadFilterComponent } from './especialidad-filter.component';
import { provideStore, Store } from '@ngxs/store';
import { EspecialidadState } from '../../../store/states/api/especialidad.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('EspecialidadFilterComponent', () => {
  let store: Store;
  let component: EspecialidadFilterComponent;
  let fixture: ComponentFixture<EspecialidadFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadFilterComponent],
      providers: [
        provideStore([EspecialidadState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(EspecialidadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
