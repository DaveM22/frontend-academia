import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoEditarComponent } from './alumno-editar.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../store/states/api/persona.state';
import { PersonaPageState } from '../../store/states/page/persona.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('AlumnoEditarComponent', () => {
  let store: Store;
  let component: AlumnoEditarComponent;
  let fixture: ComponentFixture<AlumnoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoEditarComponent],
      providers: [
        provideStore([PersonaState, PersonaPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AlumnoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
