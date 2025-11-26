import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNuevoComponent } from './usuario-nuevo.component';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioPageState } from '../../store/states/page/usuario.state';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PersonaState } from '../../store/states/api/persona.state';

describe('UsuarioNuevoComponent', () => {
  let store: Store;
  let component: UsuarioNuevoComponent;
  let fixture: ComponentFixture<UsuarioNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioNuevoComponent],
      providers: [
        provideStore([PersonaState, UsuarioPageState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([]),
        provideNoopAnimations(),
        MessageService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(UsuarioNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
