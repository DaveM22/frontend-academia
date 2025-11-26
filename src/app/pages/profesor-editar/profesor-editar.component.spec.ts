import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorEditarComponent } from './profesor-editar.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ProfesorEditarComponent', () => {
  let store: Store;
  let component: ProfesorEditarComponent;
  let fixture: ComponentFixture<ProfesorEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorEditarComponent],
      providers: [
        provideStore([PersonaPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([])
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ProfesorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
