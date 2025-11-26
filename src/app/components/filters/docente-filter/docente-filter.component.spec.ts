import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteFilterComponent } from './docente-filter.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('DocenteFilterComponent', () => {
  let store: Store;
  let component: DocenteFilterComponent;
  let fixture: ComponentFixture<DocenteFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteFilterComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DocenteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
