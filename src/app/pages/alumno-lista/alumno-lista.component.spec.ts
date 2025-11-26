import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoListaComponent } from './alumno-lista.component';
import { provideStore, Store } from '@ngxs/store';
import { PersonaState } from '../../store/states/api/persona.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ScreenSizeService } from '../../services/screen-size.service.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('AlumnoListaComponent', () => {
  let store: Store;
  let component: AlumnoListaComponent;
  let fixture: ComponentFixture<AlumnoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideStore([PersonaState]),
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
        MessageService,
        ScreenSizeService
      ]
    })
      .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AlumnoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});