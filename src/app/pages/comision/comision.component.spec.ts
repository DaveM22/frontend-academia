import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionComponent } from './comision.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ComisionComponent', () => {
  let store: Store;
  let component: ComisionComponent;
  let fixture: ComponentFixture<ComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
