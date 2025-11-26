import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorComponent } from './profesor.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ProfesorComponent', () => {
  let store: Store;
  let component: ProfesorComponent;
  let fixture: ComponentFixture<ProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
