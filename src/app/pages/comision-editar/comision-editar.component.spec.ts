import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionEditarComponent } from './comision-editar.component';
import { provideStore, Store } from '@ngxs/store';
import { ComisionPageState } from '../../store/states/page/comision.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ComisionEditarComponent', () => {
  let store: Store;
  let component: ComisionEditarComponent;
  let fixture: ComponentFixture<ComisionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionEditarComponent],
      providers: [
        provideStore([ComisionPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ComisionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
