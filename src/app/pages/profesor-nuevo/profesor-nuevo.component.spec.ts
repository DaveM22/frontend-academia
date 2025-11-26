import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorNuevoComponent } from './profesor-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ProfesorNuevoComponent', () => {
  let store: Store;
  let component: ProfesorNuevoComponent;
  let fixture: ComponentFixture<ProfesorNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorNuevoComponent],
      providers: [
        provideStore([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ProfesorNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
